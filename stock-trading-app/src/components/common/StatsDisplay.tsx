import React from 'react';
import type { StockStats as StockStatsType } from '../../types';
import { formatCurrency, formatNumber, formatPercent } from '../../utils/formatters';

interface StatsDisplayProps {
    stats: StockStatsType;
    showOptionsStats?: boolean;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, showOptionsStats = false }) => {
    const basicStats = [
        { label: 'BID', value: `${formatCurrency(stats.bid)} x ${stats.bidSize}` },
        { label: 'ASK', value: `${formatCurrency(stats.ask)} x ${stats.askSize}` },
        { label: 'MARK', value: formatCurrency(stats.mark) },
        { label: 'PREV CLOSE', value: formatCurrency(stats.prevClose) },
        { label: 'HIGH', value: formatCurrency(stats.high) },
        { label: 'LOW', value: formatCurrency(stats.low) },
        { label: 'VOLUME', value: formatNumber(stats.volume) },
    ];

    const optionsStats = showOptionsStats ? [
        { label: 'OPEN INTEREST', value: formatNumber(stats.openInterest || 0) },
        { label: 'IMPLIED VOLATILITY', value: formatPercent(stats.impliedVolatility || 0, 2, false) },
        { label: 'CHANCE OF PROFIT', value: formatPercent(stats.chanceOfProfit || 0, 2, false) },
    ] : [];

    const allStats = [...basicStats, ...optionsStats];

    return (
        <div className="bg-white rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stats</h3>
            <div className="grid grid-cols-2 gap-4">
                {allStats.map((item) => (
                    <div key={item.label}>
                        <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                        <p className="text-base font-semibold text-gray-900 mt-1">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsDisplay;
