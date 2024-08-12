import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactFlipCard from 'reactjs-flip-card';

const FlashcardApp = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [card, setCard] = useState({ question: "", answer: "" });
  const [error, setError] = useState(false);
  const [editingCardId, setEditingCardId] = useState(null);
  const [viewMode, setViewMode] = useState('view'); // 'view', 'add', 'update'
  const flipCardRef = useRef(null);

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
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/allcards/${id}`);
      setFlashcards((prevFlashcards) =>
        prevFlashcards.filter((card) => card.id !== id)
      );
      setCurrentIndex((prevIndex) => Math.min(prevIndex, flashcards.length - 2));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddChange = (e) => {
    setNewCard((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/allcards", newCard);
      setNewCard({ question: "", answer: "" });
      setViewMode('view');
      const response = await axios.get('http://localhost:8800/allcards');
      setFlashcards(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardChange = (e) => {
    setCard((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/allcards/${editingCardId}`, card);
      setViewMode('view');
      const response = await axios.get('http://localhost:8800/allcards');
      setFlashcards(response.data);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleEditClick = (id) => {
    const cardToEdit = flashcards.find(card => card.id === id);
    setCard({ question: cardToEdit.question, answer: cardToEdit.answer });
    setEditingCardId(id);
    setViewMode('update');
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
      perspective: '1000px',
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
    form: {
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    section: {
      margin: '20px 0',
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      {viewMode === 'view' && (
        <div style={styles.section}>
          <h1>Flashcards</h1>
          {flashcards.length > 0 && (
            <div style={styles.container}>
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
              <div className='flex justify-between'>
                <h2>{flashcards[currentIndex].id}</h2>
                <button style={styles.button} onClick={handlePrevious}>Previous</button>
                <button style={styles.button} onClick={handleNext}>Next</button>
              </div>
              <button
                style={styles.button}
                onClick={() => handleDelete(flashcards[currentIndex].id)}
              >
                Delete
              </button>
              <button
                style={styles.button}
                onClick={() => handleEditClick(flashcards[currentIndex].id)}
              >
                Update
              </button>
              <button
                style={styles.button}
                onClick={() => setViewMode('add')}
              >
                Add New Card
              </button>
            </div>
          )}
        </div>
      )}

      {viewMode === 'add' && (
        <div style={styles.section}>
          <h1>Add a New Card</h1>
          <div style={styles.form}>
            <input
              type="text"
              placeholder="Question"
              name="question"
              value={newCard.question}
              onChange={handleAddChange}
            />
            <input
              type="text"
              placeholder="Answer"
              name="answer"
              value={newCard.answer}
              onChange={handleAddChange}
            />
            <button style={styles.button} onClick={handleAdd}>Add</button>
            <button
              style={styles.button}
              onClick={() => setViewMode('view')}
            >
              Back to Flashcards
            </button>
          </div>
        </div>
      )}

      {viewMode === 'update' && (
        <div style={styles.section}>
          <h1>Update the Card</h1>
          <div style={styles.form}>
            <input
              type="text"
              placeholder="Question"
              name="question"
              value={card.question}
              onChange={handleCardChange}
            />
            <input
              type="text"
              placeholder="Answer"
              name="answer"
              value={card.answer}
              onChange={handleCardChange}
            />
            <button style={styles.button} onClick={handleUpdate}>Update</button>
            {error && "Something went wrong!"}
            <button
              style={styles.button}
              onClick={() => setViewMode('view')}
            >
              Back to Flashcards
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardApp;
