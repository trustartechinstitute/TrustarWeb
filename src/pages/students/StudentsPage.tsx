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
  Building2,
  Users,
  UserSquare2,
  Link as LinkIcon
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { toast } from "sonner";

export default function StudentsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("students");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "password123",
    role: "student",
    studentType: "independent",
    parentId: "",
  });

  const loadData = async () => {
    setLoading(true);
    const u = await api.getUsers();
    setUsers(u || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const promise = api.createUser(formData);
    
    toast.promise(promise, {
      loading: 'Creating user account...',
      success: (data: any) => {
        setIsDialogOpen(false);
        setFormData({ name: "", email: "", password: "password123", role: formData.role, studentType: "independent", parentId: "" });
        loadData();
        return `Account created for ${data.name}!`;
      },
      error: 'Failed to create user. Please try again.',
    });
  };

  const students = users.filter((u: any) => u.role === 'student');
  const parents = users.filter((u: any) => u.role === 'parent');

  const studentColumns = [
    { key: "name", label: "Student", render: (v: string, row: any) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface-3 flex items-center justify-center font-display font-bold text-navy">
          {v?.charAt(0) || 'S'}
        </div>
        <div>
          <p className="font-bold text-navy">{v}</p>
          <div className="flex gap-2">
             <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">{row.studentType}</p>
             {row.parentId && (
               <p className="text-[10px] text-baby uppercase tracking-wider font-bold">• Linked to Parent</p>
             )}
          </div>
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
    { key: "actions", label: "", render: (_: any, row: any) => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" title="Link to Parent"><LinkIcon className="w-4 h-4 text-text-secondary" /></Button>
        <Button variant="ghost" size="icon" title="Email Student"><Mail className="w-4 h-4 text-text-secondary" /></Button>
      </div>
    )}
  ];

  const parentColumns = [
    { key: "name", label: "Parent", render: (v: string) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center font-display font-bold text-navy">
          {v?.charAt(0) || 'P'}
        </div>
        <p className="font-bold text-navy">{v}</p>
      </div>
    )},
    { key: "email", label: "Email" },
    { key: "coinBalance", label: "Family Balance", render: (v: number) => <CoinBadge amount={v} /> },
    { key: "id", label: "Children", render: (id: string) => (
      <span className="text-xs font-bold text-text-muted uppercase">
        {students.filter(s => s.parentId === id).length} Linked
      </span>
    )},
    { key: "actions", label: "", render: () => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon"><MessageSquare className="w-4 h-4 text-text-secondary" /></Button>
        <Button variant="ghost" size="icon"><Mail className="w-4 h-4 text-text-secondary" /></Button>
      </div>
    )}
  ];

  if (loading) return (
    <div className="p-12 text-center text-text-muted animate-pulse">
      <Users className="w-10 h-10 mx-auto mb-4 opacity-10" />
      <p className="font-bold uppercase tracking-widest text-xs">Loading directory...</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <PageHeader 
        title="People & Profiles" 
        subtitle="Manage students, parents, and administrative accounts."
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger render={
              <Button className="bg-baby text-navy hover:bg-baby-dark font-bold rounded-xl px-6 outline-none">
                <Plus className="w-4 h-4 mr-2" />
                Add New User
              </Button>
            } />
            <DialogContent className="sm:max-w-md border-surface-3 bg-white p-0 overflow-hidden rounded-[2.5rem]">
              <DialogHeader className="p-8 bg-surface-2 border-b border-surface-3">
                <div className="w-12 h-12 bg-baby/20 rounded-2xl flex items-center justify-center mb-4">
                  <UserPlus className="w-6 h-6 text-baby" />
                </div>
                <DialogTitle className="text-2xl font-display font-bold text-navy">Create Account</DialogTitle>
                <DialogDescription className="text-text-secondary font-medium">
                  Provision a new student or parent account.
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
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="h-12 rounded-xl bg-surface-2 border-surface-3 transition-all focus:bg-white focus:ring-baby"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted ml-1">Account Role</label>
                       <Select required value={formData.role} onValueChange={(val) => setFormData({...formData, role: val})}>
                        <SelectTrigger className="h-12 rounded-xl bg-surface-2 border-surface-3 outline-none">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-surface-3">
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {formData.role === 'student' && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted ml-1">Student Type</label>
                        <Select required value={formData.studentType} onValueChange={(val) => setFormData({...formData, studentType: val})}>
                          <SelectTrigger className="h-12 rounded-xl bg-surface-2 border-surface-3 outline-none">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-surface-3">
                            <SelectItem value="child">Child Profile</SelectItem>
                            <SelectItem value="independent">Independent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {formData.role === 'student' && formData.studentType === 'child' && (
                     <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted ml-1">Link to Parent</label>
                       <Select value={formData.parentId} onValueChange={(val) => setFormData({...formData, parentId: val})}>
                        <SelectTrigger className="h-12 rounded-xl bg-surface-2 border-surface-3 outline-none">
                          <SelectValue placeholder="Select parent (optional)" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-surface-3">
                          {parents.map(p => (
                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="p-4 bg-teal/5 border border-teal/10 rounded-2xl flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-teal mt-0.5" />
                    <p className="text-[10px] text-teal-700 font-medium leading-relaxed">
                      Secured Account: Credentials will be sent to the user's email.
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

      <Tabs defaultValue="students" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-surface-2 p-1 rounded-xl w-full sm:w-auto h-auto">
          <TabsTrigger value="students" className="rounded-lg px-8 py-2.5 data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-widest">
            <UserSquare2 className="w-4 h-4 mr-2" /> Students ({students.length})
          </TabsTrigger>
          <TabsTrigger value="parents" className="rounded-lg px-8 py-2.5 data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-widest">
            <Users className="w-4 h-4 mr-2" /> Parents ({parents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="animate-in fade-in duration-300">
           <div className="card p-0 overflow-hidden border-surface-3 shadow-xl shadow-navy/5">
              <DataTable columns={studentColumns} data={students} />
           </div>
        </TabsContent>
        
        <TabsContent value="parents" className="animate-in fade-in duration-300">
           <div className="card p-0 overflow-hidden border-surface-3 shadow-xl shadow-navy/5">
              <DataTable columns={parentColumns} data={parents} />
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
