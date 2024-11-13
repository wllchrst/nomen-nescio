import React from 'react';

interface SelectOptionProps {
    label: string;
    onChange: (value: string) => void;
    children: React.ReactNode; 
}

const SelectOption: React.FC<SelectOptionProps> = ({ label, onChange, value, children }) => {
    return (
        <div>
            <label className="block text-base font-bold text-gray-300 mb-1">{label}</label>
            <select
                className="w-full text-sm p-4 border border-gray-600 rounded-md p-4 bg-[#0d1117] text-white focus:border-blue-500 focus:outline-none"
                onChange={(e) => onChange(e.target.value)}
            >
                {children}
                // nanti disini harus pakai Option
            </select>
        </div>
    );
};

export default SelectOption;
