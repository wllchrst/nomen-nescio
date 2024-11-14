import React from 'react';
import { FaUndo, FaTrash } from 'react-icons/fa';
import useDrawableCanvas from '../../../hooks/use-drawable-canvas';

interface DrawableCanvasProps {
    text: string;
    width: number;
    height: number;
}

const DrawableCanvas: React.FC<DrawableCanvasProps> = ({ text, width, height }) => {
    const { canvasRef, startDrawing, stopDrawing, draw, undo, resetCanvas, isValid } = useDrawableCanvas(width, height);

    return (
        <div className="relative">
            <label className="text-base font-bold text-gray-300 mb-1 block">{text}</label>
            <div
                className={`relative border rounded-md bg-[#0d1117] ${isValid === null
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
                </div>
            </div>
        </div>
    );
};

export default DrawableCanvas;
