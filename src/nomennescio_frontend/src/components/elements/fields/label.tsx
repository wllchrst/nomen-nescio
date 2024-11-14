import React from 'react';

interface LabelProps {
    text: string;
}

const Label: React.FC<LabelProps> = ({ text }) => {
    return (
        <label className="block text-base font-bold text-gray-300 mb-1">
            {text}
        </label>
    );
};

export default Label;
