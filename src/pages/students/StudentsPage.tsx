import * as React from "react";
import { useState, useEffect } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import { DataTable } from "@/src/components/common/DataTable";
import { api } from "@/src/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Mail, 
  MessageSquare, 
  UserPlus,
  ShieldCheck,
  Building2
} from "lucide-react";
import { CoinBadge } from "@/src/components/common/CoinBadge";
import { PointsBadge } from "@/src/components/common/PointsBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "password123",
    role: "student",
    studentType: "independent",
    parentId: "",
  });

  const loadStudents = async () => {
    setLoading(true);
    const u = await api.getUsers();
    setStudents(u.filter((s: any) => s.role === 'student'));
    setLoading(false);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createUser(formData);
      setIsDialogOpen(false);
      setFormData({ name: "", email: "", password: "password123", role: "student", studentType: "independent", parentId: "" });
      loadStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { key: "name", label: "Student", render: (v: string, row: any) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface-3 flex items-center justify-center font-display font-bold text-navy">
          {v.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-navy">{v}</p>
          <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">{row.studentType}</p>
        </div>
      </div>
    )},
    { key: "country", label: "Country" },
    { key: "coinBalance", label: "Stats", render: (_: any, row: any) => (
      <div className="flex gap-4">
        <CoinBadge amount={row.coinBalance} className="text-xs" />
        <PointsBadge points={row.points} className="text-xs" />
      </div>
    )},
    { key: "createdAt", label: "Joined On", render: (v: string) => new Date(v).toLocaleDateString() },
    { key: "actions", label: "", render: (_: any, row: any) => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" title="Email Student"><Mail className="w-4 h-4 text-text-secondary" /></Button>
        <Button variant="ghost" size="icon" title="WhatsApp Parent"><MessageSquare className="w-4 h-4 text-text-secondary" /></Button>
      </div>
    )}
  ];

  if (loading) return <div>Loading students...</div>;

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Student Directory" 
        subtitle="View and manage all students enrolled in the platform."
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger render={
              <Button className="bg-baby text-navy hover:bg-baby-dark font-bold rounded-xl px-6 outline-none">
                <Plus className="w-4 h-4 mr-2" />
                Enrol Student
              </Button>
            } />
            <DialogContent className="sm:max-w-md border-surface-3 bg-white p-0 overflow-hidden rounded-[2rem]">
              <DialogHeader className="p-8 bg-surface-2 border-b border-surface-3">
                <div className="w-12 h-12 bg-baby/20 rounded-2xl flex items-center justify-center mb-4">
                  <UserPlus className="w-6 h-6 text-baby" />
                </div>
                <DialogTitle className="text-2xl font-display font-bold text-navy">Enrol New Student</DialogTitle>
                <DialogDescription className="text-text-secondary font-medium">
                  Create a student account. If they are a minor, ensure they are linked to a parent.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleCreateUser}>
                <div className="p-8 space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted ml-1">Full Name</label>
                    <Input 
                      required 
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="h-12 rounded-xl bg-surface-2 border-surface-3 transition-all focus:bg-white focus:ring-baby"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted ml-1">Email Address</label>
                    <Input 
                      type="email"
                      required 
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="h-12 rounded-xl bg-surface-2 border-surface-3 transition-all focus:bg-white focus:ring-baby"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted ml-1">Student Type</label>
                      <Select required onValueChange={(val) => setFormData({...formData, studentType: val})}>
                        <SelectTrigger className="h-12 rounded-xl bg-surface-2 border-surface-3 outline-none">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-surface-3">
                          <SelectItem value="child">Child (has parent)</SelectItem>
                          <SelectItem value="independent">Independent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted ml-1">Password</label>
                      <Input 
                        disabled
                        value="password123"
                        className="h-12 rounded-xl bg-surface-3 border-transparent text-text-muted opacity-50 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-teal/5 border border-teal/10 rounded-2xl flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-teal mt-0.5" />
                    <p className="text-[10px] text-teal-700 font-medium leading-relaxed">
                      Secured Account: Credentials will be sent to the student's email. They can change their password on first login.
                    </p>
                  </div>
                </div>

                <DialogFooter className="p-8 bg-surface-2 border-t border-surface-3 mt-0">
                  <Button 
                    type="submit"
                    className="w-full h-14 bg-navy hover:bg-navy2 text-white font-bold rounded-2xl shadow-xl shadow-navy/10"
                  >
                    Confirm & Create Account
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <DataTable columns={columns} data={students} />
    </div>
  );
}
