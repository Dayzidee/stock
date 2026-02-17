import React, { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

interface SwipeToSubmitProps {
    onSubmit: () => void;
    text?: string;
}

const SwipeToSubmit: React.FC<SwipeToSubmitProps> = ({
    onSubmit,
    text = 'Swipe up to submit'
}) => {
    const [startY, setStartY] = useState<number | null>(null);
    const [currentY, setCurrentY] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const threshold = -100; // Swipe up 100px to submit

    const handleTouchStart = (e: React.TouchEvent) => {
        setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (startY === null) return;
        setCurrentY(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
        if (startY === null || currentY === null) {
            setStartY(null);
            setCurrentY(null);
            return;
        }

        const diff = currentY - startY;

        if (diff < threshold) {
            setIsSubmitting(true);
            setTimeout(() => {
                onSubmit();
                setIsSubmitting(false);
            }, 300);
        }

        setStartY(null);
        setCurrentY(null);
    };

    const progress = startY !== null && currentY !== null
        ? Math.max(0, Math.min(100, ((startY - currentY) / Math.abs(threshold)) * 100))
        : 0;

    return (
        <div
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative bg-primary rounded-full h-14 flex items-center justify-center overflow-hidden cursor-pointer select-none"
            style={{
                background: `linear-gradient(to right, #00A182 ${progress}%, #00D4AA ${progress}%)`,
            }}
        >
            <div className={`text-white font-semibold transition-all ${isSubmitting ? 'scale-110' : 'scale-100'}`}>
                {isSubmitting ? 'Submitting...' : text}
            </div>
            <ChevronRight className="absolute right-4 text-white rotate-[-90deg]" />
        </div>
    );
};

export default SwipeToSubmit;
