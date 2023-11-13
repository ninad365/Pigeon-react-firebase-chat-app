import React from "react";
import { auth } from '../App.js';

export default function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (
        <div className={`message ${messageClass}`}>
            <div className={`message-content ${messageClass}`}>
                <img alt="No img" src={photoURL || 'https://png.pngtree.com/png-vector/20210307/ourlarge/pngtree-simple-capsule-medicine-linear-icon-png-image_3015300.png'} />
                <p>{text}</p>
            </div>
        </div>
    );
}
