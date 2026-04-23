import { useState, useEffect } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { api } from "@/src/services/api";
import { StatCard } from "@/src/components/common/StatCard";
import { PageHeader } from "@/src/components/common/PageHeader";
import { DataTable } from "@/src/components/common/DataTable";
import { StatusBadge } from "@/src/components/common/StatusBadge";
import { CoinBadge } from "@/src/components/common/CoinBadge";
import { PointsBadge } from "@/src/components/common/PointsBadge";
import { 
  Users, 
  Map, 
  ClipboardList, 
  UserSquare2, 
  BookOpen, 
  Zap, 
  Calendar,
  Wallet,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROLES } from "@/src/utils/constants";
import { formatDisplayName } from "@/src/utils/formatters";

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedChild, setSelectedChild] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      try {
        if (user.role === ROLES.ADMIN) {
          const s = await api.getDashboardStats();
          setStats(s);
          const l = await api.getLeads();
          setRecentLeads(l.slice(0, 5));
        } else if (user.role === ROLES.STUDENT) {
          const e = await api.getEnrollmentsByStudentId(user.id);
          setEnrollments(e);
        } else if (user.role === ROLES.PARENT) {
          const c = await api.getChildrenByParentId(user.id);
          setChildren(c);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  if (loading) return <div>Loading dashboard...</div>;

  // --- ADMIN VIEW ---
  if (user?.role === ROLES.ADMIN) {
    return (
      <div className="space-y-8">
        <PageHeader 
          title="Overview" 
          subtitle={`Welcome back, ${user.name.split(' ')[0]}! Here's what's happening today.`}
          actions={
            <Button onClick={() => navigate("/app/leads")} className="bg-baby text-navy hover:bg-baby-dark font-bold rounded-xl px-6">
              View All Leads
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Students" value={stats?.totalStudents || 0} icon={Users} trend="+12% from last month" />
          <StatCard label="Active Cohorts" value={stats?.activeCohorts || 0} icon={Map} trend="+2 new this week" />
          <StatCard label="Total Leads" value={stats?.totalLeads || 0} icon={ClipboardList} trend="5 waiting for follow-up" />
          <StatCard label="New Leads" value={stats?.newLeads || 0} icon={Zap} description="Recent enquiries (7 days)" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-display font-bold text-navy flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-baby" />
              Recent Enquiries
            </h3>
            <DataTable 
              columns={[
                { key: "name", label: "Name" },
                { key: "country", label: "Country" },
                { key: "interestedTrack", label: "Program" },
                { key: "status", label: "Status", render: (v) => <StatusBadge status={v} /> },
                { key: "id", label: "", render: (id) => <Button variant="ghost" size="sm" onClick={() => navigate(`/app/leads`)}>View</Button> }
              ]}
              data={recentLeads}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold text-navy flex items-center gap-2">
              <Calendar className="w-5 h-5 text-baby" />
              Upcoming Sessions
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="card p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-navy">Junior Builders — Cohort 2</p>
                    <p className="text-xs text-text-muted">Today at 4:00 PM (GMT)</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg h-8 text-[10px] uppercase font-bold tracking-widest text-baby border-baby">Join Meet</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- STUDENT VIEW ---
  if (user?.role === ROLES.STUDENT) {
    return (
      <div className="space-y-8">
        <PageHeader 
          title="My Learning" 
          subtitle={`Keep building, ${user.name.split(' ')[0]}! You have 1 session today.`}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 bg-navy text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-baby/10 rounded-full translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform"></div>
            <p className="text-xs font-bold text-baby uppercase tracking-widest mb-1">Your Balance</p>
            <h3 className="text-3xl font-display font-bold mb-6 flex items-center gap-2 text-gold">
              <Wallet className="w-8 h-8" />
              {user.coinBalance}
            </h3>
            <Button className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl h-12 font-bold border border-white/10">
              Visit Shop
            </Button>
          </div>
          
          <div className="card p-6 border-baby/20 bg-surface-2">
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Current Points</p>
            <h3 className="text-3xl font-display font-bold mb-6 flex items-center gap-2 text-baby">
              <Zap className="w-8 h-8 fill-current" />
              {user.points}
            </h3>
            <div className="w-full h-2 bg-surface-3 rounded-full overflow-hidden">
              <div className="h-full bg-baby w-[65%] rounded-full"></div>
            </div>
            <p className="text-[10px] font-bold text-text-muted mt-2 uppercase tracking-widest">340 points to next level</p>
          </div>

          <div className="card p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Daily Streak</p>
              <h3 className="text-3xl font-display font-bold text-teal">5 Days</h3>
            </div>
            <p className="text-xs text-text-secondary mt-4">Maintained for 2 weeks! Keep it up for a 20 coin bonus.</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-display font-bold text-navy flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-baby" />
            My Active Cohorts
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map(e => (
              <div key={e.id} className="card p-6 hover:shadow-xl transition-all cursor-pointer group" onClick={() => navigate(`/app/cohorts/${e.cohortId}`)}>
                <div className="w-12 h-12 bg-baby/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Map className="w-6 h-6 text-baby" />
                </div>
                <h4 className="text-lg font-display font-bold text-navy mb-1 leading-tight">Little Explorers — Cohort 1</h4>
                <p className="text-xs text-text-muted mb-4 uppercase tracking-wider font-bold">Expires: June 15, 2026</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-3">
                  <span className="text-xs font-bold text-teal">Lesson 4 of 8 Complete</span>
                  <ArrowRight className="w-4 h-4 text-baby" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- PARENT VIEW ---
  if (user?.role === ROLES.PARENT) {
    if (selectedChild) {
      return (
        <div className="space-y-8">
          <PageHeader 
            title={selectedChild.name} 
            subtitle="Detailed learning progress and track overview."
            backUrl="#"
            onBack={() => setSelectedChild(null)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="card p-6 bg-surface-2 border-baby/20">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Current Points</p>
                <h3 className="text-3xl font-display font-bold text-baby flex items-center gap-2">
                  <Zap className="w-6 h-6 fill-current" />
                  {selectedChild.points}
                </h3>
             </div>
             <div className="card p-6 bg-surface-2 border-gold/20">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Coin Balance</p>
                <h3 className="text-3xl font-display font-bold text-gold flex items-center gap-2">
                  <Wallet className="w-6 h-6" />
                  {selectedChild.coinBalance}
                </h3>
             </div>
             <div className="card p-6 bg-surface-2">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Active Track</p>
                <h3 className="text-xl font-display font-bold text-navy mt-1">Foundations (Lvl 2)</h3>
             </div>
          </div>

          <div className="space-y-4">
             <h3 className="text-xl font-display font-bold text-navy">Curriculum Progress</h3>
             <div className="card p-8">
                <div className="space-y-6">
                   {[
                     { name: "Scratch Master", progress: 85, status: "Active" },
                     { name: "Logic Puzzles", progress: 100, status: "Completed" },
                     { name: "Project: My First Game", progress: 40, status: "In Progress" }
                   ].map(item => (
                     <div key={item.name}>
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-sm font-bold text-navy">{item.name}</span>
                           <span className="text-xs font-bold text-text-muted uppercase tracking-widest">{item.status}</span>
                        </div>
                        <div className="h-2 w-full bg-surface-3 rounded-full overflow-hidden">
                           <div className="h-full bg-baby rounded-full" style={{ width: `${item.progress}%` }}></div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <PageHeader 
          title="Parent Dashboard" 
          subtitle="Monitor your children's progress and manage your wallet."
          actions={
            <Button onClick={() => navigate("/app/wallet")} className="bg-navy text-white hover:bg-navy2 font-bold rounded-xl px-6">
              Manage Wallet
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 card p-8 bg-navy text-white">
            <p className="text-[10px] font-bold text-baby uppercase tracking-widest mb-2">Family Wallet Balance</p>
            <h3 className="text-5xl font-display font-bold text-gold mb-6">{user.coinBalance} <span className="text-sm font-sans text-white/50">coins</span></h3>
            <Button className="w-full bg-baby text-navy hover:bg-baby-dark font-bold rounded-xl h-14">Top Up Wallet</Button>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-display font-bold text-navy flex items-center gap-2">
              <UserSquare2 className="w-5 h-5 text-baby" />
              My Children
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {children.map(child => (
                <div 
                  key={child.id} 
                  className="card p-6 flex flex-col justify-between hover:border-baby/40 transition-all cursor-pointer group"
                  onClick={() => setSelectedChild(child)}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-surface-3 flex items-center justify-center font-display font-bold text-navy text-xl group-hover:bg-baby transition-colors">
                      {child.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-navy">{child.name}</h4>
                      <div className="flex gap-4 mt-1">
                        <CoinBadge amount={child.coinBalance} className="text-[10px]" />
                        <PointsBadge points={child.points} className="text-[10px]" />
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full rounded-xl border-surface-3 hover:bg-surface-2 text-navy flex justify-between">
                    <span>View Progress</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
