import { useState } from 'react';

function Flashcard({ flashcard }) {
  const [flipped, setFlipped] = useState(false);

  const gradients = [
    'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
    'bg-gradient-to-r from-green-400 to-blue-500',
    'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500',
    'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
    'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600',
  ];

  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <div
      className={`w-96 h-64 mx-auto shadow-lg rounded-lg overflow-hidden transform-style preserve-3d perspective-1000 ${randomGradient} cursor-pointer`}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`w-full h-full flex items-center justify-center transition-transform transform duration-500 ${flipped ? 'rotate-y-180' : ''}`}
      >
        <h2 className="text-2xl font-semibold text-white text-center px-4">
          {flipped ? `Answer: ${flashcard.answer}` : `Question: ${flashcard.question}`}
        </h2>
      </div>
    </div>
  );
}

export default Flashcard;
