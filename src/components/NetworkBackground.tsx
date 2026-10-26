// Full-page animated "neural network" background: drifting dots connected by
// faint blue/purple lines, drawn on a fixed canvas behind the whole page.
// Respects prefers-reduced-motion (draws one static frame, no animation).
import { useEffect, useRef } from "react";

export function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx; // non-null alias so TypeScript is happy inside nested functions
    const theme = getComputedStyle(document.documentElement);
    const blue = theme.getPropertyValue("--network-blue").trim();
    const purple = theme.getPropertyValue("--network-purple").trim();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    type P = { x: number; y: number; vx: number; vy: number; r: number; blue: boolean };
    let pts: P[] = [];

    function resize() {
      if (!canvas) return;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Jittered cells keep the network evenly spaced, including the first screen.
      const columns = Math.max(3, Math.ceil(w / 120));
      const rows = Math.max(3, Math.ceil(h / 120));
      pts = Array.from({ length: columns * rows }, (_, index) => ({
        x: ((index % columns) + 0.2 + Math.random() * 0.6) * (w / columns),
        y: (Math.floor(index / columns) + 0.2 + Math.random() * 0.6) * (h / rows),
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1 + 1,
        blue: Math.random() < 0.55,
      }));
      draw();
    }

    const LINK = 125; // Short connections keep the denser mesh quiet behind text.

    function draw() {
      c.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          if (!a || !b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            c.globalAlpha = 0.38 * (1 - d / LINK);
            c.strokeStyle = a.blue || b.blue ? blue : purple;
            c.lineWidth = 0.8;
            c.beginPath();
            c.moveTo(a.x, a.y);
            c.lineTo(b.x, b.y);
            c.stroke();
          }
        }
      }
      c.globalAlpha = 0.65;
      for (const p of pts) {
        c.beginPath();
        c.fillStyle = p.blue ? blue : purple;
        c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        c.fill();
      }
      c.globalAlpha = 1;
    }

    function step() {
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        else if (p.y > h + 20) p.y = -20;
      }
      draw();
      raf = requestAnimationFrame(step);
    }

    resize();
    draw();
    if (!reduce) raf = requestAnimationFrame(step);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  );
}
