import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';

export default function NameModal() {
  const [name, setName] = useState('');
  const setUserName = useUserStore((state) => state.setName);
  const userName = useUserStore((state) => state.name);

  if (userName) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setUserName(name);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Welcome to Learning Hub!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Please enter your name to begin
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder="Your name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 transition duration-200"
          >
            Start Learning
          </button>
        </form>
      </div>
    </div>
  );
}