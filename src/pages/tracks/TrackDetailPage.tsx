import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "@/src/components/common/PageHeader";
import { api } from "@/src/services/api";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Play, Star, Clock } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { ROLES } from "@/src/utils/constants";
import { EmptyState } from "@/src/components/common/EmptyState";

export default function TrackDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [track, setTrack] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      const t = await api.getTrackById(id);
      if (t) {
        setTrack(t);
        const c = await api.getCoursesByTrackId(t.id);
        setCourses(c);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <div>Loading track details...</div>;
  if (!track) return <EmptyState title="Track Not Found" description="The track you are looking for does not exist." icon={Map} />;

  return (
    <div className="space-y-8">
      <PageHeader 
        title={track.name} 
        subtitle={track.description}
        backUrl="/app/tracks"
        actions={user?.role === ROLES.ADMIN && <Button className="rounded-xl font-bold bg-baby text-navy">Edit Track</Button>}
      />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-display font-bold text-navy flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-baby" />
            Learning Units
          </h3>
          
          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={course.id} className="card p-6 flex items-start gap-6 group hover:border-baby/30 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-surface-3 rounded-2xl flex items-center justify-center font-display font-bold text-navy text-xl group-hover:bg-baby group-hover:text-navy transition-colors shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-display font-bold text-navy mb-1">{course.title}</h4>
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-text-muted">
                      <Clock className="w-3 h-3" />
                      {course.durationWeeks} Weeks
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-text-muted">
                      <Star className="w-3 h-3 text-baby" />
                      {course.level}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-baby group-hover:text-navy"
                  onClick={() => navigate(`/app/courses/${course.id}`)}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-8 bg-navy text-white relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-10 translate-y-10"></div>
            <h4 className="text-sm font-bold text-baby uppercase tracking-widest mb-6">Track Summary</h4>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/60 text-sm">Age Group</span>
                <span className="font-bold">{track.ageGroup}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/60 text-sm">Difficulty</span>
                <span className="font-bold capitalize">{track.level}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/60 text-sm">Total Units</span>
                <span className="font-bold">{courses.length}</span>
              </div>
            </div>
            
            <Button className="w-full bg-baby text-navy hover:bg-baby-dark font-bold h-14 rounded-2xl">
              Enrol in full track
            </Button>
          </div>

          <div className="card p-6 border-dashed border-2 bg-surface-2 flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm"><Play className="w-6 h-6 text-baby" /></div>
            <div>
              <p className="text-xs font-bold text-navy">Introductory Video</p>
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Watch before starting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
