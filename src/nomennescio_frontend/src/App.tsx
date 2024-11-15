import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <Routes>
          {/* <Route path="/" element={<Login/>} /> */}
          <Route path="/" element={<Home/>} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
