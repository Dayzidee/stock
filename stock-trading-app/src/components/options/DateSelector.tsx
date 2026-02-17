import React from 'react';
import { formatDate } from '../../utils/formatters';

interface DateSelectorProps {
    dates: string[];
    selectedDate: string;
    onDateChange: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ dates, selectedDate, onDateChange }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="overflow-x-auto scrollbar-hide" ref={scrollRef}>
            <div className="flex space-x-2 px-4 py-3">
                {dates.map((date) => {
                    const isSelected = date === selectedDate;
                    const formattedDate = formatDate(date);

                    return (
                        <button
                            key={date}
                            onClick={() => onDateChange(date)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${isSelected
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {formattedDate}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default DateSelector;
