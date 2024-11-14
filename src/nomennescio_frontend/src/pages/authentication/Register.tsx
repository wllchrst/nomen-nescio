import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../../components/elements/fields/text-field';
import PasswordField from '../../components/elements/fields/password-field';
import Checkbox from '../../components/elements/checkboxes/checkbox';
import DrawableCanvas from '../../components/elements/canvas/drawable-canvas';
import TypingEffect from 'react-typing-effect';
import useWords from '../../hooks/use-authentication-words';

const Register: React.FC = () => {
    const words = useWords();
    const navigate = useNavigate();

    return (
        <div className="flex max-w-6xl bg-[#161b22] rounded-lg shadow-md overflow-hidden p-8 text-white">
            <div className="flex-1">
                <h2 className="text-4xl font-bold mb-2">
                    Your&nbsp;
                    <TypingEffect
                        text={words}
                        speed={100}
                        eraseSpeed={50}
                        typingDelay={500}
                        cursor="|"
                        eraseDelay={1000}
                        displayTextRenderer={(text: string) => <span>{text}</span>}
                    />
                </h2>
                <p className="text-base text-gray-400 mb-6">Create your account.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <TextField variant="username" title="Full Name*" />
                        <TextField variant="email" title="Email*" />
                        <PasswordField title="Password*"  />
                        <Checkbox text="I agree to" link="Terms & Conditions" />
                    </div>

                    <div className="space-y-4">
                        <DrawableCanvas width={350} height={200} text="Draw Your Signature" />
                    </div>
                </div>

                <button className="w-full mt-4 text-base bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 transition duration-200">
                    Register
                </button>

                <p className="mt-4 text-gray-400 text-center text-sm">
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/')}
                        className="text-blue-400 hover:underline cursor-pointer"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
