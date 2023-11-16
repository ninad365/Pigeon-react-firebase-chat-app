import React, { useState, useEffect } from 'react';
import { db } from '../App.js';
import './UserList.css';
import { collection, getDocs } from 'firebase/firestore';

const UserList = ({ onUserClick }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userlist = [];
        querySnapshot.forEach((doc) => {
          var data = doc.data();
          userlist.push({ name: data.displayName, id: data.id });
        });
        setUsers(userlist);
      } catch (error) {
        console.error('Error fetching users from Firebase:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handleUserClick = (user) => {
    onUserClick(user);
  };

  return (
    <div className="user-list">
      <h2>Chats</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className={`user-item ${user.current ? 'current-user' : ''}`}>
            <div className="user-info" onClick={() => handleUserClick(user)}>
              <h3>{user.name}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
