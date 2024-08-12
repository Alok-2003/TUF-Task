import { BrowserRouter, Routes, Route } from "react-router-dom"
import FlashcardApp from './components/Flashcard';
import './App.css'
function App() {

  return (
    <div className="flex flex-col items-center justify-center h-screen bgpattern">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FlashcardApp/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
