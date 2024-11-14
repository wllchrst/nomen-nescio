import React from 'react';
import { motion } from 'framer-motion';
import TextField from '../components/elements/fields/text-field';
import PasswordField from '../components/elements/fields/password-field';
import Checkbox from '../components/elements/checkboxes/checkbox';
import DrawableCanvas from '../components/elements/canvas/drawable-canvas';
import useAuthForm from '../hooks/use-authentication-form';
import TypingEffect from 'react-typing-effect'; 

const Authentication: React.FC = () => {
    const { isRegister, toggleForm } = useAuthForm();

    // pls ini diganti aja ko ini masih ngasal bgt text greeting nya
    const words = [
        "File.",
        "Way.",
        "Safety.",
        ""
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex max-w-6xl bg-[#161b22] rounded-lg shadow-md overflow-hidden ${isRegister ? 'w-full' : 'w-2/5'}`}
            >
                <div className="flex-1 p-8 text-white">
                    <motion.div
                        initial={{ x: isRegister ? -100 : 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: isRegister ? 100 : -100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-6xl font-bold mb-2">
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
                        <p className="text-lg text-gray-400 mb-6">
                            {isRegister ? 'Register to Get Started!' : 'Welcome back! Please login.'}
                        </p>

                        {isRegister ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <TextField title="Email" />
                                    <PasswordField title="Password" />
                                    <TextField title="Full Name" />
                                    <Checkbox text="I agree to" link="Terms & Conditions" />
                                </div>

                                <div className="space-y-4">
                                    <DrawableCanvas text="Draw Your Signature" />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <TextField title="Email" />
                                <PasswordField title="Password" />
                            </div>
                        )}

                        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 transition duration-200">
                            {isRegister ? 'Register' : 'Login'}
                        </button>

                        <p className="mt-4 text-gray-400 text-center text-base">
                            {isRegister ? "Already have an account?" : "Don't have an account?"}{' '}
                            <button
                                onClick={toggleForm}
                                className="text-blue-400 hover:underline focus:outline-none"
                            >
                                {isRegister ? 'Login' : 'Register'}
                            </button>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Authentication;
