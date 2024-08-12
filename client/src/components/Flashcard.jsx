import React, { useState, useEffect, useRef } from 'react';
import ReactFlipCard from 'reactjs-flip-card';
import axios from 'axios';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import '../App.css'
import toast, { Toaster } from 'react-hot-toast';


function FlashcardApp() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [newcard, setNewcard] = useState({ question: "", answer: "" });
  const [card, setCard] = useState({ question: "", answer: "" });
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        // const response = await axios.get('http://localhost:8800/allcards');
        const response = await axios.get('https://tuf-task-api.vercel.app/allcards');
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://tuf-task-api.vercel.app/allcards/${id}`);
      setFlashcards((prevFlashcards) =>
        prevFlashcards.filter((card) => card.id !== id)
      );
      setCurrentIndex((prevIndex) => Math.min(prevIndex, flashcards.length - 2));
      toast.success('Card deleted successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete card.');
    }
  };

  const handleChange = (e) => {
    setCard(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const open = (isUpdate = false) => {
    if (isUpdate) {
      setCard({
        question: flashcards[currentIndex]?.question || "",
        answer: flashcards[currentIndex]?.answer || "",
      });
      setIsUpdateMode(true);
    } else {
      setCard({ question: "", answer: "" });
      setIsUpdateMode(false);
    }
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://tuf-task-api.vercel.app/allcards", card);
      setIsOpen(false);
      setFlashcards([...flashcards, card]);
      toast.success('Card added successfully!');
    } catch (error) {
      toast.error('Failed to add card');
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://tuf-task-api.vercel.app/allcards/${flashcards[currentIndex].id}`, card);
      setFlashcards(prevFlashcards =>
        prevFlashcards.map((c, index) =>
          index === currentIndex ? { ...c, ...card } : c
        )
      );
      setIsOpen(false);
      toast.success('Card updated successfully!');
    } catch (err) {
      toast.error('Failed to update card');
      console.log(err);
    }
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
  };

  console.log(flashcards)
  return (
    <>
      <Toaster position="top-center" />
      <div style={styles.container}>
        {flashcards.length > 0 ? (
          <div>
            <div className="flex justify-end mb-4 ">
              <Button>
                <Trash2 className="hover:bg-red-400 rounded-full p-2 transition ease-in-out duration-500" size={45} onClick={() => handleDelete(flashcards[currentIndex]?.id)} />
              </Button>
            </div>
            <div className='flex flex-row items-center mb-4'>
              <Button>
                <ChevronLeft
                  size={45}
                  className="hover:bg-slate-400 rounded-full pr-1 mr-2 transition ease-in-out duration-500"
                  onClick={handlePrevious}
                />
              </Button>

              <ReactFlipCard
                containerStyle={{ height: '300px', width: '400px' }}
                style={{ height: '500px', width: '500px' }}
                frontStyle={{ ...styles.card, background: 'black' }}
                backStyle={{ ...styles.card, background: 'green' }}
                frontComponent={<div>Question: {flashcards[currentIndex]?.question}</div>}
                backComponent={<div>Answer: {flashcards[currentIndex]?.answer}</div>}
                direction="horizontal"
              />
              <Button>
                <ChevronRight
                  className="hover:bg-slate-400 rounded-full pl-1 ml-2 transition ease-in-out duration-500"
                  size={45}
                  onClick={handleNext} />
              </Button>
            </div>

            <h1 className='text-center text-xl mb-4' >Hover on card to flip</h1>

            <div className='w-full flex justify-between px-10' >
              <Button
                onClick={() => open(true)}
                className="rounded-md bg-black/60 py-3 px-4 text-md font-medium transition ease-in-out duration-500 text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Update Card
              </Button>
              <Button
                onClick={() => open(false)}
                className="rounded-md bg-black/60 py-3 px-4 text-md font-medium transition ease-in-out duration-500 text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Add Card
              </Button>
              <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                      transition
                      className="w-80 max-w-md rounded-xl bg-white/25 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                      <DialogTitle as="h3" className="text-xl mb-4 font-medium text-white">
                        {isUpdateMode ? 'Update Card' : 'Add Card'}
                      </DialogTitle>
                      <div className=' flex gap-4 flex-col' >
                        <input
                          type="text"
                          className='px-4 py-2 rounded-xl'
                          placeholder='Front text'
                          value={card.question}
                          onChange={handleChange}
                          name='question'
                        />
                        <input
                          type="text"
                          className='px-4 py-2 rounded-xl'
                          placeholder='Back text'
                          value={card.answer}
                          onChange={handleChange}
                          name='answer'
                        />
                      </div>
                      <div className="mt-4">
                        <Button
                          className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                          onClick={isUpdateMode ? handleUpdate : handleAdd}
                        >
                          {isUpdateMode ? 'Update Card' : 'Add Card'}
                        </Button>
                      </div>
                    </DialogPanel>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center gap-4' >
            <div className='font-bold text-3xl'>No cards available</div>
            <Button
              onClick={() => open(false)}
              className="w-24 rounded-md bg-black/60 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Add Card
            </Button>

            {/* Add Dialog Modal */}
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <DialogPanel
                    transition
                    className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                  >
                    <DialogTitle as="h3" className="text-xl mb-4 font-medium text-white">
                      Add Card
                    </DialogTitle>
                    <div className=' flex gap-4 flex-col' >
                      <input
                        type="text"
                        className='px-4 py-2 rounded-xl'
                        placeholder='Front text'
                        value={card.question}
                        onChange={handleChange}
                        name='question'
                      />
                      <input
                        type="text"
                        className='px-4 py-2 rounded-xl'
                        placeholder='Back text'
                        value={card.answer}
                        onChange={handleChange}
                        name='answer'
                      />
                    </div>
                    <div className="mt-4">
                      <Button
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                        onClick={handleAdd}
                      >
                        Add Card
                      </Button>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
          </div>
        )}
      </div>
    </>

  );
}

export default FlashcardApp;
