import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onResult: (transcript: string) => void;
  onEnd: () => void;
}

export function useSpeechRecognition({ onResult, onEnd }: UseSpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }
  }, []);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) return;

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      onResult(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
      onEnd();
    };

    recognition.start();
    setIsListening(true);

    return recognition;
  }, [onResult, onEnd]);

  return {
    isListening,
    error,
    startListening,
  };
}