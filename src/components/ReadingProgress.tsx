import React from 'react';

interface Props {
  accuracy: number;
  wordsRead: number;
  totalWords: number;
}

export default function ReadingProgress({ accuracy, wordsRead, totalWords }: Props) {
  const progress = (wordsRead / totalWords) * 100;

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        <span className="text-sm font-medium text-gray-700">
          {wordsRead} / {totalWords} words
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">Accuracy</span>
        <span
          className={`text-sm font-medium ${
            accuracy >= 80 ? 'text-green-600' : 'text-orange-500'
          }`}
        >
          {accuracy.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}