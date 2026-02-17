import { mockPortfolio, mockStocks, mockAMDOptions, mockSPYOptions } from './data.js';
import * as utils from './utils.js';

// Application State
const state = {
    portfolio: JSON.parse(JSON.stringify(mockPortfolio)),
    stocks: JSON.parse(JSON.stringify(mockStocks)),
    currentView: 'home',
    params: {},
    inputQuantity: '1',
    limitPrice: '3.90',
};

// Global Store Listeners
const listeners = [];
const subscribe = (fn) => listeners.push(fn);
const notify = () => listeners.forEach(fn => fn(state));

// Simple Router
export const router = {
    navigate: (view, params = {}) => {
        state.currentView = view;
        state.params = params;
        if (view === 'order') {
            state.inputQuantity = '1'; // Reset qty when entering order page
        }
        render();
        window.scrollTo(0, 0);
        updateNavHighlight();
    }
};
window.router = router;

// View Renderers
const renderers = {
    home: () => {
        const p = state.portfolio;
        const isPositive = p.todayChange >= 0;

        let stocksHtml = state.stocks.map(stock => `
            <div onclick="router.navigate('stock', { symbol: '${stock.symbol}' })" class="flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50 transition-colors cursor-pointer">
                <div class="flex-1">
                    <h3 class="font-bold text-gray-900">${stock.symbol}</h3>
                    <p class="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">${stock.shares ? stock.shares + ' shares' : stock.name}</p>
                </div>
                <div class="w-16 h-8 mx-4">
                    <canvas id="mini-chart-${stock.symbol}"></canvas>
                </div>
                <div class="text-right">
                    <p class="font-bold text-gray-900">${utils.formatCurrency(stock.price)}</p>
                    <div class="inline-block px-2 py-0.5 rounded text-[10px] font-black text-white ${utils.getChangeBgColor(stock.change)}">
                        ${utils.formatPercent(stock.changePercent, 2, true)}
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <div class="animate-fade-in pb-10">
                <header class="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-5 py-4 flex justify-between items-center">
                    <h1 class="text-xl font-black tracking-tight text-gray-900">Portfolio</h1>
                    <button class="bg-gray-100 p-2 rounded-full active:scale-95 transition-transform">
                        <i data-lucide="settings" class="w-5 h-5 text-gray-700"></i>
                    </button>
                </header>

                <div class="px-5 pt-6 pb-4 bg-white">
                    <h2 class="text-4xl font-black text-gray-900 tracking-tightest leading-none">${utils.formatCurrency(p.totalValue)}</h2>
                    <div class="flex items-center space-x-2 mt-2">
                        <span class="text-sm font-black ${utils.getChangeColor(p.todayChange)}">
                            ${isPositive ? '+' : ''}${utils.formatCurrency(p.todayChange)}
                        </span>
                        <span class="text-sm text-gray-400 font-bold uppercase tracking-widest text-[10px]">(${utils.formatPercent(p.todayChangePercent, 2, true)}) Today</span>
                    </div>
                    
                    <div class="h-48 mt-8 -mx-5">
                        <canvas id="portfolio-main-chart"></canvas>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-gray-50">
                        <div>
                            <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Cash Balance</p>
                            <p class="text-lg font-black text-gray-900 mt-1">${utils.formatCurrency(p.cash)}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Buying Power</p>
                            <p class="text-lg font-black text-gray-900 mt-1">${utils.formatCurrency(p.buyingPower)}</p>
                        </div>
                    </div>
                </div>

                <div class="mt-4">
                    <div class="px-5 py-3 border-b border-gray-50 bg-gray-50/50">
                        <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Your Holdings</h3>
                    </div>
                    ${stocksHtml}
                </div>
            </div>
        `;
    },

    stock: () => {
        const symbol = state.params.symbol;
        const stock = state.stocks.find(s => s.symbol === symbol);
        if (!stock) return `<div class="p-8 text-center">Stock not found</div>`;

        return `
            <div class="animate-slide-up flex flex-col h-full bg-white">
                <header class="sticky top-0 z-40 bg-white px-4 py-4 flex justify-between items-center">
                    <button onclick="router.navigate('home')" class="p-2 -ml-2 active:scale-90 transition-transform">
                        <i data-lucide="arrow-left" class="w-6 h-6 text-gray-900"></i>
                    </button>
                    <h1 class="text-lg font-black text-gray-900 uppercase tracking-tighter">${stock.symbol}</h1>
                    <button class="bg-gray-100 p-2 rounded-full active:scale-95 transition-transform">
                        <i data-lucide="more-horizontal" class="w-5 h-5 text-gray-700"></i>
                    </button>
                </header>

                <div class="flex-1 overflow-y-auto no-scrollbar pb-24">
                    <div class="px-5 pt-4">
                        <h2 class="text-4xl font-black text-gray-900 tracking-tightest leading-none">${utils.formatCurrency(stock.price)}</h2>
                        <p class="${utils.getChangeColor(stock.change)} font-black text-sm mt-3 flex items-center">
                            <i data-lucide="${stock.change >= 0 ? 'trending-up' : 'trending-down'}" class="w-4 h-4 mr-1.5"></i>
                            ${utils.formatPercent(stock.changePercent, 2, true)} (${utils.formatCurrency(stock.change)}) Today
                        </p>

                        <div class="h-64 mt-8 -mx-5">
                            <canvas id="stock-detail-chart"></canvas>
                        </div>

                        <!-- Info Cards -->
                        <div class="mt-10 grid grid-cols-2 gap-4">
                            <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                <p class="text-[9px] font-black text-gray-400 uppercase mb-1">Market Cap</p>
                                <p class="text-sm font-black text-gray-900">2.14 Trillion</p>
                            </div>
                            <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                <p class="text-[9px] font-black text-gray-400 uppercase mb-1">Volume</p>
                                <p class="text-sm font-black text-gray-900">54.2 Million</p>
                            </div>
                        </div>

                        <!-- Stats List -->
                        <div class="mt-8">
                            <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 px-1">Market Summary</h3>
                            <div class="space-y-6">
                                <div class="flex justify-between items-center border-b border-gray-50 pb-4">
                                    <span class="text-xs font-bold text-gray-400 uppercase">Open</span>
                                    <span class="text-sm font-black text-gray-900">${utils.formatCurrency(stock.price - stock.change)}</span>
                                </div>
                                <div class="flex justify-between items-center border-b border-gray-50 pb-4">
                                    <span class="text-xs font-bold text-gray-400 uppercase">Bid / Ask</span>
                                    <span class="text-sm font-black text-gray-900">${utils.formatCurrency(stock.price - 0.02)} x ${utils.formatCurrency(stock.price + 0.02)}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-xs font-bold text-gray-400 uppercase">52W High</span>
                                    <span class="text-sm font-black text-gray-900">${utils.formatCurrency(stock.price * 1.2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer Action -->
                <div class="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/95 backdrop-blur-md border-t border-gray-50 flex space-x-3 z-40 mb-[70px]">
                    <button onclick="router.navigate('options', { symbol: '${stock.symbol}' })" class="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-base shadow-xl shadow-primary/30 active:scale-[0.98] transition-all">
                        Trade Options
                    </button>
                    <button class="bg-gray-100 text-gray-900 px-6 py-4 rounded-2xl font-black text-base active:scale-[0.98] transition-all">
                        Buy
                    </button>
                </div>
            </div>
        `;
    },

    options: () => {
        const symbol = state.params.symbol;
        const options = symbol === 'AMD' ? mockAMDOptions : mockSPYOptions;

        return `
            <div class="animate-fade-in bg-white h-full flex flex-col">
                <header class="sticky top-0 z-40 bg-white px-4 py-4 flex justify-between items-center border-b border-gray-50 shadow-sm">
                    <button onclick="router.navigate('stock', { symbol: '${symbol}' })" class="p-2">
                        <i data-lucide="chevron-left" class="w-7 h-7 text-gray-900"></i>
                    </button>
                    <div class="text-center">
                        <h1 class="text-base font-black text-gray-900 tracking-tighter">${symbol} Options</h1>
                        <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Expiration Strategy</p>
                    </div>
                    <button class="bg-gray-100 p-2 rounded-full">
                        <i data-lucide="filter" class="w-5 h-5 text-gray-700"></i>
                    </button>
                </header>

                <div class="flex-1 overflow-y-auto no-scrollbar">
                    <!-- Date Tabs -->
                    <div class="flex overflow-x-auto px-5 py-6 space-x-3 no-scrollbar transition-all">
                        <button class="px-6 py-3 bg-primary text-white rounded-2xl text-xs font-black shadow-lg shadow-primary/20 whitespace-nowrap">Jan 31</button>
                        <button class="px-6 py-3 bg-gray-50 text-gray-400 rounded-2xl text-xs font-black whitespace-nowrap border border-gray-100">Feb 07</button>
                        <button class="px-6 py-3 bg-gray-50 text-gray-400 rounded-2xl text-xs font-black whitespace-nowrap border border-gray-100">Feb 14</button>
                        <button class="px-6 py-3 bg-gray-50 text-gray-400 rounded-2xl text-xs font-black whitespace-nowrap border border-gray-100">Feb 21</button>
                    </div>

                    <!-- Type Selector -->
                    <div class="px-5 mb-4">
                        <div class="flex bg-gray-100 p-1.5 rounded-2xl">
                            <button class="flex-1 py-3 text-xs font-black uppercase tracking-[0.1em] bg-white rounded-xl shadow-sm text-gray-900">Calls</button>
                            <button class="flex-1 py-3 text-xs font-black uppercase tracking-[0.1em] text-gray-400">Puts</button>
                        </div>
                    </div>

                    <!-- Options List -->
                    <div class="px-5 pb-10">
                        ${options.map(opt => `
                            <div onclick="router.navigate('order', { symbol: '${symbol}', strike: ${opt.strike}, type: '${opt.type}' })" class="group relative py-6 border-b border-gray-50 active:scale-[0.99] transition-all cursor-pointer">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <h3 class="font-black text-xl text-gray-900 tracking-tight">$${opt.strike.toFixed(1)} ${opt.type.charAt(0).toUpperCase() + opt.type.slice(1)}</h3>
                                        <div class="flex space-x-6 mt-2">
                                            <div>
                                                <p class="text-[8px] font-black text-gray-400 uppercase">Break Even</p>
                                                <p class="text-xs font-bold text-gray-700 mt-1">${utils.formatCurrency(opt.breakEven)}</p>
                                            </div>
                                            <div>
                                                <p class="text-[8px] font-black text-gray-400 uppercase">Chance of Profit</p>
                                                <p class="text-xs font-bold text-gray-700 mt-1">54.2%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <div class="px-4 py-2 bg-gray-900 text-white rounded-2xl">
                                            <p class="font-black text-sm">${utils.formatCurrency(opt.price)}</p>
                                        </div>
                                        <p class="text-[10px] font-black ${utils.getChangeColor(opt.change)} mt-2 uppercase">
                                            ${utils.formatPercent(opt.changePercent, 2, true)} Today
                                        </p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    order: () => {
        const { symbol, strike, type } = state.params;
        const qty = parseFloat(state.inputQuantity || '0');
        const total = utils.calculateMaxCost(parseFloat(state.limitPrice), qty);

        return `
            <div class="animate-slide-up h-full flex flex-col bg-white">
                <header class="sticky top-0 z-40 bg-white px-4 py-4 flex justify-between items-center">
                    <button onclick="router.navigate('options', { symbol: '${symbol}' })" class="p-2 -ml-2">
                        <i data-lucide="arrow-left" class="w-6 h-6 text-gray-900"></i>
                    </button>
                    <div class="text-center">
                        <h1 class="text-base font-black text-gray-900 tracking-tighter">Buy ${symbol}</h1>
                        <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">$${strike} ${type} · Feb 21</p>
                    </div>
                    <button class="bg-gray-100 p-2 rounded-full">
                        <i data-lucide="settings-2" class="w-5 h-5 text-gray-700"></i>
                    </button>
                </header>

                <div class="flex-1 p-6 flex flex-col pt-10">
                    <div class="space-y-12">
                        <div class="flex justify-between items-end border-b border-gray-50 pb-6">
                            <div>
                                <p class="text-xs font-black text-gray-400 uppercase tracking-widest">Contracts</p>
                                <p class="text-[10px] text-gray-300 font-bold mt-1">× 100 SHARES EACH</p>
                            </div>
                            <p class="text-5xl font-black text-gray-900 tracking-tightest leading-none">${state.inputQuantity || '0'}</p>
                        </div>
                        
                        <div class="flex justify-between items-end border-b border-gray-50 pb-6">
                            <div>
                                <p class="text-xs font-black text-gray-400 uppercase tracking-widest">Limit Price</p>
                                <p class="text-[10px] text-primary font-black mt-2 tracking-tight">BID $3.88 · ASK $3.92</p>
                            </div>
                            <p class="text-3xl font-black text-gray-900 leading-none">$${state.limitPrice}</p>
                        </div>

                        <div class="flex justify-between items-end bg-gray-50 p-6 rounded-[32px]">
                            <p class="text-xs font-black text-gray-400 uppercase tracking-widest">Max Cost</p>
                            <p class="text-3xl font-extrabold text-gray-900 leading-none">${utils.formatCurrency(total)}</p>
                        </div>
                    </div>

                    <!-- Keypad -->
                    <div class="mt-auto grid grid-cols-3 gap-y-10 gap-x-8 max-w-[300px] mx-auto pb-10 pt-10">
                        ${[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map(n => `
                            <button onclick="handleKeypad('${n}')" class="text-3xl font-black text-primary hover:text-primary/70 active:scale-90 transition-all">${n}</button>
                        `).join('')}
                        <button onclick="handleKeypad('backspace')" class="flex items-center justify-center text-primary active:scale-90 transition-all">
                            <i data-lucide="delete" class="w-8 h-8"></i>
                        </button>
                    </div>

                    <button onclick="submitOrder()" class="w-full bg-green-600 text-white py-5 rounded-[24px] font-black text-xl shadow-2xl shadow-green-200 active:scale-[0.98] transition-all mb-4">
                        Tap to Submit
                    </button>
                </div>
            </div>
        `;
    }
};

// Logic: Keypad handler
window.handleKeypad = (val) => {
    if (val === 'backspace') {
        state.inputQuantity = state.inputQuantity.length > 1 ? state.inputQuantity.slice(0, -1) : '0';
    } else {
        if (state.inputQuantity === '0') state.inputQuantity = val.toString();
        else state.inputQuantity += val.toString();
    }
    render();
};

// Logic: Order submission with Modal
window.submitOrder = () => {
    const { symbol, strike, type } = state.params;
    const modal = document.getElementById('modal-container');
    modal.innerHTML = `
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in overflow-hidden">
            <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-xl" onclick="closeModal()"></div>
            <div class="relative bg-white rounded-[40px] p-8 w-full max-w-sm text-center shadow-2xl animate-zoom-in">
                <div class="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse shadow-inner">
                    <i data-lucide="check-circle" class="w-12 h-12 text-green-600"></i>
                </div>
                <h2 class="text-3xl font-black text-gray-900 mb-3 tracking-tighter">Order Placed!</h2>
                <p class="text-gray-500 text-sm leading-relaxed mb-10 px-4">
                    Your order to buy <span class="font-bold text-gray-900">${state.inputQuantity}</span> contract(s) of <b>${symbol} $${strike} ${type}</b> has been submitted.
                </p>
                <button onclick="closeModal()" class="w-full bg-green-600 text-white py-5 rounded-[28px] font-black text-lg active:scale-95 transition-all shadow-xl shadow-green-100">
                    Done
                </button>
            </div>
        </div>
    `;
    lucide.createIcons();
};

window.closeModal = () => {
    document.getElementById('modal-container').innerHTML = '';
    router.navigate('home');
};

// Main render function
function render() {
    const container = document.getElementById('view-container');
    const renderer = renderers[state.currentView] || renderers.home;
    container.innerHTML = renderer();

    // Refresh icons
    lucide.createIcons();

    // Initialize charts
    initCharts();
}

function updateNavHighlight() {
    document.querySelectorAll('[data-nav]').forEach(btn => {
        const view = btn.getAttribute('data-nav');
        if (view === state.currentView || (state.currentView === 'stock' && view === 'home')) {
            btn.classList.add('text-primary');
            btn.classList.remove('text-gray-400');
        } else {
            btn.classList.remove('text-primary');
            btn.classList.add('text-gray-400');
        }
    });
}

function initCharts() {
    if (state.currentView === 'home') {
        renderLineChart('portfolio-main-chart', state.portfolio.chartData, '#00D4AA', true);
        state.stocks.forEach(stock => {
            renderLineChart(`mini-chart-${stock.symbol}`, stock.chartData, stock.change >= 0 ? '#00D4AA' : '#FF5A5F', false, 1.5);
        });
    }

    if (state.currentView === 'stock') {
        const stock = state.stocks.find(s => s.symbol === state.params.symbol);
        if (stock) {
            renderLineChart('stock-detail-chart', stock.chartData, stock.change >= 0 ? '#00D4AA' : '#FF5A5F', false, 3);
        }
    }
}

function renderLineChart(canvasId, data, color, fill = false, lineWidth = 2) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    new Chart(canvas, {
        type: 'line',
        data: {
            labels: data.map(() => ''),
            datasets: [{
                data: data.map(d => d.value),
                borderColor: color,
                borderWidth: lineWidth,
                pointRadius: 0,
                tension: 0.45,
                fill: fill,
                backgroundColor: fill ? (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, `${color}20`);
                    gradient.addColorStop(1, `${color}00`);
                    return gradient;
                } : 'transparent'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: { x: { display: false }, y: { display: false } }
        }
    });
}

// Initial Render
render();
