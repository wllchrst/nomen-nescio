import React from 'react';
import Template from '../components/global/template';

const Mail: React.FC = () => {
    return (
        <Template>
            <div className="flex w-full h-full">
                <div className="w-1/4 bg-gray-700 p-4">
                    <h2 className="text-white text-xl mb-4">Folders</h2>
                    <ul className="text-white">
                        <li className="mb-2">Inbox</li>
                        <li className="mb-2">Sent</li>
                        <li className="mb-2">Drafts</li>
                        <li className="mb-2">Trash</li>
                    </ul>
                </div>
                <div className="w-3/4 bg-gray-800 p-4">
                    <div className="bg-gray-900 p-2 mb-4">
                        <h1 className="text-white text-2xl">Inbox</h1>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 bg-gray-800 p-4">
                            <ul className="text-white">
                                <li className="mb-2">Email 1</li>
                                <li className="mb-2">Email 2</li>
                                <li className="mb-2">Email 3</li>
                            </ul>
                        </div>
                        <div className="w-1/2 bg-gray-700 p-4">
                            <h2 className="text-white text-xl mb-4">Email Preview</h2>
                            <p className="text-white">Select an email to read</p>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    );
};

export default Mail;
