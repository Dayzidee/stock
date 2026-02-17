import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Portfolio, Position } from '../types';
import { mockPortfolio, mockPositions } from '../data/mockData';

interface PortfolioContextType {
    portfolio: Portfolio;
    updatePortfolio: (portfolio: Partial<Portfolio>) => void;
    addPosition: (position: Position) => void;
    removePosition: (positionId: string) => void;
    updatePosition: (positionId: string, updates: Partial<Position>) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error('usePortfolio must be used within PortfolioProvider');
    }
    return context;
};

interface PortfolioProviderProps {
    children: ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
    const [portfolio, setPortfolio] = useState<Portfolio>({
        ...mockPortfolio,
        positions: mockPositions,
    });

    const updatePortfolio = (updates: Partial<Portfolio>) => {
        setPortfolio(prev => ({ ...prev, ...updates }));
    };

    const addPosition = (position: Position) => {
        setPortfolio(prev => ({
            ...prev,
            positions: [...prev.positions, position],
        }));
    };

    const removePosition = (positionId: string) => {
        setPortfolio(prev => ({
            ...prev,
            positions: prev.positions.filter(p => p.id !== positionId),
        }));
    };

    const updatePosition = (positionId: string, updates: Partial<Position>) => {
        setPortfolio(prev => ({
            ...prev,
            positions: prev.positions.map(p =>
                p.id === positionId ? { ...p, ...updates } : p
            ),
        }));
    };

    return (
        <PortfolioContext.Provider
            value={{
                portfolio,
                updatePortfolio,
                addPosition,
                removePosition,
                updatePosition,
            }}
        >
            {children}
        </PortfolioContext.Provider>
    );
};
