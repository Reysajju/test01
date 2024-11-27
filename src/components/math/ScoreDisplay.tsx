import React from 'react';
import { Calculator } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  attempts: number;
  feedback: 'correct' | 'incorrect' | null;
}

export function ScoreDisplay({ score, attempts, feedback }: ScoreDisplayProps) {
  return (
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
  );
}