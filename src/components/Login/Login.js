import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import GoogleButton from 'react-google-button';




const firebaseConfig = {

    apiKey: `${process.env.REACT_APP_apiKey}`,

    authDomain: `${process.env.REACT_APP_authDomain}`,

    projectId: `${process.env.REACT_APP_projectId}`,

    storageBucket: `${process.env.REACT_APP_storageBucket}`,

    messagingSenderId: `${process.env.REACT_APP_messagingSenderId}`,

    appId: `${process.env.REACT_APP_appId}`

};


const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

const Login = ({ setMail }) => {
    const handleSign = async () => {
        const response = await signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                console.log(result);
                return result;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
        setMail(response.user.email);
        console.log(response);

    }
    return (
        <div className='position-relative'>
            <GoogleButton onClick={() => { handleSign() }}></GoogleButton>
        </div>
    );
};

export default Login;