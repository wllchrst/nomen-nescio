import React from "react";
import Template from "../components/global/template";
import FileUpload from "../components/elements/files/file-upload";

const Upload = () => {
    return (
        <Template>
            <div className="text-center p-10 rounded-lg shadow-lg text-gray-300">
                <h1 className="text-gray-300 mb-8 text-6xl font-bold">UPLOAD YOUR FILE</h1>
                <p className="text-gray-500 mb-7 text-lg">Please select a file to upload. Supported formats: .jpg, .png, .pdf</p>
                <div className="flex justify-center items-center flex-col space-y-4">
                    <FileUpload />
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit</button>
                </div>
            </div>
        </Template>
    )
}

export default Upload;