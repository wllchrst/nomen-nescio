import React from 'react';
import clsx from 'clsx';

interface LabelProps {
    text: string;
    className?: string;
}

const Label: React.FC<LabelProps> = ({ text , className = ""}) => {
    return (
        <label className={clsx("block text-base font-bold text-gray-300 mb-1", className)}>
            {text}
        </label>
    );
};

export default Label;
