import React, { useState, useEffect, useCallback } from "react";
import { FaUndo, FaTrash, FaDownload } from "react-icons/fa";
import useDrawableCanvas from "../../../hooks/use-drawable-canvas";
import { useFileActions } from '../../../hooks/use-file-action';
import clsx from "clsx";

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
    downloadCanvas,
    validateCanvas,
  } = useDrawableCanvas(width, height);

  const { showAlert } = useFileActions('', ''); 

  const [lineWidth, setLocalLineWidth] = useState(2);
  const [lineColor, setLocalLineColor] = useState("#000000");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        handleUndo();
      }
    },
    []
  );

  useEffect(() => {
    if (useCustomLine) {
      setLineWidth(lineWidth);
      setLineColor(lineColor);
    }
  }, [lineWidth, lineColor, useCustomLine]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const getCanvasImage = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement;
      const context = canvas.getContext("2d");

      if (context) {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempContext = tempCanvas.getContext("2d");

        if (tempContext) {
          tempContext.fillStyle = "white";
          tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

          tempContext.drawImage(canvas, 0, 0);

          tempCanvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], "canvas_image.jpg", {
                type: "image/jpeg",
              });
              setFile(file);
            }
          }, "image/jpeg");
        }
      }
    } else {
      setFile(null);
    }
  };

  const dataURLToBlob = (dataUrl: string): Blob | null => {
    const byteString = atob(dataUrl.split(",")[1]);
    const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleMouseUp = () => {
    stopDrawing();
    if (canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement;
      const context = canvas.getContext("2d");
      if (context) {
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        if (imageData) {
          const isValidCanvas = validateCanvas();
          if (!isValidCanvas) {
            showAlert('error', 'Invalid Canvas', 'The canvas content is invalid.');
          }
        }
      }
      getCanvasImage();
      saveCanvasState();
      setFile(canvas); 
    }
  };

  const handleUndo = () => {
    undo();
    validateCanvas(); 
  };

  const handleReset = () => {
    resetCanvas();
    validateCanvas(); 
  };

  return (
    <div className="relative">
      <label className="text-base font-bold text-gray-300 mb-1 block">
        {text}
      </label>
      <div
        className={clsx(
          "relative border rounded-md bg-white",
          {
            "border-gray-600": isValid === null,
            "border-green-500": isValid === true,
            "border-red-500": isValid === false,
          }
        )}
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
            onClick={handleUndo}
            className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-opacity duration-300 opacity-20 hover:opacity-100"
          >
            <FaUndo className="text-white" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-opacity duration-300 opacity-20 hover:opacity-100"
          >
            <FaTrash className="text-white" />
          </button>
          <button
            onClick={downloadCanvas}
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
