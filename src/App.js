import React from 'react';
import './App.css';
import SignOut from './components/SignOut.js'
import SignIn from './components/SignIn.js'
import ChatRoom from './components/ChatRoom';

import { initializeApp } from 'firebase/app';

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA6NRTmfq9_66VXxDSp0CB-zJgRIjkwk5w",
  authDomain: "pigeon-d9efd.firebaseapp.com",
  projectId: "pigeon-d9efd",
  storageBucket: "pigeon-d9efd.appspot.com",
  messagingSenderId: "394701830753",
  appId: "1:394701830753:web:8c44230b8875209d840820"
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

function App() {

  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Pigeon</h1>
        <SignOut auth={auth} />
      </header>

      <section className="App-section">
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

export default App;
