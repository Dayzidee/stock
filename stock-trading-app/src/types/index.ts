// Stock and Market Data Types
export interface Stock {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    shares?: number;
    chartData: ChartDataPoint[];
}

export interface ChartDataPoint {
    time: string;
    value: number;
}

// Options Types
export interface Option {
    symbol: string;
    strike: number;
    type: 'call' | 'put';
    expiration: string;
    price: number;
    bid: number;
    ask: number;
    breakEven: number;
    breakEvenPercent: number;
    change: number;
    changePercent: number;
    volume: number;
    openInterest: number;
    impliedVolatility: number;
    greeks: Greeks;
}

export interface Greeks {
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
}

// Portfolio Types
export interface Position {
    id: string;
    symbol: string;
    type: 'stock' | 'option' | 'crypto';
    quantity: number;
    avgCost: number;
    currentPrice: number;
    totalValue: number;
    totalReturn: number;
    totalReturnPercent: number;
    todayReturn: number;
    todayReturnPercent: number;
    chartData: ChartDataPoint[];
}

export interface Portfolio {
    totalValue: number;
    cash: number;
    buyingPower: number;
    todayChange: number;
    todayChangePercent: number;
    totalReturn: number;
    totalReturnPercent: number;
    positions: Position[];
    chartData: ChartDataPoint[];
}

// Order Types
export interface Order {
    id: string;
    symbol: string;
    type: 'stock' | 'option';
    action: 'buy' | 'sell';
    optionType?: 'call' | 'put';
    strike?: number;
    expiration?: string;
    quantity: number;
    limitPrice: number;
    maxCost: number;
    status: 'pending' | 'filled' | 'cancelled' | 'rejected';
    createdAt: Date;
    filledAt?: Date;
}

// Stats Types
export interface StockStats {
    bid: number;
    bidSize: number;
    ask: number;
    askSize: number;
    mark: number;
    prevClose: number;
    high: number;
    low: number;
    volume: number;
    openInterest?: number;
    impliedVolatility?: number;
    chanceOfProfit?: number;
}

// UI Types
export type TimeFrame = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';
export type TabType = 'buy' | 'sell' | 'call' | 'put';
export type DisplayOption = 'lastPrice' | 'percentChange' | 'yourEquity' | 'todayReturn' | 'totalReturn';
