import React, { useEffect } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import GoogleButton from 'react-google-button';
import firebase from 'firebase/compat/app';
import { jwtDecode } from 'jwt-decode';



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

const Login = (props) => {
    const setMail = props.setMail;
    const setIsToken = props.setIsToken;
    useEffect(() => {
        const idToken = sessionStorage.getItem('idToken');
        if (idToken !== null) {
            const decodedToken = jwtDecode(idToken);
            const email = decodedToken.email;
            setMail(email);
        }
    }, []);
    const handleSign = async () => {
        const response = await signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                //console.log(result);
                // storeAuthToken();

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
        sessionStorage.setItem('idToken', response.user.accessToken);
        setIsToken(true);
        setMail(response.user.email);
        // console.log(response);

    }

    // const storeAuthToken = ()=>{
    //     firebase.auth().currentUser.getIdToken(true)
    //     .then(function(idToken) {
    //         console.log(idToken); 
    //       }).catch(function(error) {
    //         // console.log(error);
    //       });

    // }
    return (
        <div className='position-relative'>
            <GoogleButton onClick={() => { handleSign() }}></GoogleButton>
        </div>
    );
};

export default Login;