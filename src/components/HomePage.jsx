import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const HomePage = () => {
  useEffect(() => {
   
    const fetchData = async () => {
      try {
        await axios.get("https://api.example.com/home");
       
      } catch (error) {
       
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
   
      <nav style={navbarStyle}>
        <div style={logoStyle}>
          <Link to="/" style={linkStyle}>MyApp</Link>
        </div>
        <div>
          <ul style={navLinksStyle}>
            <li>
              <Link to="/quizzes" style={linkStyle}>Quizzes</Link>
            </li>
            <li>
              <Link to="/signin" style={linkStyle}>Sign Up</Link>
            </li>
            <li>
              <Link to="/signup" style={linkStyle}>Login</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div style={pageStyle}>
        <h1>Welcome to MyApp</h1>
      </div>
    </div>
  );
};


const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#333",
  color: "white",
};

const logoStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
};

const navLinksStyle = {
  listStyleType: "none",
  display: "flex",
  margin: 0,
  padding: 0,
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontSize: "1rem",
  margin: "0 15px",
  transition: "color 0.3s",
};

const pageStyle = {
  textAlign: "center",
  marginTop: "50px",
};

export default HomePage;