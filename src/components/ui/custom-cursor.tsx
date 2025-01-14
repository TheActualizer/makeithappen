import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorStyle = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement);
        setIsPointer(computedStyle.cursor === 'pointer');
        
        // Scale effect for interactive elements
        if (hoveredElement.tagName === 'BUTTON' || 
            hoveredElement.tagName === 'A' || 
            computedStyle.cursor === 'pointer') {
          setScale(1.5);
        } else {
          setScale(1);
        }
      }
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousemove', updateCursorStyle);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousemove', updateCursorStyle);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [position.x, position.y]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Main cursor */}
      <div
        className={cn(
          "fixed pointer-events-none z-[999] transition-opacity duration-300",
          isHidden && "opacity-0"
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {/* Outer ring */}
        <div
          className={cn(
            "fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary",
            "w-8 h-8 transition-all duration-200",
            isPointer && "border-secondary"
          )}
          style={{
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        />
        {/* Inner dot */}
        <div
          className={cn(
            "fixed -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary",
            "w-1 h-1 transition-colors duration-200",
            isPointer && "bg-secondary"
          )}
        />
      </div>
    </>
  );
};