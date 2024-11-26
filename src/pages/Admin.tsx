import React from 'react';
import { useUserStore } from '../store/userStore';
import { LineChart, BookOpen, Calculator, GamepadIcon } from 'lucide-react';

export default function Admin() {
  const {
    englishAccuracy,
    mathScore,
    gameLevel,
    gameScore,
  } = useUserStore();

  const averageAccuracy = englishAccuracy.length
    ? (englishAccuracy.reduce((a, b) => a + b, 0) / englishAccuracy.length).toFixed(1)
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Progress Dashboard</h1>
        <p className="text-gray-600">Track your learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="flex items-center justify-center">
            <BookOpen size={32} className="text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-center">English</h2>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{averageAccuracy}%</p>
            <p className="text-sm text-gray-600">Average Accuracy</p>
          </div>
          <p className="text-sm text-center text-gray-500">
            {englishAccuracy.length} sessions completed
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="flex items-center justify-center">
            <Calculator size={32} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-center">Math</h2>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">{mathScore}</p>
            <p className="text-sm text-gray-600">Total Score</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="flex items-center justify-center">
            <GamepadIcon size={32} className="text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-center">Game</h2>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">{gameLevel}</p>
            <p className="text-sm text-gray-600">Current Level</p>
          </div>
          <p className="text-sm text-center text-gray-500">
            Score: {gameScore}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4 mb-6">
          <LineChart size={24} className="text-gray-600" />
          <h2 className="text-xl font-semibold">Recent Activity</h2>
        </div>
        <div className="space-y-4">
          {englishAccuracy.slice(-5).map((accuracy, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-gray-600">Reading Session {index + 1}</span>
              <span className="font-medium text-green-600">{accuracy.toFixed(1)}% accuracy</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}