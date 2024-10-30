import React, { useEffect, useState } from 'react';
import { getProfile } from './API';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const profileData = await getProfile(token);
        setProfile(profileData);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {profile ? (
        <div>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
