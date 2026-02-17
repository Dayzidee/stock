import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import TabSelector from '../components/common/TabSelector';
import DateSelector from '../components/options/DateSelector';
import OptionCard from '../components/options/OptionCard';
import type { TabType, Option } from '../types';
import { mockAMDOptions, mockSPYOptions, mockAMDPutOptions } from '../data/mockData';

const OptionsPage: React.FC = () => {
    const { symbol } = useParams<{ symbol: string }>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>('call');
    const [selectedDate, setSelectedDate] = useState('2026-01-31');

    const dates = ['2026-01-17', '2026-01-24', '2026-01-31', '2026-02-07', '2026-02-14', '2026-02-21'];

    // Get options based on symbol and type
    const getOptions = (): Option[] => {
        if (symbol === 'SPY') {
            return activeTab === 'call' ? mockSPYOptions : [];
        }
        return activeTab === 'call' ? mockAMDOptions : mockAMDPutOptions;
    };

    const options = getOptions();

    return (
        <Layout showBottomNav={false}>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
                <div className="flex items-center px-4 h-14">
                    <button onClick={() => navigate(-1)} className="mr-3">
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-lg font-semibold text-gray-900">{symbol}</h1>
                        <p className="text-xs text-gray-500">Select Options</p>
                    </div>
                    <button className="text-primary text-sm font-medium">Select</button>
                </div>
            </div>

            {/* Date Selector */}
            <div className="bg-white border-b border-gray-100">
                <DateSelector
                    dates={dates}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                />
            </div>

            {/* Tab Selector */}
            <div className="bg-white p-4 border-b border-gray-100">
                <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* Options List */}
            <div className="bg-white">
                {options.map((option, index) => (
                    <OptionCard
                        key={index}
                        option={option}
                        onClick={() => navigate(`/order/${symbol}/${option.type}/${option.strike}`)}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default OptionsPage;
