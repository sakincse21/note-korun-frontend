import React, { useEffect, useState } from 'react';
import Editor from '../Editor/Editor';
import Notes from '../Notes/Notes';
import './NotePad.css';

const NotePad = (props) => {
    const mail=props.mail;
    const setIsToken=props.setIsToken;
    const [allNotes, setAllNotes] = useState([]);
    // console.log(mail);
    

    useEffect(() => {
        if(sessionStorage.getItem('idToken')!==null){
            fetch(/*`http://note-korun-backend.vercel.app/notes/${mail}`*/ "http://note-korun-backend.vercel.app/notes/" ,{
                method: "GET",
                headers:{
                    authorization: `Bearer ${sessionStorage.getItem('idToken')}`,
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
        }else{
            setIsToken(false);
        }

    }, [allNotes.length]);

    return (
        < div className='position-relative' >
            <p className='text-white text-end fs-5'>
                {mail.slice(0, 9)}...
            </p>
            < div className="App p-5 d-flex flex-row flex-wrap justify-content-start" >
                {
                    allNotes.map(note => <Notes note={note} mail={mail} setAllNotes={setAllNotes} setIsToken={setIsToken}></Notes>)
                }
                {(allNotes.length === 0) ?
                    <h3>Please add new note</h3> : <></>}
                <Editor mail={mail} setAllNotes={setAllNotes} setIsToken={setIsToken}></Editor>
            </div >
        </div >
    );
};

export default NotePad;