import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Simplified cursor style update without scaling
  const updateCursorStyle = useCallback(() => {
    const hoveredElement = document.elementFromPoint(position.x, position.y);
    if (hoveredElement) {
      const computedStyle = window.getComputedStyle(hoveredElement);
      setIsPointer(
        hoveredElement.tagName === 'BUTTON' || 
        hoveredElement.tagName === 'A' || 
        computedStyle.cursor === 'pointer'
      );
    }
  }, [position.x, position.y]);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
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
  }, [updateCursorStyle]);

  // Skip rendering on server
  if (typeof window === 'undefined') return null;

  return (
    <div
      className={cn(
        "fixed pointer-events-none z-[999] mix-blend-difference",
        isHidden && "opacity-0"
      )}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {/* Smaller, more subtle outer ring */}
      <div
        className={cn(
          "fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50",
          "w-5 h-5 transition-all duration-150",
          isPointer && "border-white/70"
        )}
        style={{
          transform: `translate(-50%, -50%)`,
        }}
      />
      {/* Smaller inner dot */}
      <div
        className={cn(
          "fixed -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50",
          "w-1 h-1 transition-colors duration-150",
          isPointer && "bg-white/70"
        )}
      />
    </div>
  );
};