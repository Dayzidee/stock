import React from 'react';
import type { Greeks as GreeksType } from '../../types';

interface GreeksDisplayProps {
    greeks: GreeksType;
}

const GreeksDisplay: React.FC<GreeksDisplayProps> = ({ greeks }) => {
    const greekItems = [
        { label: 'DELTA', value: greeks.delta },
        { label: 'GAMMA', value: greeks.gamma },
        { label: 'THETA', value: greeks.theta },
        { label: 'VEGA', value: greeks.vega },
        { label: 'RHO', value: greeks.rho },
    ];

    return (
        <div className="bg-white rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">The Greeks</h3>
            <div className="grid grid-cols-2 gap-4">
                {greekItems.map((item) => (
                    <div key={item.label}>
                        <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                        <p className="text-base font-semibold text-gray-900 mt-1">
                            {item.value.toFixed(4)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GreeksDisplay;
