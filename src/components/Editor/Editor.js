import React, { useState } from 'react';
import './Editor.css';
import plus from '../../assets/img/plus.png';

const Editor = (props) => {
    const mail = props.mail;
    const setAllNotes = props.setAllNotes;
    const [localNote, setLocalNote] = useState("");
    // console.log(localNote);
    const [editorOn, setEditorOn] = useState(false);

    function getCurrentDateAndTime() {
        const now = new Date();

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const date = `${now.getDate()}${months[now.getMonth()]},${now.getFullYear()}`;
        const time = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

        return { date, time };
    }

    const handlePlus = () => {
        setEditorOn(!editorOn);
    }

    const handleCancel = () => {
        setEditorOn(false);
    }

    const handleClick = () => {
        if (localNote !== "") {
            const { date, time } = getCurrentDateAndTime();
            const noteup = {
                note: localNote,
                mail: `${mail}`,
                date: `${date}`,
                time: `${time}`
            };
            fetch('https://note-korun-backend.vercel.app/submit', {
                method: "POST",
                body: JSON.stringify(noteup),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        fetch(`https://note-korun-backend.vercel.app/notes/${mail}`)
                            .then(res => res.json())
                            .then(data => setAllNotes(data));
                    }
                    const txtarea = document.getElementById("localNote");
                    txtarea.value = "";
                    setEditorOn(!editorOn);
                })
        } else {
            alert("add some text please");
        }
    }
    return (
        <div className='editor position-absolute'>
            {
                editorOn ?
                    <>
                        <textarea name="note" id="localNote" onBlur={(e) => { setLocalNote(e.target.value); e.preventDefault(); }}></textarea> <br />
                        <div className='d-flex flex-row justify-content-around pt-3'>
                            <button className='btn btn-primary fw-bold' onClick={handleClick}>Add Note</button>
                            <button className='btn btn-danger fw-bold' onClick={handleCancel}>Cancel</button>
                        </div>
                    </> :
                    <img src={plus} alt="plus" className='plusicon' onClick={handlePlus} />
            }

        </div>
    );
};

export default Editor;