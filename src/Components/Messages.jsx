import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getPrivateMessages, deletePrivateMessage } from './API';
// Work In Progress!!!!
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const messagesData = await getPrivateMessages(token);
        setMessages(messagesData);
      }
    };
    fetchMessages();
  }, []);

  const handleDeleteMessage = async (messageId) => {
    const token = localStorage.getItem('token');
    if (token) {
      await deletePrivateMessage(token, messageId);
      const updatedMessages = await getPrivateMessages(token);
      setMessages(updatedMessages);
    }
  };

  const handleBackToApp = () => {
    navigate('/app'); // Navigate back to the main App
  };

  const handleBackToProfile = () => {
    navigate('/about'); // Navigate back to the profile/About page
  };

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map(message => (
          <li key={message.id}>
            {message.content} 
            <button onClick={() => handleDeleteMessage(message.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleBackToApp}>Back to Home</button> {/* Button to navigate to App */}
      <button onClick={handleBackToProfile}>Back to Profile</button> {/* Button to navigate to Profile */}
    </div>
  );
};

export default Messages;


