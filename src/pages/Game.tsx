import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { GamepadIcon, Trophy } from 'lucide-react';
import { paragraphs } from '../data/paragraphs';
import { speakWord } from '../utils/speechUtils';

interface Word {
  word: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export default function Game() {
  const [gameWords] = useState<Word[]>(() => {
    return paragraphs.flatMap(p => 
      p.text.split(' ').map(word => ({
        word: word.toLowerCase().replace(/[.,!?]/g, ''),
        level: p.level as 'beginner' | 'intermediate' | 'advanced'
      }))
    );
  });

  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [streak, setStreak] = useState(0);
  const updateGameProgress = useUserStore(state => state.updateGameProgress);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    selectNewWord();
  }, [currentLevel]);

  const selectNewWord = () => {
    const levelWords = gameWords.filter(word => {
      if (currentLevel <= 10) return word.level === 'beginner';
      if (currentLevel <= 20) return word.level === 'intermediate';
      return word.level === 'advanced';
    });
    const randomWord = levelWords[Math.floor(Math.random() * levelWords.length)];
    setCurrentWord(randomWord);
  };

  const playWord = () => {
    if (currentWord && !isPlaying) {
      setIsPlaying(true);
      speakWord(currentWord.word, () => setIsPlaying(false));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWord) return;

    const isCorrect = userInput.toLowerCase() === currentWord.word;
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore(score + (currentLevel * 10));
      
      if (newStreak >= 3) {
        setStreak(0);
        setCurrentLevel(prev => Math.min(prev + 1, 30));
      }

      // Play a success sound
      speakWord('Correct! Well done!');
    } else {
      setStreak(0);
      // Play the correct word again
      speakWord(`The correct spelling is ${currentWord.word}`);
    }

    updateGameProgress(currentLevel, score);

    setTimeout(() => {
      setUserInput('');
      setFeedback(null);
      selectNewWord();
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Spelling Challenge</h1>
        <p className="text-gray-600">Test your spelling skills and earn points!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <div className="flex items-center justify-center">
            <GamepadIcon size={48} className="text-purple-600" />
          </div>
          
          {currentWord && (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-lg font-medium text-gray-700 mb-2">Listen and type:</p>
                <button
                  onClick={playWord}
                  disabled={isPlaying}
                  className={`bg-purple-100 text-purple-700 px-6 py-3 rounded-full hover:bg-purple-200 transition duration-200 ${
                    isPlaying ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  🔊 {isPlaying ? 'Playing...' : 'Play Word'}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className={`w-full text-center text-2xl p-4 border rounded-lg focus:outline-none focus:ring-2 ${
                    feedback === 'correct'
                      ? 'border-green-500 ring-green-200'
                      : feedback === 'incorrect'
                      ? 'border-red-500 ring-red-200'
                      : 'border-gray-300 focus:ring-purple-200'
                  }`}
                  placeholder="Type the word here"
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white rounded-lg py-3 px-6 hover:bg-purple-700 transition duration-200"
                >
                  Check Spelling
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <div className="flex items-center justify-center">
            <Trophy size={48} className="text-yellow-500" />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Level:</span>
              <span className="text-2xl font-bold text-purple-600">
                {currentLevel}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Score:</span>
              <span className="text-2xl font-bold text-purple-600">
                {score}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Streak:</span>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < streak ? 'bg-yellow-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
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
                  ? '🎉 Correct spelling!'
                  : `❌ Incorrect. The word was: ${currentWord?.word}`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}