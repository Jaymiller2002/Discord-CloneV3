import React, { useEffect, useState } from 'react';
import { getFriends, addFriend, deleteFriendship } from './API';
// Work In Progress!!!!
const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const friendsData = await getFriends(token);
        setFriends(friendsData);
      }
    };
    fetchFriends();
  }, []);

  const handleAddFriend = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      await addFriend(token, newFriend);
      setNewFriend(''); // Clear input after adding friend
      const updatedFriends = await getFriends(token);
      setFriends(updatedFriends);
    }
  };

  const handleDeleteFriend = async (friendshipId) => {
    const token = localStorage.getItem('token');
    if (token) {
      await deleteFriendship(token, friendshipId);
      const updatedFriends = await getFriends(token);
      setFriends(updatedFriends);
    }
  };

  return (
    <div>
      <h1>Friends List</h1>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>
            {friend.username} 
            <button onClick={() => handleDeleteFriend(friend.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newFriend}
        onChange={e => setNewFriend(e.target.value)}
        placeholder="Add a friend by username"
      />
      <button onClick={handleAddFriend}>Add Friend</button>
    </div>
  );
};

export default FriendsList;


