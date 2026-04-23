import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, RefreshCcw } from "lucide-react";

export default function LessonQuiz({ quiz, onComplete }: { quiz: any; onComplete: (score: number) => void }) {
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let correct = 0;
    quiz.questions.forEach((q: any) => {
      if (q.type === 'multiple_choice' && answers[q.id] === q.correctIndex) correct++;
      if (q.type === 'true_false' && answers[q.id] === q.correctAnswer) correct++;
    });
    const s = Math.round((correct / quiz.questions.length) * 100);
    setScore(s);
    setSubmitted(true);
    onComplete(s);
  };

  const isPassed = score >= quiz.passingScore;

  return (
    <div className="space-y-10 py-6">
      {!submitted ? (
        <>
          <div className="space-y-12">
            {quiz.questions.map((q: any, i: number) => (
              <div key={q.id} className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-navy text-white flex items-center justify-center font-display font-bold shrink-0">{i + 1}</div>
                  <h4 className="text-xl font-display font-bold text-navy leading-tight">{q.question}</h4>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-3 pl-12">
                  {q.type === 'multiple_choice' ? (
                    q.options.map((opt: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setAnswers({...answers, [q.id]: idx})}
                        className={`p-4 text-left rounded-xl border-2 transition-all font-medium ${
                          answers[q.id] === idx ? "border-baby bg-baby/5 text-navy" : "border-surface-3 bg-surface-2 text-text-secondary hover:border-baby/30"
                        }`}
                      >
                        {opt}
                      </button>
                    ))
                  ) : (
                    <>
                      <button
                        onClick={() => setAnswers({...answers, [q.id]: true})}
                        className={`p-4 text-left rounded-xl border-2 transition-all font-medium ${
                          answers[q.id] === true ? "border-baby bg-baby/5 text-navy" : "border-surface-3 bg-surface-2 text-text-secondary hover:border-baby/30"
                        }`}
                      >
                        True
                      </button>
                      <button
                        onClick={() => setAnswers({...answers, [q.id]: false})}
                        className={`p-4 text-left rounded-xl border-2 transition-all font-medium ${
                          answers[q.id] === false ? "border-baby bg-baby/5 text-navy" : "border-surface-3 bg-surface-2 text-text-secondary hover:border-baby/30"
                        }`}
                      >
                        False
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-10 border-t border-surface-3 flex justify-center">
            <Button 
              size="lg" 
              onClick={handleSubmit} 
              disabled={Object.keys(answers).length < quiz.questions.length}
              className="bg-baby text-navy hover:bg-baby-dark font-bold rounded-full px-12 h-14"
            >
              Submit Quiz
            </Button>
          </div>
        </>
      ) : (
        <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-500">
          <div className={`p-10 rounded-[3rem] text-center border-2 ${isPassed ? 'bg-teal/5 border-teal/20' : 'bg-red-50 border-red-100'}`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isPassed ? 'bg-teal text-white shadow-xl shadow-teal/20' : 'bg-red-500 text-white shadow-xl shadow-red-200'}`}>
              {isPassed ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
            </div>
            <h3 className="text-4xl font-display font-bold text-navy mb-2">{isPassed ? "WELL DONE!" : "KEEP TRYING"}</h3>
            <p className="text-text-secondary font-medium mb-8">You scored {score}% in this understanding check.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isPassed && (
                <Button variant="outline" className="rounded-full border-red-200 text-red-600 hover:bg-red-50 px-8" onClick={() => { setSubmitted(false); setAnswers({}); }}>
                  <RefreshCcw className="w-4 h-4 mr-2" /> Try Again
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest text-center">Question Review</h4>
            {quiz.questions.map((q: any) => {
              const isCorrect = q.type === 'multiple_choice' ? answers[q.id] === q.correctIndex : answers[q.id] === q.correctAnswer;
              return (
                <div key={q.id} className={`p-6 rounded-2xl border ${isCorrect ? 'border-teal/20 bg-teal/5' : 'border-red-100 bg-red-50/30'}`}>
                  <div className="flex gap-3 mb-2">
                    {isCorrect ? <CheckCircle2 className="w-5 h-5 text-teal shrink-0" /> : <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                    <h5 className="font-bold text-navy">{q.question}</h5>
                  </div>
                  <p className="text-xs text-text-secondary ml-8 italic leading-relaxed">
                    <span className="font-bold">Explanation:</span> {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
