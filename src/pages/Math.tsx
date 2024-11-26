import React, { useState, useCallback } from 'react';
import { useUserStore } from '../store/userStore'; // Make sure the store is correctly implemented
import { Calculator } from 'lucide-react'; // Ensure correct import from lucide-react

interface Problem {
  num1: number;
  num2: number;
  operator: '+' | '-' | '×' | '÷';
  answer: number;
}

export default function Math() {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const updateMathScore = useUserStore((state) => state.updateMathScore);

  const generateProblem = useCallback((): Problem => {
    const operators: ('+' | '-' | '×' | '÷')[] = ['+', '-', '×', '÷'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1: number, num2: number, answer: number;

    switch (operator) {
      case '+':
        num1 = Math.floor(Math.random() * 100) + 1;
        num2 = Math.floor(Math.random() * 100) + 1;
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 100) + 1;
        num2 = Math.floor(Math.random() * num1) + 1;
        answer = num1 - num2;
        break;
      case '×':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = num1 * num2;
        break;
      case '÷':
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = Math.floor(Math.random() * 12) + 1;
        num1 = num2 * answer;
        break;
    }

    return { num1, num2, operator, answer };
  }, []);

  const [problem, setProblem] = useState<Problem>(generateProblem());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = Number(userAnswer) === problem.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setAttempts(attempts + 1);

    if (isCorrect) {
      setScore(score + 1);
      updateMathScore(1); // Make sure this updates the global score or state
      setTimeout(() => {
        setProblem(generateProblem());
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
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <div className="flex items-center justify-center space-x-4 text-4xl font-bold text-gray-800">
            <span>{problem.num1}</span>
            <span>{problem.operator}</span>
            <span>{problem.num2}</span>
            <span>=</span>
            <span>?</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className={`w-full text-center text-2xl p-4 border rounded-lg focus:outline-none focus:ring-2 ${
                feedback === 'correct'
                  ? 'border-green-500 ring-green-200'
                  : feedback === 'incorrect'
                  ? 'border-red-500 ring-red-200'
                  : 'border-gray-300 focus:ring-indigo-200'
              }`}
              placeholder="Enter your answer"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white rounded-lg py-3 px-6 hover:bg-indigo-700 transition duration-200"
            >
              Check Answer
            </button>
          </form>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <div className="flex items-center justify-center">
            <Calculator size={48} className="text-indigo-600" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Score:</span>
              <span className="text-2xl font-bold text-indigo-600">
                {score} / {attempts}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: `${attempts > 0 ? (score / attempts) * 100 : 0}%`,
                }}
              />
            </div>
            {feedback && (
              <div
                className={`text-center p-2 rounded-lg ${
                  feedback === 'correct'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {feedback === 'correct'
                  ? '🎉 Correct! Great job!'
                  : '❌ Try again!'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
