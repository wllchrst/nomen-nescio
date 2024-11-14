import React from 'react';

interface OptionProps {
    value: string;
    label: string;
}

const Option: React.FC<OptionProps> = ({ value, label }) => {
    return <option value={value}>{label}</option>;
};

export default Option;