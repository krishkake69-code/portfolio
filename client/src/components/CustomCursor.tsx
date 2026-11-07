import { useEffect } from "react";

type CustomCursorProps = {
  x: number;
  y: number;
  visible: boolean;
  scale: number;
  text: string;
};

export function CustomCursor({ x, y, visible, scale, text }: CustomCursorProps) {
  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150 ease-out"
      style={{
        transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`,
      }}
      aria-hidden="true"
    >
      <div className="relative">
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-neon-cyan">
          <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.6" />
        </svg>
        {text && (
          <span
            className="absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap text-neon-cyan font-mono text-xs px-2 py-1 bg-neutral-950/80 border border-neon-cyan/30 rounded"
          >
            {text}
          </span>
        )}
      </div>
    </div>
  );
}