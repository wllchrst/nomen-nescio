import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Template from '../components/global/template';
import Navbar from '../components/global/navbar';
import ParticleBackground from '../components/elements/canvas/particle-background';
import TypingEffect from "react-typing-effect";

const dummyData = [
    {
        id: 1,
        image: 'https://via.placeholder.com/50',
        name: 'John Doe',
        email: 'john.doe@example.com',
        link: 'profile/johndoe'
    },
    {
        id: 2,
        image: 'https://via.placeholder.com/50',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        link: 'profile/johnsmith'
    },
    {
        id: 3,
        image: 'https://via.placeholder.com/50',
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        link: 'profile/mic  ael'
    },
    {
        id: 4,
        image: 'https://via.placeholder.com/50',
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        link: 'profile/emily'
    },
];

const Home = () => {
    return (
        <div className='w-full bg-gray-900'>
            <div className="z-20">
                <Navbar />
            </div>
            <div className="w-screen z-30 min-h-screen flex flex-col items-center mt-20 text-white">
                <div className="w-screen m-4 z-40 text-center font-bold animate-fade-in">
                    <p className='text-9xl mb-4'>From Hand to Hand</p>
                    <p className='text-7xl mb-8'>Secured by Your&nbsp;
                        <TypingEffect
                            text={["Mark.", "Signature."]}
                            speed={100}
                            eraseSpeed={200}
                            typingDelay={1000}  
                            cursor="|"
                            eraseDelay={1000}
                            displayTextRenderer={(text: string) => <span>{text}</span>}
                        />
                    </p>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition duration-300">
                        Get Started.
                    </a>
                </div>
                <div className="w-full mt-10 text-center">
                    <h2 className="text-4xl mb-6">Features</h2>
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full md:w-1/3 p-4">
                            <h3 className="text-2xl font-bold mb-2">Feature One</h3>
                            <p className="text-gray-400">Description of feature one.</p>
                        </div>
                        <div className="w-full md:w-1/3 p-4">
                            <h3 className="text-2xl font-bold mb-2">Feature Two</h3>
                            <p className="text-gray-400">Description of feature two.</p>
                        </div>
                        <div className="w-full md:w-1/3 p-4">
                            <h3 className="text-2xl font-bold mb-2">Feature Three</h3>
                            <p className="text-gray-400">Description of feature three.</p>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-10 text-center">
                    <h2 className="text-4xl mb-6">Our Users</h2>
                    <div className="flex flex-col items-center">
                        {dummyData.map(user => (
                            <div key={user.id} className="flex items-center mb-4 w-3/4">
                                <img src={user.image} alt={user.name} className="rounded-full w-16 h-16 mr-4" />
                                <div>
                                    <h3 className="text-xl font-bold">{user.name}</h3>
                                    <p className="text-gray-400">{user.email}</p>
                                    <a href={user.link} className="text-blue-500 hover:text-blue-700 transition duration-300">
                                        View Profile
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ParticleBackground></ParticleBackground>
            <footer className="w-full bg-gray-800 text-center p-4 mt-10">
                <p className="text-gray-400">&copy; 2023 Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
