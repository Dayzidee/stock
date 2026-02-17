import React from 'react';
import { Settings } from 'lucide-react';

interface HeaderProps {
    title?: string;
    showSettings?: boolean;
    onSettingsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
    title,
    showSettings = true,
    onSettingsClick
}) => {
    return (
        <header className="sticky top-0 bg-white border-b border-gray-200 z-40 safe-area-top">
            <div className="flex items-center justify-between px-4 h-14">
                <h1 className="text-lg font-semibold text-gray-900">
                    {title || 'Portfolio'}
                </h1>
                {showSettings && (
                    <button
                        onClick={onSettingsClick}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <Settings className="w-5 h-5 text-gray-600" />
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
