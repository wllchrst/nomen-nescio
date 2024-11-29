import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/register";
import Home from "./pages/home";
import MainLayout from "./layouts/main-layout";
import Storage from "./pages/storage";
import Setting from "./pages/Setting";
import Upload from "./pages/Upload";
import ProviderLayout from "./layouts/provider-layout";
import Group from "./pages/Group";
import Mail from "./pages/mail";
import { UserService } from "./service/user-service";

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const userService = new UserService();

  useEffect(() => {
    const isAuthenticated = userService.isAuthenticated();
    const currentPath = window.location.pathname;

    if (!isAuthenticated && !["/", "/register"].includes(currentPath)) {
      navigate("/");
    } else if (isAuthenticated && ["/", "/register"].includes(currentPath)) {
      navigate("/home");
    }
  }, [navigate, userService]);

  return (
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
  );
};

export default App;
