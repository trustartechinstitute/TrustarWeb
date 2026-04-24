import { useState, useEffect } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import { api } from "@/src/services/api";
import { DataTable } from "@/src/components/common/DataTable";
import { StatusBadge } from "@/src/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { 
  FileCheck, 
  Search, 
  MessageSquare, 
  Trophy,
  CheckCircle2,
  XCircle,
  Loader2
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [selectedSub, setSelectedSub] = useState<any>(null);
  const [grading, setGrading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [points, setPoints] = useState("10");

  useEffect(() => {
    async function load() {
      try {
        const allSubs = await api.getAllSubmissions();
        setSubmissions(allSubs || []); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleGrade = async (status: 'approved' | 'rejected') => {
    if (!selectedSub) return;
    setGrading(true);
    const promise = api.gradeSubmission(selectedSub.id, status, parseInt(points), feedback);
    
    toast.promise(promise, {
      loading: 'Saving grade...',
      success: () => {
        setSubmissions(prev => prev.map(s => s.id === selectedSub.id ? { ...s, status, instructorFeedback: feedback, pointsAwarded: parseInt(points) } : s));
        setSelectedSub(null);
        setFeedback("");
        return status === 'approved' ? 'Submission approved!' : 'Submission rejected.';
      },
      error: 'Failed to grade submission.',
      finally: () => setGrading(false)
    });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 text-baby animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Assignment Vault" 
        subtitle="Review and grade student submissions from across all cohorts."
      />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-surface-3 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input 
            placeholder="Search by student or lesson..." 
            className="pl-12 rounded-xl border-surface-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl border-surface-3 font-bold text-xs uppercase tracking-widest">
            Filter: Pending
          </Button>
        </div>
      </div>

      <div className="card p-0 overflow-hidden border-surface-3 shadow-xl shadow-navy/5">
        <DataTable 
          columns={[
            { key: "studentId", label: "Student ID" },
            { key: "lessonTitle", label: "Lesson" },
            { key: "status", label: "Status", render: (v) => <StatusBadge status={v} /> },
            { key: "pointsAwarded", label: "Points", render: (v) => <span className="font-bold text-baby">+{v}</span> },
            { key: "id", label: "Action", render: (_, row) => (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setSelectedSub(row);
                  setFeedback(row.instructorFeedback || "");
                  setPoints(row.pointsAwarded?.toString() || "10");
                }}
                className="font-bold text-baby hover:bg-baby/10"
              >
                Review
              </Button>
            )}
          ]}
          data={submissions}
        />
        {submissions.length === 0 && (
          <div className="py-20 text-center text-text-muted">
             <FileCheck className="w-16 h-16 mx-auto mb-4 opacity-10" />
             <p className="font-bold uppercase tracking-widest text-xs">No submissions found yet</p>
          </div>
        )}
      </div>

      {/* Grading Dialog */}
      <Dialog open={!!selectedSub} onOpenChange={() => setSelectedSub(null)}>
        <DialogContent className="max-w-2xl rounded-[2.5rem] bg-white p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold text-navy">Review Submission</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-2 rounded-2xl">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Student</p>
                <p className="font-bold text-navy">{selectedSub?.studentId}</p>
              </div>
              <div className="p-4 bg-surface-2 rounded-2xl">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Lesson</p>
                <p className="font-bold text-navy">{selectedSub?.lessonTitle}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Submitted Content</label>
              <div className="p-6 bg-navy/5 border border-navy/10 rounded-2xl text-navy font-medium leading-relaxed max-h-48 overflow-y-auto">
                {selectedSub?.content}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 items-end">
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Instructor Feedback</label>
                <Textarea 
                  placeholder="Write feedback for the student..." 
                  className="rounded-2xl border-surface-3 resize-none min-h-[100px]"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Award Pts</label>
                <Input 
                  type="number" 
                  className="rounded-xl h-12 border-surface-3 font-bold text-baby"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2 sm:justify-start">
            <Button 
               disabled={grading}
               className="bg-teal hover:bg-teal-700 text-white font-bold rounded-xl h-12 flex-1"
               onClick={() => handleGrade('approved')}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" /> Approve & Award
            </Button>
            <Button 
               variant="outline"
               disabled={grading}
               className="border-red-200 text-red-600 hover:bg-red-50 font-bold rounded-xl h-12"
               onClick={() => handleGrade('rejected')}
            >
              <XCircle className="w-4 h-4 mr-2" /> Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
