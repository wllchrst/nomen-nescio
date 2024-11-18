import React from 'react';
import { FaUndo, FaTrash, FaDownload } from 'react-icons/fa';
import useDrawableCanvas from '../../../hooks/use-drawable-canvas';

interface DrawableCanvasProps {
    text: string;
    width: number;
    height: number;
}

const DrawableCanvas: React.FC<DrawableCanvasProps> = ({ text, width, height }) => {
    const { canvasRef, startDrawing, stopDrawing, draw, undo, resetCanvas, isValid } = useDrawableCanvas(width, height);

    const downloadInvertedCanvas = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current as HTMLCanvasElement;
            const context = canvas.getContext('2d');

            // invert colornya karna canvasnya didraw pake putih
            if (context) {
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = canvas.width;
                tempCanvas.height = canvas.height;
                const tempContext = tempCanvas.getContext('2d');

                if (tempContext) {
                    tempContext.drawImage(canvas, 0, 0);

                    const imageData = tempContext.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;

                    for (let i = 0; i < data.length; i += 4) {
                        data[i] = 255 - data[i];    
                        data[i + 1] = 255 - data[i + 1]; 
                        data[i + 2] = 255 - data[i + 2]; 
                    }

                    tempContext.putImageData(imageData, 0, 0);

                    const link = document.createElement('a');
                    link.href = tempCanvas.toDataURL('image/png');
                    link.download = 'inverted_signature.png'; 
                    link.click();
                }
            }
        }
    };

    return (
        <div className="relative">
            <label className="text-base font-bold text-gray-300 mb-1 block">{text}</label>
            <div
                className={`relative border rounded-md bg-black ${isValid === null
                    ? 'border-gray-600'
                    : isValid
                        ? 'border-green-500'
                        : 'border-red-500'
                    }`}
                style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}
            >
                <canvas
                    ref={canvasRef}
                    className="w-full h-full cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseMove={draw}
                    onMouseLeave={stopDrawing}
                ></canvas>

                <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                        onClick={undo}
                        className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-opacity duration-300 opacity-20 hover:opacity-100"
                    >
                        <FaUndo className="text-white" />
                    </button>
                    <button
                        onClick={resetCanvas}
                        className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-opacity duration-300 opacity-20 hover:opacity-100"
                    >
                        <FaTrash className="text-white" />
                    </button>
                    <button
                        onClick={downloadInvertedCanvas}
                        className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-opacity duration-300 opacity-20 hover:opacity-100"
                    >
                        <FaDownload className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DrawableCanvas;
