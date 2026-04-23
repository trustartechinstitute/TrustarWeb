import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "@/src/services/api";
import { useAuth } from "@/src/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen, HelpCircle, FileCheck, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LessonContent from "@/src/components/lesson/LessonContent";
import LessonQuiz from "@/src/components/lesson/LessonQuiz";
import LessonAssignment from "@/src/components/lesson/LessonAssignment";

export default function LessonPage() {
  const { id: cohortId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lesson, setLesson] = useState<any>(null);
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("content");

  useEffect(() => {
    async function load() {
      if (!lessonId) return;
      const l = await api.getLessonById(lessonId);
      if (l) {
        setLesson(l);
        const q = await api.getQuizByLessonId(lessonId);
        setQuiz(q);
      }
      setLoading(false);
    }
    load();
  }, [lessonId]);

  if (loading) return <div className="p-12 text-center text-text-secondary">Loading lesson...</div>;
  if (!lesson) return <div className="p-12 text-center text-text-secondary">Lesson not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Lesson Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-2 border border-surface-3 p-4 rounded-2xl">
        <Button variant="ghost" className="rounded-xl font-bold flex items-center gap-2 text-text-secondary" onClick={() => navigate(`/app/cohorts/${cohortId}`)}>
          <ChevronLeft className="w-5 h-5" /> Back to Cohort
        </Button>
        <div className="text-center sm:text-right px-4">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-0.5">Lesson {lesson.session} of 8</p>
          <h2 className="text-lg font-display font-bold text-navy truncate max-w-[300px]">{lesson.title}</h2>
        </div>
      </div>

      {/* Main Content Area */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white border border-surface-3 rounded-[2.5rem] shadow-2xl shadow-navy/5 overflow-hidden">
        <div className="border-b border-surface-3 bg-surface-2/50 px-6 pt-6">
          <TabsList className="bg-transparent gap-8 h-auto pb-6 w-full justify-start overflow-x-auto no-scrollbar">
            <TabsTrigger value="content" className="p-0 border-b-2 border-transparent data-[state=active]:border-baby data-[state=active]:bg-transparent rounded-none h-10 gap-2 font-bold text-xs uppercase tracking-widest text-text-muted data-[state=active]:text-navy">
              <BookOpen className="w-4 h-4" /> Content
            </TabsTrigger>
            {quiz && (
              <TabsTrigger value="quiz" className="p-0 border-b-2 border-transparent data-[state=active]:border-baby data-[state=active]:bg-transparent rounded-none h-10 gap-2 font-bold text-xs uppercase tracking-widest text-text-muted data-[state=active]:text-navy">
                <HelpCircle className="w-4 h-4" /> Quiz
              </TabsTrigger>
            )}
            <TabsTrigger value="assignment" className="p-0 border-b-2 border-transparent data-[state=active]:border-baby data-[state=active]:bg-transparent rounded-none h-10 gap-2 font-bold text-xs uppercase tracking-widest text-text-muted data-[state=active]:text-navy">
              <FileCheck className="w-4 h-4" /> Assignment
            </TabsTrigger>
            <TabsTrigger value="discussion" className="p-0 border-b-2 border-transparent data-[state=active]:border-baby data-[state=active]:bg-transparent rounded-none h-10 gap-2 font-bold text-xs uppercase tracking-widest text-text-muted data-[state=active]:text-navy">
              <MessageSquare className="w-4 h-4" /> Community
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-8 sm:p-12 min-h-[600px]">
          <TabsContent value="content" className="mt-0 animate-in fade-in duration-300">
            <LessonContent contentBlocks={lesson.contentBlocks} />
            
            {lesson.practiceInstructions && (
              <div className="mt-12 p-8 bg-baby/5 border-2 border-baby/20 rounded-3xl">
                <h4 className="text-sm font-bold text-baby uppercase tracking-widest mb-4">Hands-on Practice</h4>
                <div className="prose prose-navy max-w-none text-text-secondary">
                  <p>{lesson.practiceInstructions}</p>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="quiz" className="mt-0 animate-in fade-in duration-300">
            <LessonQuiz quiz={quiz} onComplete={(score) => console.log('Quiz complete', score)} />
          </TabsContent>

          <TabsContent value="assignment" className="mt-0 animate-in fade-in duration-300">
            <LessonAssignment lesson={lesson} studentId={user?.id} />
          </TabsContent>

          <TabsContent value="discussion" className="mt-0 animate-in fade-in duration-300">
            <div className="text-center py-24 px-12 italic text-text-muted">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Cohort discussion board integration coming soon.</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button variant="outline" className="rounded-xl border-surface-3 font-bold h-12 px-8 text-text-secondary">
          <ChevronLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        <Button className="rounded-xl bg-navy text-white hover:bg-navy2 font-bold h-12 px-8">
          Next Lesson <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
