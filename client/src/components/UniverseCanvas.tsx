/*
 * Cinematic Astral Editorial — UniverseCanvas
 * This file owns the atmospheric layer: restrained star movement, parallax,
 * and the ink/navy space field. Keep it quiet so editorial content remains primary.
 */
import { useEffect, useRef } from "react";

type UniverseCanvasProps = {
  activeIndex: number;
};

type Star = {
  x: number;
  y: number;
  z: number;
  size: number;
  alpha: number;
  hue: number;
};

const STAR_COUNT = 460;
const SECTION_TINTS = [188, 210, 250, 230, 196, 265, 188];

export function UniverseCanvas({ activeIndex }: UniverseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = performance.now();
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0 };
    const targetPointer = { x: 0, y: 0 };
    const stars: Star[] = Array.from({ length: STAR_COUNT }, (_, index) => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random(),
      size: index % 11 === 0 ? 1.8 + Math.random() * 1.1 : 0.55 + Math.random() * 1.05,
      alpha: 0.18 + Math.random() * 0.72,
      hue: Math.random() > 0.8 ? 198 + Math.random() * 45 : 210 + Math.random() * 22,
    }));

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const handlePointer = (event: PointerEvent) => {
      targetPointer.x = (event.clientX / Math.max(width, 1) - 0.5) * 2;
      targetPointer.y = (event.clientY / Math.max(height, 1) - 0.5) * 2;
    };

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
    };

    const drawNebula = (time: number) => {
      const tint = SECTION_TINTS[activeIndex] ?? 210;
      const drift = reducedMotion ? 0 : Math.sin(time * 0.00008) * 30;
      const first = context.createRadialGradient(width * 0.72 + drift, height * 0.22, 0, width * 0.72, height * 0.22, width * 0.58);
      first.addColorStop(0, `hsla(${tint}, 86%, 68%, 0.085)`);
      first.addColorStop(0.4, `hsla(${tint + 24}, 82%, 40%, 0.04)`);
      first.addColorStop(1, "rgba(4, 7, 18, 0)");
      context.fillStyle = first;
      context.fillRect(0, 0, width, height);

      const second = context.createRadialGradient(width * 0.15 - drift * 0.5, height * 0.76, 0, width * 0.15, height * 0.76, width * 0.42);
      second.addColorStop(0, "rgba(46, 72, 138, 0.055)");
      second.addColorStop(1, "rgba(4, 7, 18, 0)");
      context.fillStyle = second;
      context.fillRect(0, 0, width, height);
    };

    const drawStars = (elapsed: number) => {
      const horizon = height * 0.5;
      const motion = reducedMotion ? 0.00003 : 0.00017;
      const timeShift = elapsed * motion;
      const pointerX = pointer.x * 18;
      const pointerY = pointer.y * 10;

      for (const star of stars) {
        star.z -= timeShift;
        if (star.z < 0.03) {
          star.z = 1;
          star.x = (Math.random() - 0.5) * 2;
          star.y = (Math.random() - 0.5) * 2;
        }
        const depth = 1 / star.z;
        const x = width * 0.5 + star.x * width * 0.48 * depth + pointerX * (1 - star.z);
        const y = horizon + star.y * height * 0.55 * depth + pointerY * (1 - star.z);
        const radius = Math.max(0.35, star.size * (1.22 - star.z));
        if (x < -24 || x > width + 24 || y < -24 || y > height + 24) continue;
        const brightness = star.alpha * Math.min(1, (1 - star.z) * 2.25 + 0.1);
        context.beginPath();
        context.fillStyle = `hsla(${star.hue}, 74%, 86%, ${brightness})`;
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();

        if (star.size > 1.7 && !reducedMotion) {
          context.strokeStyle = `hsla(${star.hue}, 80%, 82%, ${brightness * 0.35})`;
          context.lineWidth = 0.6;
          context.beginPath();
          context.moveTo(x - radius * 3, y);
          context.lineTo(x + radius * 3, y);
          context.moveTo(x, y - radius * 3);
          context.lineTo(x, y + radius * 3);
          context.stroke();
        }
      }
    };

    const draw = (time: number) => {
      const elapsed = Math.min(time - lastTime, 80);
      lastTime = time;
      pointer.x += (targetPointer.x - pointer.x) * (reducedMotion ? 0.12 : 0.045);
      pointer.y += (targetPointer.y - pointer.y) * (reducedMotion ? 0.12 : 0.045);
      context.clearRect(0, 0, width, height);

      const base = context.createLinearGradient(0, 0, width, height);
      base.addColorStop(0, "#050711");
      base.addColorStop(0.44, "#070b1d");
      base.addColorStop(1, "#03040b");
      context.fillStyle = base;
      context.fillRect(0, 0, width, height);
      drawNebula(time);
      drawStars(elapsed);
      frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointer, { passive: true });
    const preferenceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    preferenceQuery.addEventListener("change", handleMotionPreference);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
      preferenceQuery.removeEventListener("change", handleMotionPreference);
    };
  }, [activeIndex]);

  return <canvas ref={canvasRef} aria-hidden="true" className="universe-canvas" />;
}
