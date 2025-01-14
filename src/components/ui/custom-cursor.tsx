import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      // Direct DOM update for maximum performance
      const cursor = document.querySelector('.custom-cursor') as HTMLElement;
      if (cursor) {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Immediate style check without throttling
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement);
        const isInteractive = 
          hoveredElement.tagName === 'BUTTON' || 
          hoveredElement.tagName === 'A' || 
          computedStyle.cursor === 'pointer';
        
        setIsPointer(computedStyle.cursor === 'pointer');
        setScale(isInteractive ? 1.5 : 1);
      }
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    document.addEventListener('mousemove', updateCursorPosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Skip rendering on server
  if (typeof window === 'undefined') return null;

  return (
    <div
      className={cn(
        "custom-cursor fixed pointer-events-none z-[999] transition-opacity duration-300 will-change-transform",
        isHidden && "opacity-0"
      )}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {/* Outer ring */}
      <div
        className={cn(
          "fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary",
          "w-8 h-8 transition-all duration-100 will-change-transform",
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
          "w-1 h-1 transition-colors duration-100",
          isPointer && "bg-secondary"
        )}
      />
    </div>
  );
};