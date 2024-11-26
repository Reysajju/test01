import React, { useState, useCallback } from 'react';
import { Mic, RotateCcw } from 'lucide-react';
import { paragraphs } from '../data/paragraphs';
import { useUserStore } from '../store/userStore';
import ReadingProgress from '../components/ReadingProgress';
import ReadingText from '../components/ReadingText';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export default function English() {
  const [currentParagraph] = useState(() => 
    paragraphs[Math.floor(Math.random() * paragraphs.length)]
  );
  const [highlightedWords, setHighlightedWords] = useState<Array<{ index: number; correct: boolean }>>([]);
  const [wordsRead, setWordsRead] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const updateEnglishAccuracy = useUserStore((state) => state.updateEnglishAccuracy);

  const handleSpeechResult = useCallback((transcript: string) => {
    const spokenWords = transcript.toLowerCase().trim().split(' ');
    const targetWords = currentParagraph.text.toLowerCase().split(' ');
    
    const newHighlights = spokenWords.map((word, index) => ({
      index,
      correct: word === targetWords[index],
    }));

    setHighlightedWords(newHighlights);
    setWordsRead(spokenWords.length);
    
    const correctWords = newHighlights.filter((h) => h.correct).length;
    const newAccuracy = (correctWords / spokenWords.length) * 100;
    setAccuracy(newAccuracy);
  }, [currentParagraph.text]);

  const handleSpeechEnd = useCallback(() => {
    updateEnglishAccuracy(accuracy);
  }, [accuracy, updateEnglishAccuracy]);

  const { isListening, error, startListening } = useSpeechRecognition({
    onResult: handleSpeechResult,
    onEnd: handleSpeechEnd,
  });

  const handleReset = () => {
    setHighlightedWords([]);
    setWordsRead(0);
    setAccuracy(100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Reading Practice</h1>
        <p className="text-gray-600">
          Read the paragraph aloud and we'll track your progress
        </p>
      </div>

      <ReadingText
        text={currentParagraph.text}
        highlightedWords={highlightedWords}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReadingProgress
          accuracy={accuracy}
          wordsRead={wordsRead}
          totalWords={currentParagraph.text.split(' ').length}
        />

        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => startListening()}
              disabled={isListening || !!error}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg ${
                isListening
                  ? 'bg-green-500 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              } transition duration-200`}
            >
              <Mic size={20} />
              <span>{isListening ? 'Listening...' : 'Start Reading'}</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition duration-200"
            >
              <RotateCcw size={20} />
              <span>Reset</span>
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}