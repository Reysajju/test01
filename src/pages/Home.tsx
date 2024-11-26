import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calculator, GamepadIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Welcome to Your Learning Journey!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'English',
            icon: BookOpen,
            path: '/english',
            color: 'from-green-400 to-emerald-600',
            description: 'Practice reading and pronunciation',
          },
          {
            title: 'Math',
            icon: Calculator,
            path: '/math',
            color: 'from-blue-400 to-indigo-600',
            description: 'Improve your calculation skills',
          },
          {
            title: 'Game',
            icon: GamepadIcon,
            path: '/game',
            color: 'from-purple-400 to-pink-600',
            description: 'Learn while having fun',
          },
        ].map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div
              className={`bg-gradient-to-br ${item.color} p-6 h-full flex flex-col items-center justify-center text-white`}
            >
              <item.icon
                size={48}
                className="mb-4 transform group-hover:scale-110 transition-transform duration-300"
              />
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p className="text-center text-sm opacity-90">
                {item.description}
              </p>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}