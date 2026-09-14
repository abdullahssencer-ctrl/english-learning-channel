// src/components/XPBar.jsx
import useStore from '../store/useStore';

export default function XPBar() {
  const xp = useStore(state => state.xp);
  const streak = useStore(state => state.streak);

  return (
    <div className="flex items-center space-x-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center space-x-1">
        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L0 6.91l6.562-1.004L10 0l3.438 5.906L20 6.91l-5.245 4.635 1.123 6.545z" />
        </svg>
        <span className="font-medium text-gray-800 dark:text-gray-200">XP: {xp}</span>
      </div>
      <div className="flex items-center space-x-1">
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l-2-2 1.41-1.42L9 9.17l4.59-4.58L15 6l-6 6z" />
        </svg>
        <span className="font-medium text-gray-800 dark:text-gray-200">Streak: {streak}</span>
      </div>
    </div>
  );
}
