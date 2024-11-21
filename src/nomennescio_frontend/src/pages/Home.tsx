import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Template from '../components/global/template';
import Navbar from '../components/global/navbar';

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
        <div className="">
            <Navbar />
        </div>
        <div className="w-screen min-h-screen flex flex-col items-center mt-20 text-white">
            <div className="w-screen m-4 text-center font-bold animate-fade-in">
                <p className='text-9xl mb-4'>From Hand to Hand</p>
                <p className='text-7xl mb-8'>Secured by Your Mark.</p>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition duration-300">
                    Get Started.
                </a>
            </div>
        </div>
    </div>
    );
};

export default Home;
