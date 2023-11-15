import React from "react";
import { auth, db } from '../App.js'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';

export default function SignIn() {

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then(async (result) => {
            await setDoc(doc(db, "users", result.user.uid), {
                email: result.user.email, 
                photoUrl: result.user.photoURL,
                displayName: result.user.displayName
            });
          });
    }

    return (
        <div className="sign-in-container">
            <button className="sign-in-button" onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )

}