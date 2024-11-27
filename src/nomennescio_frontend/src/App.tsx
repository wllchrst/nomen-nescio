import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/authentication/login";
import Register from "./pages/authentication/Register";
import Home from "./pages/home";
import MainLayout from "./layouts/main-layout";
import Storage from "./pages/Storage";
import Upload from "./pages/upload";
import Setting from "./pages/Setting";
import ProviderLayout from "./layouts/provider-layout";
import Group from "./pages/group";
import Mail from "./pages/mail";

const App: React.FC = () => {

  return (
    <Router>
      <MainLayout>
        <div className="min-h-screen overflow-hidden bg-[#0d1117] flex items-center justify-center overflow-y-hidden">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mail" element={<Mail />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/group" element={<Group />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </div>
      </MainLayout>
    </Router>
  );
};

export default App;
