import type { Option } from '../types';

// Calculate break-even price for an option
export const calculateBreakEven = (strike: number, premium: number, type: 'call' | 'put'): number => {
    if (type === 'call') {
        return strike + premium;
    } else {
        return strike - premium;
    }
};

// Calculate break-even percentage
export const calculateBreakEvenPercent = (currentPrice: number, breakEven: number): number => {
    return ((breakEven - currentPrice) / currentPrice) * 100;
};

// Calculate option profit/loss
export const calculateOptionPL = (
    option: Option,
    quantity: number,
    entryPrice: number
): { profit: number; profitPercent: number } => {
    const profit = (option.price - entryPrice) * quantity * 100; // Options are in contracts of 100
    const profitPercent = ((option.price - entryPrice) / entryPrice) * 100;
    return { profit, profitPercent };
};

// Calculate max cost for buying options
export const calculateMaxCost = (price: number, quantity: number): number => {
    return price * quantity * 100; // Options are in contracts of 100
};

// Calculate min credit for selling options
export const calculateMinCredit = (price: number, quantity: number): number => {
    return price * quantity * 100;
};

// Calculate portfolio total value
export const calculatePortfolioValue = (positions: any[]): number => {
    return positions.reduce((total, position) => total + position.totalValue, 0);
};

// Calculate portfolio total return
export const calculatePortfolioReturn = (positions: any[], cash: number, initialValue: number): {
    totalReturn: number;
    totalReturnPercent: number;
} => {
    const currentValue = calculatePortfolioValue(positions) + cash;
    const totalReturn = currentValue - initialValue;
    const totalReturnPercent = (totalReturn / initialValue) * 100;
    return { totalReturn, totalReturnPercent };
};

// Calculate today's return
export const calculateTodayReturn = (positions: any[]): {
    todayReturn: number;
    todayReturnPercent: number;
} => {
    const todayReturn = positions.reduce((total, position) => total + position.todayReturn, 0);
    const totalValue = calculatePortfolioValue(positions);
    const todayReturnPercent = totalValue > 0 ? (todayReturn / totalValue) * 100 : 0;
    return { todayReturn, todayReturnPercent };
};

// Calculate position value
export const calculatePositionValue = (quantity: number, currentPrice: number): number => {
    return quantity * currentPrice;
};

// Calculate position return
export const calculatePositionReturn = (
    quantity: number,
    avgCost: number,
    currentPrice: number
): { totalReturn: number; totalReturnPercent: number } => {
    const totalReturn = (currentPrice - avgCost) * quantity;
    const totalReturnPercent = ((currentPrice - avgCost) / avgCost) * 100;
    return { totalReturn, totalReturnPercent };
};

// Chance of profit calculation (simplified)
export const calculateChanceOfProfit = (delta: number, type: 'call' | 'put'): number => {
    // Simplified calculation based on delta
    // For calls: delta represents approximate probability of being ITM
    // For puts: 1 - abs(delta) represents approximate probability of being ITM
    if (type === 'call') {
        return Math.abs(delta) * 100;
    } else {
        return (1 - Math.abs(delta)) * 100;
    }
};
