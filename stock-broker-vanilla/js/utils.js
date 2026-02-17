// Currency formatting
export const formatCurrency = (value, decimals = 2) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
};

// Percentage formatting
export const formatPercent = (value, decimals = 2, includeSign = true) => {
    const sign = includeSign && value > 0 ? '+' : '';
    return `${sign}${value.toFixed(decimals)}%`;
};

// Number abbreviation (1000 -> 1K, 1000000 -> 1M)
export const formatNumber = (value) => {
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toFixed(0);
};

// Date formatting
export const formatDate = (date) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
    }).format(d);
};

export const formatFullDate = (date) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(d);
};

// Format expiration date (2026-02-21 -> FEB 21)
export const formatExpiration = (date) => {
    const d = new Date(date);
    const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = d.getDate();
    return `${month} ${day}`;
};

// Get color class based on value
export const getChangeColor = (value) => {
    if (value > 0) return 'text-green-500';
    if (value < 0) return 'text-red-500';
    return 'text-gray-600';
};

// Get background color class based on value
export const getChangeBgColor = (value) => {
    if (value > 0) return 'bg-green-500';
    if (value < 0) return 'bg-red-500';
    return 'bg-gray-400';
};

// Truncate text
export const truncate = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// Generate unique ID
export const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Financial calculations
export const calculateBreakEven = (strike, premium, type) => {
    if (type === 'call') {
        return strike + premium;
    } else {
        return strike - premium;
    }
};

export const calculateBreakEvenPercent = (currentPrice, breakEven) => {
    return ((breakEven - currentPrice) / currentPrice) * 100;
};

export const calculateMaxCost = (price, quantity) => {
    return price * quantity * 100;
};

export const calculateMinCredit = (price, quantity) => {
    return price * quantity * 100;
};
