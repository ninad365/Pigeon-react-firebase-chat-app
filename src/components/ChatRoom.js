import React, { useRef, useState, useEffect } from "react";
import { collection, addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, db } from '../App.js';
import ChatMessage from './ChatMessage';
import UserList from './UserList';

export default function ChatRoom() {
  const dummy = useRef();
  const postConverter = {
    toFirestore(post) {
      return { text: post.text, uid: post.uid, photoURL: post.photoURL, createdAt: post.createdAt };
    },
    fromFirestore(
      snapshot,
      options
    ) {
      const data = snapshot.data(options);
      return {
        text: data.text,
        id: snapshot.id,
        ref: snapshot.ref,
        uid: data.uid,
        photoURL: data.photoURL,
      };
    },
  };

  const messagesRef = collection(db, 'messages').withConverter(postConverter);
  const q = query(collection(db, 'messages'), orderBy('createdAt'));
  const [messages] = useCollectionData(q, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  useEffect(() => {
    // Scroll to the bottom when messages update
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    });
    setFormValue('');
  }

  return (
    <div className="chatroom">
      <div className="user-list-section">
        <UserList /> {/* Display the UserList component in the left section */}
      </div>
      <div className="chat-messages-section">
        <main>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
          <span ref={dummy}></span>
        </main>
        <form onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
          <button type="submit" disabled={!formValue}>➡️</button>
        </form>
      </div>
    </div>
  );
}
