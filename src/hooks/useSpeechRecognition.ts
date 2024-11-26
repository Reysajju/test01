import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onResult: (transcript: string) => void; // Callback for handling speech recognition results
  onEnd: () => void; // Callback when speech recognition ends
  textToSpeak: string; // Text to convert to speech using a childlike voice
}

export function useSpeechRecognition({ onResult, onEnd, textToSpeak }: UseSpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false); // Tracks if the system is currently listening
  const [error, setError] = useState<string>(''); // Stores any errors

  // Check for browser support for speech recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser.');
    }
  }, []);

  // Function to handle speech synthesis (text-to-speech) in a childlike voice
  const speakChildVoice = useCallback(() => {
    const synth = window.speechSynthesis;

    if (!synth) {
      setError('Speech synthesis is not supported in this browser.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak); // Create a new speech synthesis utterance
    const voices = synth.getVoices();

    // Attempt to find a childlike voice
    const childVoice = voices.find((voice) =>
      voice.name.toLowerCase().includes('child')
    ) || voices[0]; // Use the first available voice if no childlike voice is found

    if (childVoice) {
      utterance.voice = childVoice;
    }

    utterance.pitch = 1.4; // Higher pitch for childlike effect
    utterance.rate = 1.2; // Slightly faster rate for clarity

    synth.speak(utterance); // Speak the text
  }, [textToSpeak]);

  // Function to start speech recognition
  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true; // Allow continuous speech input
    recognition.interimResults = true; // Provide interim results while speaking

    // Handle recognition results
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      onResult(transcript); // Pass the transcript to the callback
    };

    // Handle recognition end event
    recognition.onend = () => {
      setIsListening(false);
      onEnd(); // Trigger the callback when recognition ends
    };

    recognition.onerror = (event: any) => {
      setError(event.error || 'An error occurred during speech recognition.');
    };

    recognition.start(); // Start listening
    setIsListening(true);
  }, [onResult, onEnd]);

  return {
    isListening, // Whether the system is currently listening
    error, // Any error messages
    startListening, // Function to start speech recognition
    speakChildVoice, // Function to speak in a childlike voice
  };
}
