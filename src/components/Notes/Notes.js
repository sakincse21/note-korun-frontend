import React from 'react';
import Draggable from "react-draggable";
import './Notes.css';
import editicon from '../../assets/img/edit.png';
import delicon from '../../assets/img/delete.png';

const Notes = (props) => {
    const note = props.note;
    const mail = props.mail;
    const setAllNotes = props.setAllNotes;
    const handleDelete = () => {
        fetch('https://note-korun-backend.vercel.app/delete', {
            method: "DELETE",
            body: JSON.stringify({ _id: `${note._id}` }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log('deleted...');

                }
                fetch(`https://note-korun-backend.vercel.app/notes/${mail}`)
                    .then(res => res.json())
                    .then(data => setAllNotes(data));
            })
    }
    return (
        <Draggable bounds="parent">
            <div className='myNote'>
                <div className="time d-flex flex-row justify-content-between">
                    <p className='px-1'>{note.date}</p>
                    <p className='px-1'>{note.time}</p>
                </div>
                <div className="note-text">
                    {note.note}
                </div>
                <div className="note-modify">
                    <img src={editicon} alt="edit" />
                    <img src={delicon} alt="delete" onClick={handleDelete} />
                </div>
            </div>
        </Draggable>
    );
};

export default Notes;