import React, { useEffect, useState } from 'react';
import Editor from '../Editor/Editor';
import Notes from '../Notes/Notes';
import './NotePad.css';

const NotePad = ({ mail }) => {
    const [allNotes, setAllNotes] = useState([]);
    // console.log(mail);
    
    useEffect(()=>{
        fetch(`http://localhost:5000/notes/${mail}`)
        .then(res => res.json())
        .then(data => setAllNotes(data));
    }, [allNotes.length]);
    
    return (
        < div className='position-relative' >
            <p className='text-white text-end fs-5'>
                {mail.slice(0,9)}...
            </p>
            < div className="App p-5 d-flex flex-row flex-wrap justify-content-start" >
                {
                    allNotes.map(note => <Notes note={note} mail={mail} setAllNotes={setAllNotes}></Notes>)
                }
                {(allNotes.length===0)?
                <h3>Please add new note</h3>:<></>}
                <Editor mail={mail} setAllNotes={setAllNotes}></Editor>
            </div >
        </div >
    );
};

export default NotePad;