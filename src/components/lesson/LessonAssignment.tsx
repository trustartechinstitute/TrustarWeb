import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ExternalLink, Send, FileCheck } from "lucide-react";
import { api } from "@/src/services/api";

export default function LessonAssignment({ lesson, studentId }: { lesson: any; studentId: string }) {
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.createLead({ // Mock submission logic - reuse lead for now or just push to submissions
        // Real api should have submitAssignment
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
              disabled={loading || !content}
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
          <div className="p-4 bg-white rounded-2xl border border-surface-3 text-left">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Your Submission</p>
            <p className="text-sm font-medium text-navy line-clamp-2">{content}</p>
          </div>
          <Button variant="ghost" className="mt-8 text-baby font-bold hover:bg-baby/5" onClick={() => setSubmitted(false)}>
            Edit Submission
          </Button>
        </div>
      )}
    </div>
  );
}
