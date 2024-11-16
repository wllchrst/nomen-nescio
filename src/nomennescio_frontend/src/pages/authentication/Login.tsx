import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../../components/elements/fields/text-field';
import PasswordField from '../../components/elements/fields/password-field';
import useWords from '../../hooks/use-authentication-words';
import ParticleBackground from '../../components/elements/canvas/particle-background';

const Login: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex justify-center items-center bg-[#161b22] text-white">
            <ParticleBackground></ParticleBackground>
            <div className="flex z-10 max-w-6xl bg-[#161b22] rounded-lg shadow-md overflow-hidden p-8 text-white">
                <div className="flex-1">
                    <h2 className="text-4xl font-bold mb-2">Welcome back!</h2>
                    <p className="text-base text-gray-400 mb-6">Please login.</p>

                    <div className="space-y-4">
                        <TextField title="Email" variant="username" />
                        <PasswordField variant='normal' title="Password" />
                    </div>

                    <button onClick={() => navigate('/home')} className="w-full mt-4 text-base bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 transition duration-200">
                        Login
                    </button>

                    <p className="mt-4 text-gray-400 text-center text-sm">
                        Don't have an account?{' '}
                        <span
                            onClick={() => navigate('/register')}
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
