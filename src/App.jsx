import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  HomePage  from "./components/HomePage";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import QuizzesPage from "./components/QuizzesPage";


export const App = () => {
  return (
    <Router>
      <div>
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;