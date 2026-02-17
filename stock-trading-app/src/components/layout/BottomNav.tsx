import React from 'react';
import { Home, Calendar, Search, MessageCircle, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { icon: Home, label: 'Portfolio', path: '/' },
        { icon: Calendar, label: 'Calendar', path: '/calendar' },
        { icon: Search, label: 'Search', path: '/search' },
        { icon: MessageCircle, label: 'Messages', path: '/messages' },
        { icon: User, label: 'Account', path: '/account' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
            <div className="flex justify-around items-center h-16 max-w-2xl mx-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className="flex flex-col items-center justify-center flex-1 h-full transition-colors"
                        >
                            <Icon
                                className={`w-6 h-6 ${isActive ? 'text-gray-900' : 'text-gray-400'
                                    }`}
                            />
                            <span
                                className={`text-xs mt-1 ${isActive ? 'text-gray-900 font-medium' : 'text-gray-400'
                                    }`}
                            >
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
