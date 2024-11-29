import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import TextField from "../../components/elements/fields/text-field";
import PasswordField from "../../components/elements/fields/password-field";
import ParticleBackground from "../../components/elements/canvas/particle-background";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin } from "../../interfaces/login-interface";
import { UserService } from "../../service/user-service";
import { useUserContext } from "../../context/user-context";
import Alert from "../../components/elements/alerts/alert";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ILogin>();
  const userService = new UserService();
  const { setUserData } = useUserContext();
  const [alert, setAlert] = useState({ show: false, message: "", type: "error", key: 0 });

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    if (!data.email || !data.password) {
      setAlert({ show: true, message: "Please fill in all fields.", type: "error", key: alert.key + 1 });
      return;
    }
    try {
      const result = await userService.loginUser(data);
      if (result && result.success && result.data.email !== "") {
        setUserData(result.data);
        navigate("/");
      } else {
        setAlert({ show: true, message: "Wrong credentials. Please try again.", type: "error", key: alert.key + 1 });
      }
    } catch (error) {
      setAlert({ show: true, message: "Login failed. Please try again.", type: "error", key: alert.key + 1 });
    }
  };

  return (
    <div className="relative flex justify-center items-center bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white">
      <ParticleBackground />
      {alert.show && (
        <Alert
          key={alert.key}
          title="Login Error"
          desc={alert.message}
          type={alert.type}
          showAlert={alert.show}
          closeAlert={() => setAlert({ ...alert, show: false })}
          isClosing={false}
        />
      )}

      <div className="flex flex-col md:flex-row z-10 max-w-4xl bg-[#1e293b] rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl p-8 md:p-10 text-white space-y-8 md:space-y-0 md:space-x-10">
        <div className="hidden md:flex flex-col justify-center items-start space-y-4">
          <h2 className="text-5xl font-extrabold tracking-tight leading-tight">
            Welcome Back!
          </h2>
          <p className="text-lg text-gray-300">
            Log in to continue and explore the amazing features we offer.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate("/")}
              className="text-base bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 transition duration-200"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-base bg-gray-700 hover:bg-gray-800 text-white rounded-md px-4 py-2 transition duration-200"
            >
              Login
            </button>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sign In</h2>
          <p className="text-sm text-gray-400 mb-6">
            Access your account and manage your data.
          </p>

          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <div className="flex items-center border-b border-gray-700 py-2">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-gray-500 mr-3"
                />
                <TextField
                  title=""
                  variant="email"
                  placeholder="Email"
                  className="flex-1"
                  register={register("email")}
                />
              </div>
              <div className="flex items-center border-b border-gray-700 py-2">
                <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-3" />
                <PasswordField
                  title=""
                  variant="normal"
                  placeholder="Password"
                  register={register("password")}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 transition duration-200 transform hover:scale-105"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-gray-400 text-center text-sm">
            <span
              onClick={() => navigate("/forgot-password")}
              className="hover:text-blue-400 cursor-pointer"
            >
              Forgot Password?
            </span>
          </p>

          <p className="mt-4 text-gray-400 text-center text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
