// Currency formatting
export const formatCurrency = (value: number, decimals: number = 2): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
};

// Percentage formatting
export const formatPercent = (value: number, decimals: number = 2, includeSign: boolean = true): string => {
    const sign = includeSign && value > 0 ? '+' : '';
    return `${sign}${value.toFixed(decimals)}%`;
};

// Number abbreviation (1000 -> 1K, 1000000 -> 1M)
export const formatNumber = (value: number): string => {
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toFixed(0);
};

// Date formatting
export const formatDate = (date: string | Date): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
    }).format(d);
};

export const formatFullDate = (date: string | Date): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(d);
};

// Format expiration date (2026-02-21 -> FEB 21)
export const formatExpiration = (date: string): string => {
    const d = new Date(date);
    const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = d.getDate();
    return `${month} ${day}`;
};

// Get color class based on value
export const getChangeColor = (value: number): string => {
    if (value > 0) return 'text-success';
    if (value < 0) return 'text-danger';
    return 'text-gray-600';
};

// Get background color class based on value
export const getChangeBgColor = (value: number): string => {
    if (value > 0) return 'bg-success';
    if (value < 0) return 'bg-danger';
    return 'bg-gray-400';
};

// Truncate text
export const truncate = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// Generate unique ID
export const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
