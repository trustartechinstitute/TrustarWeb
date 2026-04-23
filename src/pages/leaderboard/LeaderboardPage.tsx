import { useState, useEffect } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import { api } from "@/src/services/api";
import { Trophy, Medal, Zap, Star } from "lucide-react";
import { PointsBadge } from "@/src/components/common/PointsBadge";

export default function LeaderboardPage() {
  const [board, setBoard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const cohorts = await api.getCohorts();
        if (cohorts && cohorts.length > 0) {
          const l = await api.getLeaderboardByCohortId(cohorts[0].id);
          setBoard(l || []);
        }
      } catch (err) {
        console.error("Leaderboard load failed", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Platform Leaderboard" 
        subtitle="Celebrating our most consistent and dedicated builders this month."
      />

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 card p-0 bg-white border-surface-3 rounded-[2.5rem] overflow-hidden">
          <div className="bg-navy p-10 text-white flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-baby rounded-2xl flex items-center justify-center text-navy shadow-xl shadow-baby/20">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold">Top of the Class</h3>
                <p className="text-white/50 font-medium font-body uppercase tracking-[0.2em] text-[10px]">Cohort 1 Community</p>
              </div>
            </div>
            <div className="hidden sm:flex gap-4">
              <div className="text-center">
                <p className="text-3xl font-display font-bold">{board.length}</p>
                <p className="text-[8px] font-bold text-white/30 tracking-widest uppercase">Students</p>
              </div>
              <div className="w-[1px] bg-white/10 mx-2"></div>
              <div className="text-center">
                <p className="text-3xl font-display font-bold">4.2k</p>
                <p className="text-[8px] font-bold text-white/30 tracking-widest uppercase">Total Pts</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-4">
              {board.map((entry, i) => (
                <div key={entry.studentId} className={`flex items-center justify-between p-6 rounded-[2rem] transition-all ${i === 0 ? 'bg-baby/10 border-2 border-baby shadow-lg shadow-baby/5' : 'bg-surface-2 border border-surface-3'}`}>
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 flex items-center justify-center font-display font-black text-2xl text-navy/20">
                      {i === 0 ? <Medal className="w-8 h-8 text-gold" /> : i + 1}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-surface-3 border-2 border-white flex items-center justify-center font-display font-bold text-navy">
                        {entry.displayName.charAt(0)}
                      </div>
                      <h4 className="text-xl font-display font-bold text-navy">{entry.displayName}</h4>
                    </div>
                  </div>
                  <PointsBadge points={entry.totalPoints} className="text-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="card p-8 bg-baby/5 border-baby/20 relative overflow-hidden group">
             <Star className="absolute top-4 right-4 w-12 h-12 text-baby/20 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
             <h4 className="text-xs font-bold text-baby uppercase tracking-widest mb-4">How to earn pts</h4>
             <div className="space-y-4">
                {[
                  { label: "Lesson completed", val: "+10" },
                  { label: "Quiz passed", val: "+10" },
                  { label: "Assignment submitted", val: "+15" },
                  { label: "Session attended", val: "+20" },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center text-xs font-medium">
                    <span className="text-text-secondary">{item.label}</span>
                    <span className="font-bold text-navy">{item.val}</span>
                  </div>
                ))}
             </div>
           </div>

           <div className="card p-8 bg-surface-2">
             <Zap className="w-8 h-8 text-baby mb-4" />
             <h4 className="text-lg font-display font-bold text-navy mb-2">Build a Streak</h4>
             <p className="text-xs text-text-secondary leading-relaxed">Attend consecutive sessions to earn an extra <span className="font-bold text-baby">+5 points</span> per session.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
