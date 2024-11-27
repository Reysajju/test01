import React from 'react';

interface ProblemDisplayProps {
  problem: {
    num1: number;
    num2: number;
    operator: string;
  };
  userAnswer: string;
  feedback: 'correct' | 'incorrect' | null;
  onAnswerChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ProblemDisplay({
  problem,
  userAnswer,
  feedback,
  onAnswerChange,
  onSubmit
}: ProblemDisplayProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
      <div className="flex items-center justify-center space-x-4 text-4xl font-bold text-gray-800">
        <span>{problem.num1}</span>
        <span>{problem.operator}</span>
        <span>{problem.num2}</span>
        <span>=</span>
        <span>?</span>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
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
  );
}