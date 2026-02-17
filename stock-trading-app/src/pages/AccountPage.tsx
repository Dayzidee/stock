import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { ChevronRightIcon } from 'lucide-react';
import BottomSheet from '../components/common/BottomSheet';
import { useNavigate } from 'react-router-dom';

const AccountPage: React.FC = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [faceId, setFaceId] = useState(true);
  const navigate = useNavigate();

  // Mock Data for demonstration
  const userName = "John Doe";
  const userEmail = "john.doe@example.com";
  const isGoldMember = true;
  const totalMarketValue = 152345.67;
  const cashUnderManagement = 1234.50;
  const optionsLevel = 3;

  const handleLinkedAccountsClick = () => {
    setIsBottomSheetOpen(true);
  };

  return (
    <Layout>
      <div className="p-4 bg-white min-h-screen text-gray-900">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Account</h1>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold">{userName}</p>
              <p className="text-gray-600 text-sm">{userEmail}</p>
            </div>
            {isGoldMember && (
              <span className="bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                Gold
              </span>
            )}
          </div>
        </div>

        {/* Financial Snapshot */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
          <div className="flex justify-between items-center mb-1">
            <p className="text-gray-600">Total Market Value</p>
            <p className="text-2xl font-bold">${totalMarketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Cash Under Management</p>
            <p className="text-2xl font-bold">${cashUnderManagement.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Functional Sections */}
        <div className="space-y-6">
          {/* Group 1: Transfers and Banking */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-3">BANKING</h3>
            <div className="bg-gray-100 rounded-lg">
              <AccountSettingRow label="Transfer to Robinhood" onClick={() => navigate('/account/transfer')} />
              <AccountSettingRow label="Withdrawal" onClick={() => navigate('/account/withdraw')} />
              <AccountSettingRow label="Linked Accounts" onClick={handleLinkedAccountsClick} />
            </div>
          </div>

          {/* Group 2: Investing Settings */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-3">INVESTING</h3>
            <div className="bg-gray-100 rounded-lg">
              <AccountSettingRow label="Options Trading" detail={`Level ${optionsLevel}`} />
              <AccountSettingRow label="Dividend Reinvestment" />
            </div>
          </div>

          {/* Group 3: Documents and Taxes */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-3">DOCUMENTS & TAXES</h3>
            <div className="bg-gray-100 rounded-lg">
              <AccountSettingRow label="Tax Documents" />
              <AccountSettingRow label="Monthly Statements" />
            </div>
          </div>

          {/* Group 4: App Settings */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-3">APP SETTINGS</h3>
            <div className="bg-gray-100 rounded-lg">
              <AccountSettingToggle label="Touch ID/Face ID" value={faceId} onToggle={setFaceId} subLabel="Keep your account safe with biometric authentication." />
            </div>
          </div>

          {/* Log Out */}
          <button className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold mt-6">
            Log Out
          </button>
        </div>
      </div>

      {/* Linked Accounts Bottom Sheet */}
      <BottomSheet isOpen={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} title="Linked Accounts">
        <div className="p-4 text-gray-900">
          <p className="mb-2">Your linked bank accounts:</p>
          <ul className="list-disc pl-5">
            <li>Bank of America (**** 1234)</li>
            <li>Wells Fargo (**** 5678)</li>
          </ul>
        </div>
      </BottomSheet>
    </Layout>
  );
};

interface AccountSettingRowProps {
  label: string;
  detail?: string;
  onClick?: () => void;
}

const AccountSettingRow: React.FC<AccountSettingRowProps> = ({ label, detail, onClick }) => (
  <div
    className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 cursor-pointer"
    onClick={onClick}
  >
    <div>
      <p className="text-gray-900 text-lg">{label}</p>
      {detail && <p className="text-gray-600 text-sm mt-1">{detail}</p>}
    </div>
    <ChevronRightIcon size={20} className="text-gray-500" />
  </div>
);

interface AccountSettingToggleProps {
  label: string;
  subLabel: string;
  value: boolean;
  onToggle: (value: boolean) => void;
}

const AccountSettingToggle: React.FC<AccountSettingToggleProps> = ({ label, subLabel, value, onToggle }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
    <div>
      <p className="text-gray-900 text-lg">{label}</p>
      <p className="text-gray-600 text-sm mt-1">{subLabel}</p>
    </div>
    <div
      className={
        `relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
          value ? 'bg-green-600' : 'bg-gray-300'
        }`
      }
      onClick={() => onToggle(!value)}
    >
      <span
        className={
          `inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`
        }
      />
    </div>
  </div>
);

export default AccountPage;
