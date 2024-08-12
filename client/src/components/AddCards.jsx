import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const AddCards = () => {
    const navigate= useNavigate()
    const [newcard, setNewcard] = useState({
        question: "",
        answer: ""
    })

    const handleChange = e => {
        setNewcard(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    console.log(newcard)

    const handleAdd = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/allcards",newcard)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>AddCards
            <div className=' flex gap-4 flex-col' >
                <input type="text" placeholder='Question' onChange={handleChange} name='question' />
                <input type="text" placeholder='Answer' onChange={handleChange} name='answer' />
            </div>
            <button onClick={handleAdd} >Add</button>
        </div>
    )
}

export default AddCards