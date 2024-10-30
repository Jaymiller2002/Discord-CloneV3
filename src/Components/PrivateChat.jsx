import React, { useState } from 'react';
import { sendPrivateMessage } from './API';
// Work In Progress!!!!
const PrivateChat = () => {
  const [message, setMessage] = useState({ id: '', content: '' }); // Message object with id and content
  const [searchId, setSearchId] = useState('');                    // Temporary ID input for searching

  const handleSendMessage = async () => {
    const token = localStorage.getItem('token');
    if (token && message.id) {
      await sendPrivateMessage(token, message.id, message.content);
      setMessage({ ...message, content: '' }); // Clear the content but keep the id
    }
  };

  const handleSearch = () => {
    setMessage({ ...message, id: searchId });  // Set the message's id to the searched user ID
    setSearchId('');                           // Clear the search input
  };

  return (
    <div>
      <h1>Private Messages</h1>
      
      {/* Search Input to set the message id */}
      <input
        type="text"
        value={searchId}
        onChange={e => setSearchId(e.target.value)}
        placeholder="Enter user ID to chat with"
      />
      <button onClick={handleSearch}>Start Chat</button>
      
      {/* Display the chat interface only if message.id is set */}
      {message.id && (
        <>
          <h2>Chatting with User ID: {message.id}</h2>
          <input
            type="text"
            value={message.content}
            onChange={e => setMessage({ ...message, content: e.target.value })}
            placeholder="Type a message"
          />
          <button onClick={handleSendMessage}>Send</button>
        </>
      )}
    </div>
  );
};

export default PrivateChat;




