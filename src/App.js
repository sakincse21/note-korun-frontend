import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import NotePad from './components/NotePad/NotePad';
import { jwtDecode } from 'jwt-decode';


function App() {
  const [mail, setMail] = useState('');
  const [isToken, setIsToken]=useState(true);
  // const tokenMail = () =>{
    
  // }
  
  return (
    
     (mail && isToken) ?
      <>
        <NotePad mail={mail} setIsToken={setIsToken}></NotePad>
      </> 
      :
      <>
        <Login setMail={setMail} setIsToken={setIsToken}></Login>
      </>
  );
}

export default App;
