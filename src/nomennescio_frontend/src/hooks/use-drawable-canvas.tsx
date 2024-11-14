import { useRef, useEffect, useState } from 'react';

const useDrawableCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const isDrawing = useRef(false);
    const [history, setHistory] = useState<ImageData[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.strokeStyle = '#ffffff';
            }
        }
    }, []);

    const startDrawing = (e: React.MouseEvent) => {
        isDrawing.current = true;
        saveCanvasState();
        draw(e);
    };

    const stopDrawing = () => {
        isDrawing.current = false;
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) ctx.beginPath();
        }
    };

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const saveCanvasState = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
                setHistory((prev) => [...prev, imageData]);
            }
        }
    };

    const undo = () => {
        if (history.length > 0 && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                const lastState = history[history.length - 1];
                ctx.putImageData(lastState, 0, 0);
                setHistory((prev) => prev.slice(0, -1));
            }
        }
    };

    const resetCanvas = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                setHistory([]);
            }
        }
    };

    return { canvasRef, startDrawing, stopDrawing, draw, undo, resetCanvas };
};

export default useDrawableCanvas;
