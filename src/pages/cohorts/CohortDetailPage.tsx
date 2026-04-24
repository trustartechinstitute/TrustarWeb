import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "@/src/components/common/PageHeader";
import { api } from "@/src/services/api";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  ExternalLink, 
  FileText, 
  ChevronRight, 
  CheckCircle2, 
  BookOpen, 
  MessageSquare, 
  Clock 
} from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { ROLES } from "@/src/utils/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeliveryBadge } from "@/src/components/common/DeliveryBadge";
import { StatusBadge } from "@/src/components/common/StatusBadge";
import { Progress } from "@/components/ui/progress";

import DiscussionBoard from "@/src/components/discussion/DiscussionBoard";

export default function CohortDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cohort, setCohort] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      const c: any = await api.getCohortById(id);
      if (c) {
        setCohort(c);
        const l: any = await api.getLessonsByCourseId(c.courseId);
        // Pacing Filter: Only show lessons up to currentWeek (for students)
        if (user?.role === ROLES.STUDENT) {
            setLessons(l.filter((lesson: any) => lesson.week <= (c.currentWeek || 1)));
        } else {
            setLessons(l);
        }
        const crs = await api.getCourseById(c.courseId);
        setCourse(crs);
      }
      setLoading(false);
    }
    load();
  }, [id, user?.role]);

  if (loading) return <div>Loading cohort...</div>;
  if (!cohort) return <div>Cohort not found.</div>;

  return (
    <div className="space-y-8">
      <PageHeader 
        title={cohort.name} 
        subtitle={`${course?.title} — Running ${cohort.schedule}`}
        backUrl="/app/cohorts"
        actions={
          <div className="flex gap-2">
            {cohort.onlineMeetUrl && (
              <Button className="bg-baby text-navy hover:bg-baby-dark font-bold rounded-xl h-11" onClick={() => window.open(cohort.onlineMeetUrl)}>
                <ExternalLink className="w-4 h-4 mr-2" /> Join session
              </Button>
            )}
            {user?.role === ROLES.ADMIN && (
              <Button variant="outline" className="rounded-xl border-surface-3 font-bold h-11">Edit Cohort</Button>
            )}
          </div>
        }
      />

      <Tabs defaultValue="lessons" className="space-y-6">
        <TabsList className="bg-surface-2 p-1 rounded-xl w-full sm:w-auto h-auto">
          <TabsTrigger value="lessons" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-widest">
            Lessons
          </TabsTrigger>
          <TabsTrigger value="discussion" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-widest">
            Community
          </TabsTrigger>
          <TabsTrigger value="students" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-widest">
            Students
          </TabsTrigger>
          <TabsTrigger value="resources" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-widest">
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {lessons.map((lesson, idx) => (
                <div key={lesson.id} className="card p-6 flex items-center gap-6 group hover:border-baby/40 transition-all cursor-pointer" onClick={() => navigate(`/app/cohorts/${id}/lesson/${lesson.id}`)}>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 bg-surface-3 rounded-2xl flex items-center justify-center font-display font-bold text-navy text-xl group-hover:bg-baby transition-colors">
                      {lesson.session}
                    </div>
                    {lesson.status === 'published' ? (
                      <CheckCircle2 className="w-4 h-4 text-teal" />
                    ) : (
                      <Clock className="w-4 h-4 text-text-muted" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-display font-bold text-navy mb-1">{lesson.title}</h4>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      <span>Week {lesson.week}</span>
                      <span>•</span>
                      <StatusBadge status={lesson.status} />
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-baby group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="card p-8 bg-surface-2">
                <h4 className="text-xs font-bold text-navy uppercase tracking-widest mb-6">Cohort Progress</h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                      <span>Course Completion</span>
                      <span className="text-baby">65%</span>
                    </div>
                    <Progress value={65} className="h-2 bg-surface-3" />
                  </div>
                  
                  <div className="pt-4 border-t border-surface-3 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-text-secondary">Enrollment</span>
                      <div className="text-right">
                        <span className="text-sm font-bold text-navy">{cohort.studentsCount || 0}</span>
                        <span className="text-xs text-text-muted"> / {cohort.capacity || 10} students</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-text-secondary">Timeline</span>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-navy uppercase">{cohort.startDate || 'TBA'}</div>
                        <div className="text-[10px] text-text-muted uppercase">to {cohort.endDate || 'TBA'}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-text-secondary">Delivery</span>
                      <DeliveryBadge mode={cohort.deliveryMode} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-text-secondary">Status</span>
                      <StatusBadge status={cohort.status} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6 bg-navy text-white text-center">
                <Users className="w-8 h-8 text-baby mx-auto mb-4" />
                <h5 className="font-display font-bold text-lg mb-2">Cohort Discussion</h5>
                <p className="text-xs text-white/50 mb-6">Ask questions, share wins, and get help from instructors.</p>
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20">
                  Open Board
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="discussion">
          <div className="max-w-3xl mx-auto">
            <DiscussionBoard cohortId={id!} />
          </div>
        </TabsContent>

        {/* ... other tab contents ... */}
      </Tabs>
    </div>
  );
}
