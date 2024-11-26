import React from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { BookOpen } from 'lucide-react';

export default function Header() {
  const userName = useUserStore((state) => state.name);

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold hover:text-indigo-100 transition duration-200"
          >
            <BookOpen size={32} />
            <span>Learning Hub</span>
          </Link>
          {userName && (
            <div className="flex items-center space-x-4">
              <span className="text-sm">Welcome, {userName}!</span>
              <Link
                to="/admin"
                className="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 transition duration-200"
              >
                Admin Panel
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}