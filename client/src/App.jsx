import { useState } from 'react';
import Flashcard from './components/Flashcard';

const flashcards = [
  { question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
  { question: 'What is Vite?', answer: 'A fast build tool for modern web development.' },
  // Add more flashcards here...
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      <Flashcard flashcard={flashcards[currentIndex]} />
      <div className=" w-96 flex justify-between mt-4">
        <button onClick={handlePrev} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
          Previous
        </button>
        <button onClick={handleNext} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
