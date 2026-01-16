import React from 'react'
import "../style/Note.css"

function Notes({ note, onDelete }) {
    // Django modelda field nomi 'created', shuni ishlatamiz
    const formattedDate = note.created 
        ? new Date(note.created).toLocaleDateString("en-US") 
        : "No date";

    return (
        <div className="note-container">
            <p className='note-title'>{note.title}</p>
            <p className='note-content'>{note.content}</p>
            <p>{formattedDate}</p>
            <button className='delete-button' onClick={() => onDelete(note.id)}>Delete</button>
        </div>
    )
}

export default Notes
