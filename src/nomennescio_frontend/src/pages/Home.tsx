import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Template from '../components/global/template';
import Navbar from '../components/global/navbar';
import ParticleBackground from '../components/elements/canvas/particle-background';
import TypingEffect from "react-typing-effect";
import { useState, useRef, useEffect } from 'react';
import useDrawableCanvas from '../hooks/use-drawable-canvas';
import DrawableCanvas from '../components/elements/canvas/drawable-canvas';

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
    const [showCanvas, setShowCanvas] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [canvasWidth, setCanvasWidth] = useState(1000);
    const [canvasHeight, setCanvasHeight] = useState(800);

    const handleCanvasToggle = () => {
        setShowCanvas(!showCanvas);
    };

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCanvasWidth(parseInt(e.target.value, 10));
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCanvasHeight(parseInt(e.target.value, 10));
    };

    return (
        <div className='w-full bg-gray-900'>
            <div className="z-50">
                <Navbar />
            </div>
            <div className="w-screen z-40 min-h-screen flex flex-col items-center mt-20 text-white relative">
                <h1 className="text-9xl z-40 font-extrabold mb-2 tracking-wide relative group transition-shadow duration-300 hover:shadow-lg">
                    Nomen Nescio
                </h1>
                <h2 className="text-2xl mb-6 z-40 italic relative group">
                    /ˈnoʊ.mɛn ˈnɛs.ki.oʊ/
                    <span className="absolute z-40 bottom-full mb-2 hidden  group-hover:block bg-gray-800 text-white text-sm p-2 rounded transition-opacity duration-300 opacity-0 group-hover:opacity-100 animate-fade-in">
                        Pronunciation: No-men Nes-kee-o
                    </span>
                </h2>
                <div className="w-screen m-4 z-40 text-center font-bold animate-fade-in">
                    <p className='text-4xl mb-2'>From Hand to Hand</p>
                    <p className='text-4xl mb-8'>Secured by Your&nbsp;
                        <TypingEffect
                            text={["Mark.", "Signature."]}
                            speed={100}
                            eraseSpeed={50}
                            typingDelay={100}
                            cursor="|"
                            eraseDelay={1000}
                            displayTextRenderer={(text: string) => <span>{text}</span>}
                        />
                    </p>
                    <button onClick={handleCanvasToggle} className="mt-4 text-blue-500 hover:text-blue-700 transition duration-300">
                        Try finding your signature?
                    </button>
                </div>
                {showCanvas && (
                    <div className="w-full flex flex-col items-center mt-4 z-50">
                        <DrawableCanvas
                            width={500}
                            height={500}
                            setFile={setFile}
                            useCustomLine={true}
                        />
                    </div>
                )}
                <ParticleBackground className="z-10" />
            </div>
        </div>
    );
};

export default Home;
