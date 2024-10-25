import React from 'react';
import Draggable from "react-draggable";
import './Notes.css';
import editicon from '../../assets/img/edit.png';
import delicon from '../../assets/img/delete.png';

const Notes = (props) => {
    const key=props.key;
    console.log(key);
    
    const note = props.note;
    // const mail = props.mail;
    const setIsToken=props.setIsToken;
    const setAllNotes = props.setAllNotes;
    const handleEdit = () =>{
        const noteText=document.getElementById(key);
        noteText.innerHTML=`<textarea id='editedNote' value={${note}}>`;
    }
    const handleDelete = () => {
        fetch('https://note-korun-backend.onrender.com/delete', {
            method: "DELETE",
            body: JSON.stringify({ _id: `${note._id}` }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('idToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log('deleted...');

                }
                fetch(/*`https://note-korun-backend.onrender.com/notes/${mail}`*/ "https://note-korun-backend.onrender.com/notes/" ,{
                    method: "GET",
                    headers:{
                        authorization: `Bearer ${localStorage.getItem('idToken')}`,
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data===false){
                            setIsToken(false);
                            setAllNotes([]);
                        }else{
                            setIsToken(true);
                            setAllNotes(data);
                        }
                    });
            })
    }
    return (
        <Draggable bounds="parent">
            <div className='myNote'>
                <div className="time d-flex flex-row justify-content-between">
                    <p className='px-1'>{note.date}</p>
                    <p className='px-1'>{note.time}</p>
                </div>
                <div className="note-text" id={key}>
                    {note.note}
                </div>
                <div className="note-modify">
                    <img src={editicon} alt="edit" onClick={handleEdit} />
                    <img src={delicon} alt="delete" onClick={handleDelete} />
                </div>
            </div>
        </Draggable>
    );
};

export default Notes;