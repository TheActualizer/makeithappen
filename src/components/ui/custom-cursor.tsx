import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [scale, setScale] = useState(1);

  // Debounced cursor style update
  const updateCursorStyle = useCallback(() => {
    const hoveredElement = document.elementFromPoint(position.x, position.y);
    if (hoveredElement) {
      const computedStyle = window.getComputedStyle(hoveredElement);
      const isInteractive = 
        hoveredElement.tagName === 'BUTTON' || 
        hoveredElement.tagName === 'A' || 
        computedStyle.cursor === 'pointer';
      
      setIsPointer(computedStyle.cursor === 'pointer');
      setScale(isInteractive ? 1.5 : 1);
    }
  }, [position.x, position.y]);

  useEffect(() => {
    let rafId: number;
    
    const updateCursorPosition = (e: MouseEvent) => {
      // Use requestAnimationFrame for smooth updates
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    // Throttle mousemove event
    let throttleTimeout: NodeJS.Timeout;
    const throttledUpdateStyle = (e: MouseEvent) => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          updateCursorStyle();
          throttleTimeout = null;
        }, 100); // Update style every 100ms max
      }
    };

    document.addEventListener('mousemove', updateCursorPosition, { passive: true });
    document.addEventListener('mousemove', throttledUpdateStyle, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousemove', throttledUpdateStyle);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
      clearTimeout(throttleTimeout);
    };
  }, [updateCursorStyle]);

  // Skip rendering on server
  if (typeof window === 'undefined') return null;

  return (
    <div
      className={cn(
        "fixed pointer-events-none z-[999] transition-opacity duration-300 will-change-transform",
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
          "w-8 h-8 transition-all duration-200 will-change-transform",
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
  );
};