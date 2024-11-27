import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { Calculator } from 'lucide-react';
import { generateMathProblem } from '../utils/mathUtils';
import { ScoreDisplay } from '../components/math/ScoreDisplay';
import { ProblemDisplay } from '../components/math/ProblemDisplay';

export default function MathPage() {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const updateMathScore = useUserStore((state) => state.updateMathScore);
  const [problem, setProblem] = useState(generateMathProblem());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = Number(userAnswer) === problem.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setAttempts(attempts + 1);
    
    if (isCorrect) {
      setScore(score + 1);
      updateMathScore(1);
      setTimeout(() => {
        setProblem(generateMathProblem());
        setUserAnswer('');
        setFeedback(null);
      }, 1000);
    } else {
      setTimeout(() => {
        setUserAnswer('');
        setFeedback(null);
      }, 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Math Practice</h1>
        <p className="text-gray-600">
          Solve arithmetic problems and improve your calculation skills
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProblemDisplay
          problem={problem}
          userAnswer={userAnswer}
          feedback={feedback}
          onAnswerChange={setUserAnswer}
          onSubmit={handleSubmit}
        />

        <ScoreDisplay
          score={score}
          attempts={attempts}
          feedback={feedback}
        />
      </div>
    </div>
  );
}