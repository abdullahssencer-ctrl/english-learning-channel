// src/components/HighlightText.jsx
import React from 'react';
import useStore from '../store/useStore';

/**
 * HighlightText component renders given text and highlights the word currently
 * spoken by the VoiceReader. It uses the global store's `highlightedWordId`
 * to determine which word should receive the highlight style.
 */
export default function HighlightText({ text }) {
  const highlightedWordId = useStore((state) => state.highlightedWordId);

  // Split the text preserving whitespace and punctuation.
  const words = text.split(/(\s+|\b)/g).filter(Boolean);

  return (
    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
      {words.map((word, idx) => {
        const isHighlighted =
          highlightedWordId && word.trim().toLowerCase() === highlightedWordId.toLowerCase();
        const spanClass = isHighlighted ? 'bg-yellow-200 rounded py-0.5 px-1' : '';
        return (
          <span key={idx} className={spanClass} data-word={word}>
            {word}
          </span>
        );
      })}
    </p>
  );
}
