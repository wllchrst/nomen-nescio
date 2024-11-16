import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (!canvas || !context) return;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setCanvasSize();

        const particlesArray = Array.from({ length: 80 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: (Math.random() - 0.5) * 1.5
        }));

        const animateParticles = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            particlesArray.forEach(particle => {
                particle.x = (particle.x + particle.speedX + canvas.width) % canvas.width;
                particle.y = (particle.y + particle.speedY + canvas.height) % canvas.height;

                context.beginPath();
                context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                context.fillStyle = 'rgba(255, 255, 255, 0.5)';
                context.fill();
            });

            requestAnimationFrame(animateParticles);
        };

        animateParticles();
        window.addEventListener('resize', setCanvasSize);

        return () => {
            window.removeEventListener('resize', setCanvasSize);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

export default ParticleBackground;
