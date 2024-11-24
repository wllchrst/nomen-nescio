import React, { useState, useEffect, useCallback } from "react";
import { FaUndo, FaTrash, FaDownload } from "react-icons/fa";
import useDrawableCanvas from "../../../hooks/use-drawable-canvas";

interface DrawableCanvasProps {
  text?: string;
  width: number;
  height: number;
  setFile: (file: File | null) => void;
  useCustomLine?: boolean;
}

const DrawableCanvas: React.FC<DrawableCanvasProps> = ({
  text,
  width,
  height,
  setFile,
  useCustomLine = false,
}) => {
  const {
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
  } = useDrawableCanvas(width, height);

  const [lineWidth, setLocalLineWidth] = useState(2);
  const [lineColor, setLocalLineColor] = useState("#ffffff");

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'z') {
      undo();
    }
  }, [undo]);

  useEffect(() => {
    if (useCustomLine) {
      setLineWidth(lineWidth);
      setLineColor(lineColor);
    }
  }, [lineWidth, lineColor, useCustomLine]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleLineWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLineWidth = parseInt(e.target.value, 10);
    setLocalLineWidth(newLineWidth);
    setLineWidth(newLineWidth);
  };

  const handleLineColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLineColor = e.target.value;
    setLocalLineColor(newLineColor);
    setLineColor(newLineColor);
  };

  const downloadInvertedCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement;
      const context = canvas.getContext("2d");

      // invert colornya karna canvasnya didraw pake putih
      if (context) {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempContext = tempCanvas.getContext("2d");

        if (tempContext) {
          tempContext.drawImage(canvas, 0, 0);

          const imageData = tempContext.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
          }

          tempContext.putImageData(imageData, 0, 0);

          const link = document.createElement("a");
          link.href = tempCanvas.toDataURL("image/png");
          link.download = "inverted_signature.png";
          link.click();
        }
      }
    }
  };

  const getCanvasImage = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement;
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "canvas_image.png", {
            type: "image/png",
          });
          console.log("dapet", file);
          setFile(file);
        }
      }, "image/png");
    }
    setFile(null);
  };

  const handleMouseUp = () => {
    stopDrawing();
    getCanvasImage();
    saveCanvasState(); 
  };

  return (
    <div className="relative">
      <label className="text-base font-bold text-gray-300 mb-1 block">
        {text}
      </label>
      {useCustomLine && (
        <div className="flex items-center mb-2">
          <label className="text-gray-300 mr-2">Line Width:</label>
          <input
            type="range"
            min="1"
            max="10"
            value={lineWidth}
            onChange={handleLineWidthChange}
            className="mr-4"
          />
          <label className="text-gray-300 mr-2">Line Color:</label>
          <input
            type="color"
            value={lineColor}
            onChange={handleLineColorChange}
          />
        </div>
      )}
      <div
        className={`relative border rounded-md bg-black ${
          isValid === null
            ? "border-gray-600"
            : isValid
            ? "border-green-500"
            : "border-red-500"
        }`}
        style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseUp={handleMouseUp}
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
