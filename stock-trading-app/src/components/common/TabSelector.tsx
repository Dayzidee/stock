import React from 'react';
import type { TabType } from '../../types';

interface TabSelectorProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, onTabChange }) => {
    const tabs: TabType[] = ['buy', 'sell', 'call', 'put'];

    return (
        <div className="flex bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === tab
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default TabSelector;
