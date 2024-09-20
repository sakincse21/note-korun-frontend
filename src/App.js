import { useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import NotePad from './components/NotePad/NotePad';


function App() {
  const [mail, setMail] = useState('');
  
  return (
    
     (mail) ?
      <>
        <NotePad mail={mail}></NotePad>
      </> 
      :
      <>
        <Login setMail={setMail}></Login>
      </>
  );
}

export default App;
