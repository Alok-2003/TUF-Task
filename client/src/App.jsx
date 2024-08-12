import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import FlashcardApp from './components/Flashcard';
const flashcards = [
  { question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
  { question: 'What is Vite?', answer: 'A fast build tool for modern web development.' },
  // Add more flashcards here...
];

function App() {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FlashcardApp/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
