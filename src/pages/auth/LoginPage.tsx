import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/src/hooks/useAuth";
import { Mail, Lock, ChevronRight, AlertCircle, Database, Sparkles, ArrowLeft } from "lucide-react";
import { db } from "@/src/lib/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { api } from "@/src/services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  
  // UI States
  const [step, setStep] = useState<'email' | 'password' | 'setup'>('email');
  const [preApprovedProfile, setPreApprovedProfile] = useState<any>(null);

  const checkEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const profile = await api.checkProfileExists(email);
      if (profile) {
        setPreApprovedProfile(profile);
        // In a real app we'd check if they have an Auth account already.
        // For simplicity, we'll try to login first, if it fails with 'user-not-found', we go to setup.
        setStep('password');
      } else {
        setError("This email hasn't been invited yet. Please contact your instructor.");
      }
    } catch (err: any) {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (step === 'setup') {
        if (password !== confirmPassword) throw new Error("Passwords do not match");
        if (password.length < 6) throw new Error("Password must be at least 6 characters");
        await signup(email, password);
      } else {
        try {
          await login(email, password);
        } catch (loginErr: any) {
          console.error("Login attempt error:", loginErr.code, loginErr.message);
          
          // Detect if account doesn't exist yet to switch to setup
          const isNewUser = 
            loginErr.code === 'auth/user-not-found' || 
            loginErr.message.includes('user-not-found') ||
            loginErr.code === 'auth/invalid-credential' || // Modern Firebase code
            loginErr.code === 'auth/invalid-login-credentials';

          if (isNewUser) {
            // Confirm they have a Firestore profile before allowing signup
            const profile = await api.checkProfileExists(email);
            if (profile) {
              setStep('setup');
              setError("Account not activated yet. Please choose a password to begin.");
              setLoading(false);
              return;
            } else {
              throw new Error("This email hasn't been invited to the platform yet.");
            }
          }
          throw loginErr;
        }
      }
      navigate("/app/dashboard");
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        setError("Email/Password login is not enabled in Firebase Console. Please enable it in Authentication > Sign-in method.");
      } else {
        setError(err.message || "Authentication failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const runSeed = async () => {
    if (!window.confirm("Initialize Master Curriculum and Admin User?")) return;
    setSeeding(true);
    try {
      const trackRef = await addDoc(collection(db, 'tracks'), {
        title: 'Foundations',
        description: 'The starting point for every young innovator. Ages 4-7.',
        color: '#FFD700'
      });

      const courseRef = await addDoc(collection(db, 'courses'), {
        trackId: trackRef.id,
        title: 'Digital Explorers',
        description: 'Master the basics of computing and block-based programming.',
        durationWeeks: 12
      });

      await addDoc(collection(db, 'lessons'), {
        courseId: courseRef.id,
        title: 'Computer Confidence',
        week: 1,
        session: 1,
        status: 'published',
        contentBlocks: [{ type: 'text', content: '<h3>Welcome!</h3>' }],
        practiceInstructions: 'Touch the screen!',
        assignmentInstructions: 'Create a character.',
        assignmentRequired: true
      });

      const cohortRef = await addDoc(collection(db, 'cohorts'), {
        courseId: courseRef.id,
        name: 'Digital Explorers - Launch',
        schedule: 'Saturdays at 10:00 AM (GMT)',
        currentWeek: 1,
        deliveryMode: 'online',
        onlineMeetUrl: 'https://meet.google.com/abc-defg-hij',
        status: 'active',
        studentsCount: 1,
        createdAt: new Date().toISOString()
      });

      await setDoc(doc(db, 'users', 'trustar_admin_placeholder'), {
        name: 'Trustar Admin',
        email: 'trustartechinstitute@gmail.com',
        role: 'admin',
        coinBalance: 9999,
        points: 0,
        createdAt: new Date().toISOString()
      });

      alert("Success! Now enter trustartechinstitute@gmail.com below to complete your setup.");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-2 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-baby/10 via-transparent to-transparent">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-6 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-12 h-12 rounded-full bg-baby flex items-center justify-center font-display font-bold text-navy text-2xl shadow-lg shadow-baby/20">T</div>
            <span className="font-display font-bold text-3xl tracking-tight text-navy uppercase">TRUSTAR</span>
          </div>
          <h1 className="text-4xl font-display font-bold text-navy tracking-tight">
            {step === 'setup' ? 'Set up account' : 'Welcome back!'}
          </h1>
          <p className="text-text-secondary font-medium mt-2">
            {step === 'setup' ? "Choose a password to secure your new profile." : "Login to your dashboard to continue learning."}
          </p>
        </div>

        <Card className="border-surface-3 shadow-2xl shadow-navy/5 rounded-[2.5rem] overflow-hidden bg-white">
          <CardContent className="p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            {step === 'email' ? (
              <form onSubmit={checkEmail} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Your Registered Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <Input 
                      type="email" 
                      required 
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 rounded-2xl bg-surface-2 border-surface-3 transition-all focus:bg-white"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-14 rounded-2xl bg-navy hover:bg-navy2 text-white font-bold text-lg shadow-xl shadow-navy/10"
                >
                  {loading ? "Verifying..." : "Continue"}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleAuth} className="space-y-6">
                <div className="flex items-center gap-2 mb-4 p-3 bg-surface-2 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-navy text-xs">
                        {preApprovedProfile?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Account for</p>
                        <p className="text-xs font-bold text-navy">{email}</p>
                    </div>
                    <button type="button" onClick={() => setStep('email')} className="p-2 hover:bg-white rounded-lg transition-colors">
                        <ArrowLeft className="w-4 h-4 text-text-muted" />
                    </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">
                    {step === 'setup' ? 'Choose Password' : 'Password'}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <Input 
                      type="password" 
                      required 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 h-14 rounded-2xl bg-surface-2 border-surface-3 transition-all focus:bg-white"
                    />
                  </div>
                </div>

                {step === 'setup' && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <Input 
                        type="password" 
                        required 
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-12 h-14 rounded-2xl bg-surface-2 border-surface-3 transition-all focus:bg-white"
                      />
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full h-14 rounded-2xl font-bold text-lg shadow-xl transition-all ${
                    step === 'setup' ? 'bg-teal hover:bg-teal-700 text-white shadow-teal/10' : 'bg-navy hover:bg-navy2 text-white shadow-navy/10'
                  }`}
                >
                  {loading ? "Processing..." : step === 'setup' ? "Activate Account" : "Login"}
                  {step === 'setup' && !loading && <Sparkles className="ml-2 w-5 h-5" />}
                </Button>
              </form>
            )}

            <div className="mt-8 pt-8 border-t border-dashed border-surface-3">
              <Button 
                variant="outline" 
                onClick={runSeed} 
                className="w-full h-12 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted hover:text-baby border-surface-3"
              >
                <Database className="w-4 h-4 mr-2" />
                {seeding ? "Seeding..." : "Init System Assets"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
