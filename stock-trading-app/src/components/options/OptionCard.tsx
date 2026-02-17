import React from 'react';
import type { Option } from '../../types';
import { formatCurrency, formatPercent, getChangeBgColor, getChangeColor } from '../../utils/formatters';

interface OptionCardProps {
    option: Option;
    onClick?: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                        {formatCurrency(option.strike, 0)} {option.type === 'call' ? 'Call' : 'Put'}
                    </h3>
                    <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                        <div>
                            <span className="font-medium">BREAK EVEN</span>
                            <p className="text-gray-900">{formatCurrency(option.breakEven)}</p>
                        </div>
                        <div>
                            <span className="font-medium">TO BREAK EVEN %</span>
                            <p className="text-gray-900">{formatPercent(option.breakEvenPercent, 2, true)}</p>
                        </div>
                    </div>
                </div>

                <div className="text-right ml-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white ${getChangeBgColor(option.change)}`}>
                        {formatCurrency(option.price)}
                    </div>
                    <p className={`text-xs mt-1 font-medium ${getChangeColor(option.change)}`}>
                        {formatPercent(option.changePercent, 2, true)} TODAY
                    </p>
                </div>
            </div>

            {option.strike === Math.floor(option.strike) && (
                <div className="mt-2 text-center">
                    <p className="text-xs font-medium text-primary">
                        SHARE PRICE: {formatCurrency(48.75)}
                    </p>
                </div>
            )}
        </div>
    );
};

export default OptionCard;
