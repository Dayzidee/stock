import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';

const OrderConfirmationPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Layout showBottomNav={false}>
            <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
                <div className="text-center text-white px-6">
                    <CheckCircle className="w-20 h-20 mx-auto mb-6" />
                    <h1 className="text-2xl font-bold mb-2">SPY $329 Call 2/21 Order Placed</h1>

                    <div className="bg-white bg-opacity-20 rounded-lg p-6 mt-8 text-left">
                        <div className="flex justify-between mb-4">
                            <span className="text-sm opacity-90">0 of 1</span>
                            <span className="text-sm font-semibold">$390.00</span>
                        </div>
                        <div className="text-xs opacity-75 mb-1">CONTRACTS PURCHASED</div>
                        <div className="text-xs opacity-75 mb-4">ESTIMATED COST</div>

                        <div className="flex justify-between mb-2">
                            <span className="text-sm opacity-90">CURRENT POSITION</span>
                            <span className="text-sm font-semibold">0 Contracts</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm opacity-90">COMMISSIONS</span>
                            <span className="text-sm font-semibold">$0.00</span>
                        </div>
                    </div>

                    <div className="mt-8 space-y-3">
                        <button className="w-full bg-white bg-opacity-20 text-white font-semibold py-3 px-6 rounded-full hover:bg-opacity-30 transition-all">
                            Replace Order
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-white text-primary font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-all"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderConfirmationPage;
