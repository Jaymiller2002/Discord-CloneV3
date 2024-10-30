import React, { useEffect, useState } from 'react';
import { getServers, getChannels, getMessagesForChannel, sendMessageToChannel } from './API';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import './App.css';

const App = () => {
  const [servers, setServers] = useState([]);
  const [channels, setChannels] = useState({});
  const [visibleChannels, setVisibleChannels] = useState({});
  const [currentChannel, setCurrentChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServers = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const serverData = await getServers(token);
        setServers(serverData);
        await Promise.all(serverData.map(async server => {
          const channelData = await getChannels(server.id, token);
          setChannels(prev => ({ ...prev, [server.id]: channelData }));
        }));
      }
    };
    fetchServers();
  }, []);

  const handleNavigateToProfile = () => navigate('/about');

  const handleServerClick = (serverId) => {
    setVisibleChannels(prev => ({ ...prev, [serverId]: !prev[serverId] }));
  };

  const handleChannelClick = async (channelId) => {
    setCurrentChannel(channelId);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const messagesData = await getMessagesForChannel(channelId, token);
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  const handleBackToServers = () => {
    setCurrentChannel(null);
    setMessages([]);
  };

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!newMessage) return;

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const messageData = await sendMessageToChannel(currentChannel, { content: newMessage }, token);
        setMessages(prevMessages => [...prevMessages, messageData]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="app-container">
      <div className="top-buttons">
        <Logout className="logout-button" />
        <button className="profile-button" onClick={handleNavigateToProfile}>Go to Profile</button>
      </div>

      <div className="center-content">
        <h1 className="servers-title">
          <i className="fas fa-server"></i> Servers
        </h1>
        <ul className="servers-list">
          {servers.map(server => (
            <ServerItem
              key={server.id}
              server={server}
              handleServerClick={handleServerClick}
              visibleChannels={visibleChannels}
              channels={channels}
              handleChannelClick={handleChannelClick}
            />
          ))}
        </ul>
      </div>

      {currentChannel !== null && (
        <ChatContainer
          currentChannel={currentChannel}
          messages={messages}
          handleBackToServers={handleBackToServers}
          handleSendMessage={handleSendMessage}
          newMessage={newMessage}
          handleMessageChange={handleMessageChange}
        />
      )}
    </div>
  );
};

const ServerItem = ({ server, handleServerClick, visibleChannels, channels, handleChannelClick }) => (
  <li className="server-item">
    <button onClick={() => handleServerClick(server.id)} className="server-name">
      {server.name}
    </button>
    {visibleChannels[server.id] && (
      <ul className="channels-list">
        {channels[server.id]?.map(channel => (
          <li key={channel.id} className="channel-item">
            <button onClick={() => handleChannelClick(channel.id)} className="channel-name">
              {channel.name}
            </button>
          </li>
        ))}
      </ul>
    )}
  </li>
);

const ChatContainer = ({ currentChannel, messages, handleBackToServers, handleSendMessage, newMessage, handleMessageChange }) => (
  <div className="chat-container">
    <button className="back-button" onClick={handleBackToServers}>Back to Servers</button>
    <h2 className="chat-title">Chat for Channel {currentChannel}</h2>
    <ul className="messages-list">
      {messages.map(message => (
        <li key={message.id} className="message-item">
          <p>{message.content}</p>
          <span>Sent by: {message.user.username}</span>
        </li>
      ))}
    </ul>
    <form onSubmit={handleSendMessage} className="message-form">
      <input
        type="text"
        value={newMessage}
        onChange={handleMessageChange}
        placeholder="Type your message here..."
        className="message-input"
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  </div>
);

export default App;






