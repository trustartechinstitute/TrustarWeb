import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Send, FileCheck, Loader2 } from "lucide-react";
import { api } from "@/src/services/api";

export default function LessonAssignment({ lesson, studentId }: { lesson: any; studentId: string }) {
  const { id: cohortId } = useParams();
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [existingSubmission, setExistingSubmission] = useState<any>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function checkExisting() {
      if (!studentId || !lesson.id) return;
      try {
        const subs: any[] = await api.getSubmissionsByStudentId(studentId);
        const match = subs.find((s: any) => s.lessonId === lesson.id);
        if (match) {
          setExistingSubmission(match);
          setSubmitted(true);
          setContent(match.content);
        }
      } catch (err) {
        console.error("Error checking submissions:", err);
      } finally {
        setFetching(false);
      }
    }
    checkExisting();
  }, [studentId, lesson.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setLoading(true);
    try {
      await api.submitAssignment({
        studentId,
        cohortId,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        content: content.trim(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="py-20 text-center flex flex-col items-center gap-4">
      <Loader2 className="w-8 h-8 text-baby animate-spin" />
      <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Checking status...</p>
    </div>
  );

  return (
    <div className="py-6">
      {!submitted ? (
        <div className="card p-10 bg-surface-2 border-baby/20 rounded-[2.5rem]">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-baby/10 text-baby font-bold text-xs uppercase tracking-widest rounded-full mb-4">
              <FileCheck className="w-3 h-3" />
              Submission Required
            </div>
            <h3 className="text-2xl font-display font-bold text-navy mb-4">Your Assignment</h3>
            <div className="prose prose-navy max-w-none font-medium text-text-secondary leading-relaxed">
              <p>{lesson.assignmentInstructions}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Project Link or Description</label>
              <Textarea 
                required 
                placeholder="Paste your Scratch project link or write your submission here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[180px] rounded-2xl bg-white border-surface-3 focus:border-baby resize-none p-6 font-medium"
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading || !content.trim()}
              className="bg-navy text-white hover:bg-navy2 font-bold rounded-full px-12 h-14 w-full sm:w-auto"
            >
              {loading ? "Submitting..." : "Submit Assignment"}
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </div>
      ) : (
        <div className="max-w-xl mx-auto text-center py-12 bg-teal/5 border border-teal/20 rounded-[3rem] p-10 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-20 h-20 bg-teal text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-3xl font-display font-bold text-navy mb-2">SUBMITTED!</h3>
          <p className="text-text-secondary font-medium leading-relaxed mb-8">
            Your assignment has been sent for grading. You've earned <span className="text-baby font-bold">15 points</span> for submitting!
          </p>
          
          {existingSubmission?.instructorFeedback && (
            <div className="mb-6 p-6 bg-baby/10 border border-baby/20 rounded-2xl text-left">
              <p className="text-[10px] font-bold text-baby uppercase tracking-widest mb-2">Instructor Feedback</p>
              <p className="text-sm font-medium text-navy italic">"{existingSubmission.instructorFeedback}"</p>
              <div className="mt-4 pt-4 border-t border-baby/10 flex justify-between">
                <span className="text-xs font-bold text-text-muted uppercase">Points Awarded</span>
                <span className="text-sm font-bold text-baby">+{existingSubmission.pointsAwarded} pts</span>
              </div>
            </div>
          )}

          <div className="p-4 bg-white rounded-2xl border border-surface-3 text-left">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Your Submission</p>
            <p className="text-sm font-medium text-navy line-clamp-3">{content}</p>
          </div>
          
          <Button variant="ghost" className="mt-8 text-baby font-bold hover:bg-baby/5" onClick={() => setSubmitted(false)}>
            {existingSubmission?.status === 'approved' ? "View Submission" : "Edit Submission"}
          </Button>
        </div>
      )}
    </div>
  );
}
