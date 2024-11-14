import React from 'react';

interface CheckboxProps {
    text: string;
    link?: string;
    linkHref?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ text, linkHref, link }) => {
    return (
        <div className="flex items-start space-x-2">
            <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-600 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-400">
                {text}{' '}
                <a href={linkHref} className="text-blue-400">
                    {link}
                </a>
            </label>
        </div>
    );
};

export default Checkbox;