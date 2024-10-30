import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot for React 18
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./Components/App";
import About from "./Components/About";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import Messages from "./Components/Messages";
import PrivateChat from "./Components/PrivateChat";
import FriendsList from "./Components/FriendsList";

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/app" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/private-chat" element={<PrivateChat />} />
        <Route path="/friends" element={<FriendsList />} />
      </Routes>
    </Router>
  );
};

// Create a root using createRoot if it doesn't already exist
const container = document.getElementById("root");
let root;

// Check if root is already initialized
if (!root) {
  root = createRoot(container); // Create root for React 18
}

// Use root.render instead of ReactDOM.render
root.render(<Main />); // Render the Main component
