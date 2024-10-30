import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getProfile, getFriends, getPrivateMessages, addFriend, deleteFriendship } from './API';
import './About.css';

const API_URL = 'http://localhost:8000'; // Adjust if necessary

const About = () => {
  const [profile, setProfile] = useState(null);
  const [friends, setFriends] = useState([]); // Array to hold friends' IDs
  const [messages, setMessages] = useState([]);
  const [newFriendUsername, setNewFriendUsername] = useState(''); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const profileData = await getProfile(token);
          console.log('Profile Data:', profileData); // Log profile data
          setProfile(profileData);
    
          const friendsData = await getFriends(token);
          console.log('Friends Data:', friendsData); // Log friends data

          // Map friendsData to include username and ID for rendering
          setFriends(friendsData.map(friend => ({ id: friend.id, username: friend.username })));
          
          const messagesData = await getPrivateMessages(token);
          console.log('Messages Data:', messagesData); // Log messages data
          setMessages(messagesData);
        } catch (error) {
          console.error('Error fetching data:', error); // Handle errors
        }
      }
    };
    fetchData();
  }, []);

  const handleNavigateToApp = () => {
    navigate('/app'); 
  };

  const handleAddFriend = async () => {
    const token = localStorage.getItem('token');
    if (token && newFriendUsername) {
      try {
        await addFriend(token, newFriendUsername);
        setFriends(prev => [...prev, { username: newFriendUsername }]); // Update friends with new friend added
        console.log('Added Friend:', newFriendUsername); 
        setNewFriendUsername(''); 
      } catch (error) {
        console.error('Error adding friend:', error);
      }
    }
  };

  const handleRemoveFriend = async (friendId) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await deleteFriendship(token, friendId);
        setFriends(prev => prev.filter(friend => friend.id !== friendId)); // Remove friend from state
        console.log('Removed Friend ID:', friendId); 
      } catch (error) {
        console.error('Error removing friend:', error);
      }
    }
  };

  return (
    <div className="about-container">
      <h1 className="profile-title">Profile</h1>
      {profile ? (
        <div className="profile-info">
          <h2>{profile.first_name} {profile.last_name}</h2>
          <p><strong>Bio:</strong> {profile.bio}</p>
          {profile.image && (
            <img 
              src={`${API_URL}${profile.image}`} 
              alt="Profile" 
              className="profile-image" 
            />
          )}
          <div><strong>Username:</strong> {profile.user.username}</div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <h2 className="friends-title">Friends</h2>
      <ul className="friends-list">
        {friends.map(friend => (
          <li key={friend.id} className="friend-item">
            {friend.pk}
            <button onClick={() => handleRemoveFriend(friend.id)} className="remove-friend-button">Remove</button>
          </li>
        ))}
      </ul>

      <h3 className="add-friend-title">Add Friend</h3>
      <div className="add-friend-container">
        <input 
          type="text" 
          value={newFriendUsername} 
          onChange={(e) => setNewFriendUsername(e.target.value)} 
          placeholder="Enter friend's username" 
          className="friend-input"
        />
        <button onClick={handleAddFriend} className="add-friend-button">Add Friend</button>
      </div>

      <h2 className="messages-title">Private Messages</h2>
      <ul className="messages-list">
        {messages.map(message => (
          <li key={message.id} className="message-item">{message.content}</li>
        ))}
      </ul>

      <button onClick={handleNavigateToApp} className="back-button">Back to Home</button>
    </div>
  );
};

export default About;






