import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function VoiceReader({ text, language = 'en-US' }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    } else {
      setSpeechSupported(false);
    }
  }, []);

  const speak = () => {
    if (!speechSupported || !text) return;

    // Mevcut konuşmayı durdur
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.9; // Biraz daha yavaş okuma
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  if (!speechSupported) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {!isSpeaking ? (
        <button
          onClick={speak}
          className="flex items-center gap-2 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
          title="Sesli oku"
        >
          <Volume2 className="w-4 h-4" />
          <span className="text-sm font-medium">Oku</span>
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={pause}
            className="flex items-center gap-2 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
            title={isPaused ? 'Devam et' : 'Duraklat'}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            <span className="text-sm font-medium">{isPaused ? 'Devam' : 'Duraklat'}</span>
          </button>
          <button
            onClick={stop}
            className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            title="Durdur"
          >
            <VolumeX className="w-4 h-4" />
            <span className="text-sm font-medium">Durdur</span>
          </button>
        </div>
      )}
    </div>
  );
}