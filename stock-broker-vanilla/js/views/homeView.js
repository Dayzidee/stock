// stock-broker-vanilla/js/views/homeView.js

import { mockStocks, mockCryptos, mockPortfolio } from '../data.js';
import { formatCurrency, formatPercent, getChangeBgColor, getChangeColor } from '../utils.js';
import { router } from '../router.js';

// Function to create a MiniChart (placeholder for now, actual chart library integration would go here)
const createMiniChart = (chartData, color) => {
    // In a real scenario, you'd use Chart.js or similar to render a small chart here.
    // For this migration, we'll just return a placeholder div or a simplified representation.
    return `
        <div class="w-20 h-10 flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-200 rounded-md">
            Chart
        </div>
    `;
};

// Function to create a StockCard HTML element
const createStockCard = (stock) => {
    const isPositive = stock.change >= 0;
    const chartColor = isPositive ? '#00D4AA' : '#FF5A5F';
    const changeBgColorClass = getChangeBgColor(stock.change);
    const changeTextColorClass = getChangeColor(stock.change);

    return `
        <div class="p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
             data-symbol="${stock.symbol}">
            <div class="flex items-center justify-between mb-2">
                <div class="flex-1">
                    <h3 class="font-semibold text-gray-900">${stock.symbol}</h3>
                    <p class="text-xs text-gray-500 truncate">${stock.shares ? `${stock.shares} shares` : stock.name}</p>
                </div>

                <div class="w-20 h-10 mx-3">
                    ${createMiniChart(stock.chartData, chartColor)}
                </div>

                <div class="text-right">
                    <p class="font-semibold text-gray-900">${formatCurrency(stock.price)}</p>
                    <div class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${changeBgColorClass}">
                        ${formatPercent(stock.changePercent, 2, true)}
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Function to render the HomePage
export const renderHomePage = () => {
    // Update Portfolio Header
    document.getElementById('portfolio-total-value').textContent = formatCurrency(mockPortfolio.totalValue);
    const todayChangeElement = document.getElementById('portfolio-today-change');
    const todayChangeText = `${formatCurrency(mockPortfolio.todayChange, 2, true)} (${formatPercent(mockPortfolio.todayChangePercent, 2, true)})`;
    todayChangeElement.textContent = todayChangeText;
    todayChangeElement.className = `text-sm font-semibold ${getChangeColor(mockPortfolio.todayChange)}`;
    document.getElementById('portfolio-buying-power').textContent = formatCurrency(mockPortfolio.buyingPower);
    document.getElementById('portfolio-cash').textContent = formatCurrency(mockPortfolio.cash);

    // Render Stocks
    const stocksList = document.getElementById('stocks-list');
    if (stocksList) {
        stocksList.innerHTML = mockStocks.map(createStockCard).join('');
        stocksList.querySelectorAll('[data-symbol]').forEach(card => {
            card.addEventListener('click', () => {
                // When stock card is clicked, navigate to stock detail page
                // This route will need to be defined in router.js later
                router.navigate('stockDetail', { symbol: card.dataset.symbol });
            });
        });
    }

    // Render Cryptos
    const cryptosList = document.getElementById('cryptos-list');
    if (cryptosList) {
        cryptosList.innerHTML = mockCryptos.map(createStockCard).join('');
        cryptosList.querySelectorAll('[data-symbol]').forEach(card => {
            card.addEventListener('click', () => {
                // When crypto card is clicked, navigate to crypto detail page
                // This route will need to be defined in router.js later
                router.navigate('cryptoDetail', { symbol: card.dataset.symbol });
            });
        });
    }

    // Initialize Lucide icons after content is loaded
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
};

// This will be called by the router when the home page is navigated to
document.addEventListener('DOMContentLoaded', renderHomePage);
