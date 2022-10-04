import React from "react";
import { auth } from '../App.js'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignIn() {

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    return (
        <>
            <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
        </>
    )

}