import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UpdateCards = () => {
  const [card, setCard] = useState({
    question: "",
    answer: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const cardId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setCard((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/allcards/${cardId}`, card);
    //   navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the card</h1>
      <input
        type="text"
        placeholder="Book title"
        name="question"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book content"
        name="answer"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <br />
      <Link to="/">See all books</Link>
    </div>
  );
};

export default UpdateCards;
