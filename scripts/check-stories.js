import { stories as storiesData } from '../src/data/stories.js';

console.log('TOPLAM HIKAYE SAYISI:', storiesData.length);
console.log('\n=== HIKAYE LISTESI ===');

storiesData.forEach(s => {
  const engLength = s.englishText ? s.englishText.length : 0;
  const turLength = s.turkishText ? s.turkishText.length : 0;
  const status = (engLength > 10 && turLength > 10) ? '✅ DOLU' : '❌ BOŞ';
  console.log(`ID: ${s.id} | Level: ${s.level} | Seviye: ${s.difficulty} | Başlık: ${s.title} | Durum: ${status} | İngilizce: ${engLength} chars | Türkçe: ${turLength} chars`);
});

const emptyStories = storiesData.filter(s => !s.englishText || s.englishText.length < 10 || !s.turkishText || s.turkishText.length < 10);

console.log('\n=== BOŞ HIKAYELER ===');
if (emptyStories.length > 0) {
  console.log('BOŞ HIKAYE SAYISI:', emptyStories.length);
  emptyStories.forEach(s => console.log(`ID: ${s.id} | Başlık: ${s.title}`));
} else {
  console.log('BOŞ HIKAYE YOK!');
}