import React, { useState, useEffect, useRef } from 'react';
import ReactFlipCard from 'reactjs-flip-card';
import axios from 'axios';

function FlashcardApp() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flipCardRef = useRef(null); // Reference to the flip card component

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('http://localhost:8800/allcards');
        setFlashcards(response.data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };
    fetchFlashcards();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + flashcards.length) % flashcards.length
    );
    
  };

  

  const styles = {
    card: {
      width: '400px',
      height: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '20px',
      padding: '20px',
      color: 'white',
      fontSize: '1.5rem',
      backfaceVisibility: 'hidden',
    },
    container: {
      width: '500px',
      height: '400px',
      margin: '50px auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      perspective: '1000px', // Perspective for 3D effect
    },
    button: {
      margin: '10px',
      padding: '10px 20px',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#007bff',
      color: 'white',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      {flashcards.length > 0 && (
        <div  >
          <ReactFlipCard
            ref={flipCardRef}
            containerStyle={{ height: '300px', width: '400px' }}
            style={{ height: '500px', width: '500px' }}
            frontStyle={{ ...styles.card, background: 'black' }}
            backStyle={{ ...styles.card, background: 'green' }}
            frontComponent={<div>Question: {flashcards[currentIndex].question}</div>}
            backComponent={<div>Answer: {flashcards[currentIndex].answer}</div>}
            direction="horizontal"
          />
          <div className='flex justify-between' >
            <button style={styles.button} onClick={handlePrevious}>Previous</button>
            <button style={styles.button} onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashcardApp;
