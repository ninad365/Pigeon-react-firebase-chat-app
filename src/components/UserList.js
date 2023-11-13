// UserList.js
import React from 'react';
import './UserList.css';

const sampleUsers = [
  { id: 1, name: 'Global', current: true },
];

const UserList = ({ onUserClick }) => {
  const handleUserClick = (user) => {
    // Handle user click, update current user, etc.
    onUserClick(user);
  };

  return (
    <div className="user-list">
      <h2>Chats</h2>
      <ul>
        {sampleUsers.map((user) => (
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
