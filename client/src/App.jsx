import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import FlashcardApp from './components/Flashcard';
import AddCards from './components/AddCards';
import UpdateCards from './components/UpdateCards';
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
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FlashcardApp/>} />
          <Route path='/add' element={<AddCards/>} />
          <Route path='/update/:id' element={<UpdateCards/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
