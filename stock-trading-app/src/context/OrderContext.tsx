import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Order } from '../types';
import { generateId } from '../utils/formatters';

interface OrderContextType {
    orders: Order[];
    activeOrder: Order | null;
    setActiveOrder: (order: Order | null) => void;
    placeOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
    cancelOrder: (orderId: string) => void;
    getOrderHistory: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within OrderProvider');
    }
    return context;
};

interface OrderProviderProps {
    children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [activeOrder, setActiveOrder] = useState<Order | null>(null);

    const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
        const newOrder: Order = {
            ...orderData,
            id: generateId(),
            createdAt: new Date(),
            status: 'pending',
        };

        setOrders(prev => [newOrder, ...prev]);

        // Simulate order filling after 2 seconds
        setTimeout(() => {
            setOrders(prev =>
                prev.map(order =>
                    order.id === newOrder.id
                        ? { ...order, status: 'filled', filledAt: new Date() }
                        : order
                )
            );
        }, 2000);

        return newOrder;
    };

    const cancelOrder = (orderId: string) => {
        setOrders(prev =>
            prev.map(order =>
                order.id === orderId ? { ...order, status: 'cancelled' } : order
            )
        );
    };

    const getOrderHistory = () => {
        return orders.filter(order => order.status === 'filled' || order.status === 'cancelled');
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                activeOrder,
                setActiveOrder,
                placeOrder,
                cancelOrder,
                getOrderHistory,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};
