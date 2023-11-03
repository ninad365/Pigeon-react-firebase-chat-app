import React from 'react';

const sampleUsers = [
    { id: 1, name: 'Global', current: true },
  { id: 2, name: 'User' },
  { id: 3, name: 'User2' },
];

const UserList = () => (
  <div className="user-list">
    <h2>Chats</h2>
    <ul>
      {sampleUsers.map((user) => (
        <li key={user.id} className={`user-item ${user.current ? 'current-user' : ''}`}>
          <div className="user-info">
            <h3>{user.name}</h3>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default UserList;
