import React, { useState } from "react";
import { createUser } from "./API"; // Assume this API exists
import { useNavigate, Navigate } from "react-router-dom"; // Import useNavigate and Navigate
import './Signup.css'; // Import CSS

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); // State for first name
  const [lastName, setLastName] = useState(""); // State for last name
  const [bio, setBio] = useState(""); // Optional bio
  const [image, setImage] = useState(null); // State for image file
  const [redirectToLogin, setRedirectToLogin] = useState(false); // State for redirecting

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Create user object including all required fields
    const userData = {
      username,
      password,
      first_name: firstName, // Match field names with API expectations
      last_name: lastName,
      bio,
      image
    };

    // Send request to create user
    try {
      await createUser(userData);
      setRedirectToLogin(true); // Set redirect state to true after signup
    } catch (error) {
      console.error('Signup failed:', error.response.data); // Log error for debugging
    }
  };

  // Redirect to Login page if redirectToLogin is true
  if (redirectToLogin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <h1>Signup</h1>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])} // Capture image file
        />
        <button type="submit">Signup</button>
        <div>
          Already have an account? 
          <span 
            onClick={() => setRedirectToLogin(true)} // Set redirect on click
            style={{ marginLeft: '5px', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
            Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;



