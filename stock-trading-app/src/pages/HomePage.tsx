import React from 'react';
import Layout from '../components/layout/Layout';
import Header from '../components/layout/Header';
import PortfolioHeader from '../components/portfolio/PortfolioHeader';
import StockCard from '../components/stock/StockCard';
import { mockStocks, mockCryptos } from '../data/mockData';

const HomePage: React.FC = () => {

    return (
        <Layout>
            <Header title="Portfolio" />

            <PortfolioHeader />

            {/* Stocks Section */}
            <div className="mt-4">
                <h2 className="px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-50">Stocks</h2>
                <div className="bg-white">
                    {mockStocks.map((stock) => (
                        <StockCard key={stock.symbol} stock={stock} />
                    ))}
                </div>
            </div>

            {/* Options Section */}
            <div className="mt-4">
                <h2 className="px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-50">Options</h2>
                <div className="bg-white p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-gray-900">SPY $329 Call</p>
                            <p className="text-xs text-gray-500">2/21 Exp · 1 Buy</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-semibold text-success">+$0.0000</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cryptocurrencies Section */}
            <div className="mt-4 mb-4">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50">
                    <h2 className="text-sm font-semibold text-gray-900">Cryptocurrencies</h2>
                    <button className="text-xs text-primary font-medium">Show All</button>
                </div>
                <div className="bg-white">
                    {mockCryptos.map((crypto) => (
                        <StockCard key={crypto.symbol} stock={crypto} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
