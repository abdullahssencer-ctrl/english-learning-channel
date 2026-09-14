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
  const normalizedHighlight = highlightedWordId
    ? highlightedWordId.toLowerCase().replace(/^[^a-z0-9']+|[^a-z0-9']+$/gi, '')
    : null;

  // Metni bosluklara gore bol (bosluklari da koru), noktalama isaretleri kelimeyle
  // birlikte kalsin - karsilastirma sirasinda ayri ayri temizlenir.
  const words = text.split(/(\s+)/).filter((chunk) => chunk.length > 0);

  return (
    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
      {words.map((word, idx) => {
        const cleanWord = word.toLowerCase().replace(/^[^a-z0-9']+|[^a-z0-9']+$/gi, '');
        const isHighlighted = normalizedHighlight && cleanWord === normalizedHighlight;
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
