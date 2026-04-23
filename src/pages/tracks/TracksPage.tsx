import { useState, useEffect } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import { api } from "@/src/services/api";
import { Button } from "@/components/ui/button";
import { Map, Plus, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/src/hooks/useAuth";
import { ROLES } from "@/src/utils/constants";

export default function TracksPage() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const t = await api.getTracks();
      setTracks(t);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div>Loading tracks...</div>;

  return (
    <div className="space-y-8">
      <PageHeader 
        title={user?.role === ROLES.ADMIN ? "Programme Tracks" : "My Tracks"}
        subtitle="Explore our learning paths designed for different age groups and skill levels."
        actions={user?.role === ROLES.ADMIN && (
          <Button className="bg-baby text-navy hover:bg-baby-dark font-bold rounded-xl px-6">
            <Plus className="w-4 h-4 mr-2" />
            Create Track
          </Button>
        )}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map(track => (
          <div key={track.id} className="card overflow-hidden flex flex-col hover:shadow-xl transition-all group">
            <div className="aspect-video bg-navy/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent z-10"></div>
              <img 
                src={track.thumbnailUrl || `https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=600&auto=format&fit=crop`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt={track.name}
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 bg-baby text-navy font-bold text-[10px] uppercase tracking-widest rounded-full">
                  Age {track.ageGroup}
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-display font-bold text-navy mb-2">{track.name}</h3>
              <p className="text-sm text-text-secondary font-medium line-clamp-2 mb-6">{track.description}</p>
              
              <div className="mt-auto pt-6 border-t border-surface-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Map className="w-4 h-4 text-baby" />
                  <span className="text-xs font-bold text-navy uppercase tracking-widest">{track.courseIds?.length || 0} Units</span>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-baby font-bold hover:bg-baby/10 group/btn"
                  onClick={() => navigate(`/app/tracks/${track.id}`)}
                >
                  View Track <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {user?.role === ROLES.ADMIN && (
          <button className="card p-10 border-dashed border-2 flex flex-col items-center justify-center text-text-muted hover:text-baby hover:border-baby transition-all group">
            <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-lg">Add New Track</span>
          </button>
        )}
      </div>
    </div>
  );
}
