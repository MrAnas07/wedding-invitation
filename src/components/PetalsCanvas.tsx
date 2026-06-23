import React, { useEffect, useRef } from "react";

const PetalsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#f7c6c7", "#eac9c7", "#f0d0c0", "#e8c8b8", "#f5d5c5", "#d4af37"];
    interface Petal {
      x: number; y: number; r: number;
      vx: number; vy: number; vr: number;
      size: number; opacity: number; color: string;
    }
    const petals: Petal[] = [];

    const spawn = () => {
      if (petals.length > 40) return;
      petals.push({
        x: Math.random() * canvas.width,
        y: -20,
        r: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.8,
        vy: 0.5 + Math.random() * 1.2,
        vr: (Math.random() - 0.5) * 0.02,
        size: 6 + Math.random() * 10,
        opacity: 0.3 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p, i) => {
        p.x += p.vx + Math.sin(p.y * 0.01) * 0.3;
        p.y += p.vy;
        p.r += p.vr;
        if (p.y > canvas.height + 20) {
          petals.splice(i, 1);
          return;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      if (Math.random() < 0.08) spawn();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default PetalsCanvas;
