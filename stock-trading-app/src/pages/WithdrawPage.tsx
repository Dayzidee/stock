import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WithdrawPage: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromAccount] = useState<string>('Robinhood Brokerage');
  const [toAccount, setToAccount] = useState<string>('Bank of America (**** 1234)');
  const navigate = useNavigate();

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement withdrawal logic here
    console.log(`Withdrawing $${amount} from ${fromAccount} to ${toAccount}`);
    alert(`Withdrawal of $${amount} initiated!`);
    navigate(-1); // Go back to the previous page
  };

  return (
    <Layout>
      <div className="p-4 bg-white min-h-screen text-gray-900">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="text-green-600 mr-4">
            <ArrowLeftIcon size={24} />
          </button>
          <h1 className="text-3xl font-bold">Withdraw Funds</h1>
        </div>

        <form onSubmit={handleWithdraw} className="space-y-6">
          <div>
            <label htmlFor="fromAccount" className="block text-lg font-semibold mb-2">From</label>
            <input
              type="text"
              id="fromAccount"
              value={fromAccount}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg text-lg bg-gray-100 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-lg font-semibold mb-2">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full p-3 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label htmlFor="toAccount" className="block text-lg font-semibold mb-2">To</label>
            <select
              id="toAccount"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option>Bank of America (**** 1234)</option>
              <option>Wells Fargo (**** 5678)</option>
            </select>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              Withdrawals to your bank typically take 1-3 business days. 
              Ensure you have enough buying power to cover the withdrawal.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Withdraw Funds
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default WithdrawPage;
