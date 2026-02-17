import React from 'react';

interface NumericKeypadProps {
    value: string;
    onChange: (value: string) => void;
    maxValue?: number;
}

const NumericKeypad: React.FC<NumericKeypadProps> = ({ value, onChange, maxValue }) => {
    const handleNumberClick = (num: string) => {
        const newValue = value + num;
        if (maxValue && parseFloat(newValue) > maxValue) return;
        onChange(newValue);
    };

    const handleDecimalClick = () => {
        if (!value.includes('.')) {
            onChange(value + '.');
        }
    };

    const handleBackspace = () => {
        onChange(value.slice(0, -1));
    };

    const buttons = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['.', '0', '⌫'],
    ];

    return (
        <div className="grid grid-cols-3 gap-3 p-4">
            {buttons.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    {row.map((btn) => (
                        <button
                            key={btn}
                            onClick={() => {
                                if (btn === '⌫') handleBackspace();
                                else if (btn === '.') handleDecimalClick();
                                else handleNumberClick(btn);
                            }}
                            className="h-14 text-2xl font-light text-primary hover:bg-gray-50 rounded-lg transition-colors active:bg-gray-100"
                        >
                            {btn}
                        </button>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
};

export default NumericKeypad;
