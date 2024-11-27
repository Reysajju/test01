export function setupVoice(): SpeechSynthesisVoice | null {
  if (!window.speechSynthesis) return null;

  // Get all available voices
  const voices = window.speechSynthesis.getVoices();
  
  // Try to find Microsoft Ravi (Indian English) or any Microsoft Indian English voice
  let selectedVoice = voices.find(voice => 
    voice.name.includes('Microsoft Ravi') || 
    (voice.name.includes('Microsoft') && 
     voice.name.includes('Indian') && 
     voice.name.includes('English'))
  );

  // Fallback to any Microsoft English voice if Indian voice not found
  if (!selectedVoice) {
    selectedVoice = voices.find(voice => 
      voice.name.includes('Microsoft') && 
      voice.lang.startsWith('en')
    );
  }

  return selectedVoice || null;
}

export function speakWord(word: string, onEnd?: () => void) {
  if (!window.speechSynthesis) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(word);
  const selectedVoice = setupVoice();

  if (selectedVoice) {
    utterance.voice = selectedVoice;
    utterance.rate = 0.9; // Slightly slower for better clarity
    utterance.pitch = 1.2; // Slightly higher pitch for a younger voice
  }

  if (onEnd) {
    utterance.onend = onEnd;
  }

  // Wait a bit for voices to load if needed
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      const voice = setupVoice();
      if (voice) utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    }, { once: true });
  } else {
    window.speechSynthesis.speak(utterance);
  }
}