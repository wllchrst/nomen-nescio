import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Home from "./pages/Home";
import Storage from "./pages/Storage";
import Upload from "./pages/Upload";
import Group from "./pages/Group";
import MainLayout from "./layouts/main-layout";
import Setting from "./pages/Setting";

const App: React.FC = () => {

  return (
    <Router>
      <MainLayout>
        <div className="min-h-screen overflow-hidden bg-[#0d1117] flex items-center justify-center overflow-y-hidden">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/Upload" element={<Upload />} />
            <Route path="/Group" element={<Group />} />
            <Route path="/Setting" element={<Setting />} />
          </Routes>
        </div>
      </MainLayout>
    </Router>
  );
};

export default App;
