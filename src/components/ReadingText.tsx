import React from 'react';

interface Props {
  text: string;
  highlightedWords: {
    index: number;
    correct: boolean;
  }[];
}

export default function ReadingText({ text, highlightedWords }: Props) {
  const words = text.split(' ');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-lg leading-relaxed">
        {words.map((word, index) => {
          const highlight = highlightedWords.find((h) => h.index === index);
          const className = highlight
            ? highlight.correct
              ? 'bg-green-200'
              : 'bg-red-200'
            : '';
          return (
            <span
              key={index}
              className={`${className} px-0.5 rounded transition-colors duration-200`}
            >
              {word}{' '}
            </span>
          );
        })}
      </p>
    </div>
  );
}