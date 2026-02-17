import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../../types';

interface MiniChartProps {
    data: ChartDataPoint[];
    color: string;
    height?: number;
}

const MiniChart: React.FC<MiniChartProps> = ({ data, color, height = 40 }) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={1.5}
                    dot={false}
                    isAnimationActive={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default MiniChart;
