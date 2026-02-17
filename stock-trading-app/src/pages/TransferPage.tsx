import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TransferPage: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromAccount, setFromAccount] = useState<string>('Bank of America (**** 1234)');
  const [toAccount, setToAccount] = useState<string>('Robinhood Brokerage');
  const navigate = useNavigate();

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement transfer logic here
    console.log(`Transferring $${amount} from ${fromAccount} to ${toAccount}`);
    alert(`Transfer of $${amount} initiated!`);
    navigate(-1); // Go back to the previous page
  };

  return (
    <Layout>
      <div className="p-4 bg-white min-h-screen text-gray-900">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="text-green-600 mr-4">
            <ArrowLeftIcon size={24} />
          </button>
          <h1 className="text-3xl font-bold">Transfer to Robinhood</h1>
        </div>

        <form onSubmit={handleTransfer} className="space-y-6">
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
            <label htmlFor="fromAccount" className="block text-lg font-semibold mb-2">From</label>
            <select
              id="fromAccount"
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option>Bank of America (**** 1234)</option>
              <option>Wells Fargo (**** 5678)</option>
            </select>
          </div>

          <div>
            <label htmlFor="toAccount" className="block text-lg font-semibold mb-2">To</label>
            <input
              type="text"
              id="toAccount"
              value={toAccount}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg text-lg bg-gray-100 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Initiate Transfer
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default TransferPage;
