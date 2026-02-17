import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { formatCurrency, formatPercent, getChangeColor } from '../../utils/formatters';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const PortfolioHeader: React.FC = () => {
    const { portfolio } = usePortfolio();
    const isPositive = portfolio.todayChange >= 0;

    return (
        <div className="bg-white px-4 pt-6 pb-4">
            <div className="mb-4">
                <h2 className="text-3xl font-bold text-gray-900">
                    {formatCurrency(portfolio.totalValue)}
                </h2>
                <div className="flex items-center mt-1 space-x-2">
                    <span className={`text-sm font-medium ${getChangeColor(portfolio.todayChange)}`}>
                        {isPositive ? '+' : ''}{formatCurrency(portfolio.todayChange)}
                    </span>
                    <span className={`text-sm ${getChangeColor(portfolio.todayChange)}`}>
                        ({formatPercent(portfolio.todayChangePercent, 2, true)})
                    </span>
                </div>
            </div>

            <div className="h-32 -mx-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={portfolio.chartData}>
                        <YAxis hide domain={['dataMin', 'dataMax']} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={isPositive ? '#00D4AA' : '#FF5A5F'}
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={true}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div>
                    <p className="text-xs text-gray-500">Cash</p>
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(portfolio.cash)}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">Buying Power</p>
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(portfolio.buyingPower)}</p>
                </div>
            </div>
        </div>
    );
};

export default PortfolioHeader;
