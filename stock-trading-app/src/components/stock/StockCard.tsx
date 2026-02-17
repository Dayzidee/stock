import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Stock } from '../../types';
import { formatCurrency, formatPercent, getChangeBgColor } from '../../utils/formatters';
import MiniChart from '../common/MiniChart';

interface StockCardProps {
    stock: Stock;
}

const StockCard: React.FC<StockCardProps> = ({ stock }) => {
    const navigate = useNavigate();
    const isPositive = stock.change >= 0;
    const chartColor = isPositive ? '#00D4AA' : '#FF5A5F';

    return (
        <div
            onClick={() => navigate(`/stock/${stock.symbol}`)}
            className="bg-white p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{stock.symbol}</h3>
                    <p className="text-xs text-gray-500 truncate">{stock.shares ? `${stock.shares} shares` : stock.name}</p>
                </div>

                <div className="w-20 h-10 mx-3">
                    <MiniChart data={stock.chartData} color={chartColor} />
                </div>

                <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(stock.price)}</p>
                    <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${getChangeBgColor(stock.change)}`}>
                        {formatPercent(stock.changePercent, 2, true)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockCard;
