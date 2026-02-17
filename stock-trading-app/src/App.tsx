import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { OrderProvider } from './context/OrderContext';
import HomePage from './pages/HomePage';
import StockDetailPage from './pages/StockDetailPage';
import OptionsPage from './pages/OptionsPage';
import OrderPage from './pages/OrderPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AccountPage from './pages/AccountPage';
import TransferPage from './pages/TransferPage';
import WithdrawPage from './pages/WithdrawPage';

function App() {
  return (
    <PortfolioProvider>
      <OrderProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stock/:symbol" element={<StockDetailPage />} />
            <Route path="/options/:symbol" element={<OptionsPage />} />
            <Route path="/order/:symbol/:type/:strike" element={<OrderPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />

            {/* Account related routes */}
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/transfer" element={<TransferPage />} />
            <Route path="/account/withdraw" element={<WithdrawPage />} />

            {/* Placeholder routes for bottom nav */}
            <Route path="/calendar" element={<div className="p-4">Calendar Page</div>} />
            <Route path="/search" element={<div className="p-4">Search Page</div>} />
            <Route path="/messages" element={<div className="p-4">Messages Page</div>} />
          </Routes>
        </Router>
      </OrderProvider>
    </PortfolioProvider>
  );
}

export default App;
