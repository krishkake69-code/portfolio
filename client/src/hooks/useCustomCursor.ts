import { useEffect, useRef, useState } from "react";
import { useLenis } from "./useLenis";

export function useCustomCursor() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: true });
  const [cursorScale, setCursorScale] = useState(1);
  const [cursorText, setCursorText] = useState("");
  const lenis = useLenis();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY, visible: true });
    };

    const handleMouseLeave = () => {
      setCursor((prev) => ({ ...prev, visible: false }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const setHover = (scale: number, text = "") => {
    setCursorScale(scale);
    setCursorText(text);
  };

  const resetHover = () => {
    setCursorScale(1);
    setCursorText("");
  };

  return { cursor, cursorScale, cursorText, setHover, resetHover, lenis };
}