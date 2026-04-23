import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/src/hooks/useAuth";
import { Mail, Lock, ChevronRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/app/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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
          <h1 className="text-4xl font-display font-bold text-navy tracking-tight">Welcome back!</h1>
          <p className="text-text-secondary font-medium mt-2">Login to your dashboard to continue learning.</p>
        </div>

        <Card className="border-surface-3 shadow-2xl shadow-navy/5 rounded-[2.5rem] overflow-hidden bg-white">
          <CardContent className="p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Email Address</label>
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

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Password</label>
                  <button type="button" className="text-[10px] font-bold text-baby hover:text-baby-dark uppercase tracking-widest">Forgot?</button>
                </div>
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

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-navy hover:bg-navy2 text-white font-bold text-lg shadow-xl shadow-navy/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? "Authenticating..." : "Login to Platform"}
                {!loading && <ChevronRight className="ml-2 w-5 h-5" />}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-text-secondary font-medium">
                Don't have an account? <br />
                <button 
                  onClick={() => navigate("/")} 
                  className="text-baby font-bold hover:underline mt-1"
                >
                  Enquire about a place
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center text-xs font-bold text-text-muted uppercase tracking-[0.2em]">
          <p>Mock Credentials:</p>
          <div className="mt-2 text-[10px] space-x-4">
            <span>Admin: admin@trustar.com / admin123</span>
            <span>Student: chidera@trustar.com / child123</span>
          </div>
        </div>
      </div>
    </div>
  );
}
