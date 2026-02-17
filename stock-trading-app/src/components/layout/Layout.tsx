import React, { type ReactNode } from 'react';
import BottomNav from './BottomNav';

interface LayoutProps {
    children: ReactNode;
    showBottomNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showBottomNav = true }) => {
    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            <main className="max-w-2xl mx-auto">
                {children}
            </main>
            {showBottomNav && <BottomNav />}
        </div>
    );
};

export default Layout;
