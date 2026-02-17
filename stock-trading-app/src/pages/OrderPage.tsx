import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Settings, CheckCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import NumericKeypad from '../components/trading/NumericKeypad';
import { useOrders } from '../context/OrderContext';
import { formatCurrency } from '../utils/formatters';
import { calculateMaxCost, calculateMinCredit } from '../utils/calculations';

const OrderPage: React.FC = () => {
    const { symbol, type, strike } = useParams<{ symbol: string; type: string; strike: string }>();
    const navigate = useNavigate();
    const { placeOrder } = useOrders();

    const [quantity, setQuantity] = useState('1');
    const [limitPrice] = useState('3.90');
    const [showReview, setShowReview] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const isBuy = true; // This would come from navigation state
    const isCall = type === 'call';
    const strikePrice = parseFloat(strike || '0');
    const price = parseFloat(limitPrice);
    const qty = parseInt(quantity) || 0;

    const maxCost = isBuy ? calculateMaxCost(price, qty) : 0;
    const minCredit = !isBuy ? calculateMinCredit(price, qty) : 0;

    const handleSubmit = () => {
        // Place the order
        placeOrder({
            symbol: symbol || '',
            type: 'option',
            action: isBuy ? 'buy' : 'sell',
            optionType: isCall ? 'call' : 'put',
            strike: strikePrice,
            expiration: '2026-02-21',
            quantity: qty,
            limitPrice: price,
            maxCost: isBuy ? maxCost : minCredit,
        });

        // Show success modal
        setShowSuccessModal(true);
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/'); // Navigate to home
    };

    return (
        <Layout showBottomNav={false}>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
                <div className="flex items-center justify-between px-4 h-14">
                    <button onClick={() => navigate(-1)}>
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <h1 className="text-base font-semibold text-gray-900">
                        {isBuy ? 'Buy' : 'Sell'} {symbol} ${strike} {isCall ? 'Call' : 'Put'} 2/21
                    </h1>
                    <button>
                        <Settings className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {!showReview ? (
                <>
                    {/* Order Entry */}
                    <div className="bg-white p-6">
                        <div className="mb-6">
                            <label className="text-sm text-gray-500 font-medium">Contracts</label>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-400">×100 shares</span>
                                <span className="text-4xl font-light text-gray-900">{quantity || '0'}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="text-sm text-gray-500 font-medium">Limit Price</label>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-primary">Bid ${(price - 0.02).toFixed(2)} · Ask ${(price + 0.02).toFixed(2)}</span>
                                <span className="text-2xl font-semibold text-gray-900">${limitPrice}</span>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-gray-500 font-medium">{isBuy ? 'Max Cost' : 'Min Credit'}</label>
                            <div className="text-right mt-2">
                                <span className="text-2xl font-semibold text-gray-900">
                                    {formatCurrency(isBuy ? maxCost : minCredit)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Numeric Keypad */}
                    <NumericKeypad
                        value={quantity}
                        onChange={setQuantity}
                        maxValue={999}
                    />

                    {/* Review Button */}
                    <div className="p-4">
                        <button
                            onClick={() => setShowReview(true)}
                            className="bg-green-600 text-white w-full py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
                            disabled={qty === 0}
                        >
                            Review
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* Order Review */}
                    <div className="bg-white p-6">
                        <div className="mb-6">
                            <label className="text-sm text-gray-500 font-medium">Contracts</label>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-400">×100 shares</span>
                                <span className="text-2xl font-semibold text-gray-900">{quantity}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="text-sm text-gray-500 font-medium">Limit Price</label>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-primary">Bid ${(price - 0.02).toFixed(2)} · Ask ${(price + 0.02).toFixed(2)}</span>
                                <span className="text-2xl font-semibold text-gray-900">${limitPrice}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="text-sm text-gray-500 font-medium">{isBuy ? 'Max Cost' : 'Min Credit'}</label>
                            <div className="text-right mt-2">
                                <span className="text-2xl font-semibold text-gray-900">
                                    {formatCurrency(isBuy ? maxCost : minCredit)}
                                </span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 mt-6">
                            <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                You're paying <span className="font-bold text-gray-900">{formatCurrency(maxCost)}</span> for the right to buy <span className="font-bold text-gray-900">{qty * 100}</span> shares of <span className="font-bold text-gray-900">{symbol}</span> for <span className="font-bold text-gray-900">${strike}</span> per share by February 21st.
                                If <span className="font-bold text-gray-900">{symbol}</span> shares aren't <span className="font-bold text-gray-900">${strike}</span> or higher on February 21st, this option will expire worthless.
                            </p>
                        </div>
                    </div>

                    {/* Tap to Submit */}
                    <div className="p-4">
                        <button
                            onClick={handleSubmit}
                            className="bg-green-600 text-white w-full py-4 rounded-full text-xl font-bold hover:bg-green-700 transition-all active:scale-95 shadow-lg"
                        >
                            Tap to Submit
                        </button>
                    </div>
                </>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={handleCloseModal}></div>
                    <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-green-100 p-4 rounded-full mb-6">
                                <CheckCircle className="w-16 h-16 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Placed!</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Your order to buy <span className="font-bold">{qty}</span> {symbol} ${strike} {isCall ? 'Call' : 'Put'} option contracts has been successfully submitted.
                            </p>
                            <button
                                onClick={handleCloseModal}
                                className="w-full bg-green-600 text-white py-4 rounded-2xl text-xl font-bold hover:bg-green-700 transition-all shadow-md active:scale-95"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default OrderPage;
