import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StatsDisplay from '../components/common/StatsDisplay';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { mockStocks } from '../data/mockData';
import { formatCurrency, formatPercent, getChangeColor } from '../utils/formatters';
import type { TimeFrame } from '../types';

const StockDetailPage: React.FC = () => {
    const { symbol } = useParams<{ symbol: string }>();
    const navigate = useNavigate();
    const [timeframe, setTimeframe] = useState<TimeFrame>('1D');

    const stock = mockStocks.find(s => s.symbol === symbol);
    if (!stock) return <div>Stock not found</div>;

    const timeframes: TimeFrame[] = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];
    const isPositive = stock.change >= 0;

    // Mock stats
    const stats = {
        bid: stock.price - 0.01,
        bidSize: 507,
        ask: stock.price + 0.01,
        askSize: 127,
        mark: stock.price,
        prevClose: stock.price - stock.change,
        high: stock.price + 2.5,
        low: stock.price - 1.8,
        volume: 4408,
    };

    return (
        <Layout showBottomNav={false}>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
                <div className="flex items-center justify-between px-4 h-14">
                    <button onClick={() => navigate(-1)}>
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900">{symbol}</h1>
                    <button className="text-primary text-sm font-medium">
                        View {symbol}
                    </button>
                </div>
            </div>

            {/* Price Info */}
            <div className="bg-white px-4 pt-4">
                <h2 className="text-3xl font-bold text-gray-900">{stock.name}</h2>
                <div className="flex items-center mt-2 space-x-2">
                    <span className="text-2xl font-semibold text-gray-900">
                        {formatCurrency(stock.price)}
                    </span>
                    <span className={`text-sm font-medium ${getChangeColor(stock.change)}`}>
                        {isPositive ? '+' : ''}{formatCurrency(stock.change)} ({formatPercent(stock.changePercent, 2, true)})
                    </span>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white px-4 pb-4">
                <div className="h-48 -mx-4 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stock.chartData}>
                            <YAxis hide domain={['dataMin', 'dataMax']} />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={isPositive ? '#00D4AA' : '#FF5A5F'}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Timeframe Selector */}
                <div className="flex justify-between mt-4">
                    {timeframes.map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={`px-3 py-1 rounded text-sm font-medium ${timeframe === tf
                                ? 'bg-danger text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </div>

            {/* Trade Button */}
            <div className="bg-white px-4 py-4 border-t border-gray-100">
                <button
                    onClick={() => navigate(`/options/${symbol}`)}
                    className="btn-primary w-full"
                >
                    Trade
                </button>
            </div>

            {/* Stats */}
            <div className="mt-4 px-4">
                <StatsDisplay stats={stats} />
            </div>

            {/* Your Position */}
            <div className="mt-4 px-4 mb-4">
                <div className="bg-white rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Position</h3>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-xs text-gray-500 font-medium">SPY SHARE PRICE</p>
                            <p className="text-base font-semibold text-gray-900 mt-1">{formatCurrency(stock.price)}</p>
                        </div>
                        <div className="text-right">
                            <button className="btn-danger">Trade</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default StockDetailPage;
