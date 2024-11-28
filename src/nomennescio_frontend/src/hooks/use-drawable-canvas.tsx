import { useRef, useEffect, useState, useCallback } from 'react';

const useDrawableCanvas = (width: number, height: number) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const isDrawing = useRef(false);
    const [history, setHistory] = useState<ImageData[]>([]);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [lineWidth, setLineWidthState] = useState(2);
    const [lineColor, setLineColorState] = useState('#000000');

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            validateCanvas();
        }
    }, [width, height]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.lineWidth = lineWidth;
                ctx.lineCap = 'round';
                ctx.strokeStyle = lineColor; 
            }
        }
    }, [lineWidth, lineColor]);

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        isDrawing.current = true;
        saveCanvasState(); 
        validateCanvas();
    };

    const stopDrawing = () => {
        isDrawing.current = false;
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) ctx.beginPath();
        }
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
        const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;

        ctx.lineTo(clientX - rect.left, clientY - rect.top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(clientX - rect.left, clientY - rect.top);
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
                validateCanvas();
            }
        }
    };

    const resetCanvas = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                setHistory([]);
                validateCanvas();
            }
        }
    };

    const isCanvasEmpty = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
                for (let i = 0; i < imageData.data.length; i += 4) {
                    if (imageData.data[i + 3] !== 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    const validateCanvas = () => {
        if (isCanvasEmpty()) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    };

    const setLineWidth = (width: number) => {
        setLineWidthState(width);
    };

    const setLineColor = (color: string) => {
        setLineColorState(color);
    };

    const downloadCanvas = () => {
        if (canvasRef.current) {
            const originalCanvas = canvasRef.current as HTMLCanvasElement;
            const context = originalCanvas.getContext("2d");

            if (context) {
                const tempCanvas = document.createElement("canvas");
                const tempContext = tempCanvas.getContext("2d");

                if (tempContext) {
                    tempCanvas.width = originalCanvas.width;
                    tempCanvas.height = originalCanvas.height;

                    tempContext.fillStyle = "white";
                    tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

                    tempContext.drawImage(originalCanvas, 0, 0);

                    const link = document.createElement("a");
                    link.href = tempCanvas.toDataURL("image/jpg", 1.0);
                    link.download = "signature.jpg";
                    link.click();
                }
            }
        }
    };

    return { 
        canvasRef, 
        startDrawing, 
        stopDrawing, 
        draw, 
        undo, 
        resetCanvas, 
        isValid, 
        setLineWidth, 
        setLineColor, 
        saveCanvasState,
        downloadCanvas 
    };
};

export default useDrawableCanvas;
