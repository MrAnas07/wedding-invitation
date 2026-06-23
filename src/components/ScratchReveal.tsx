import React, { useEffect, useRef, useState, useCallback } from "react";
import confetti from "canvas-confetti";

interface ScratchRevealProps {
  onComplete: () => void;
}

const SCRATCH_ITEMS = [
  { label: "MONTH", value: "SEP" },
  { label: "DAY", value: "18" },
  { label: "YEAR", value: "2026" },
];

interface ScratchCardProps {
  label: string;
  value: string;
  onComplete: () => void;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ label, value, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const completedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    const w = canvas.width;
    const h = canvas.height;

    // Save the Date theme color overlay (matching the section title color)
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#8a4f4c");
    grad.addColorStop(0.5, "#7d4542");
    grad.addColorStop(1, "#6e3a38");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Decorative pattern overlay
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.font = `bold ${Math.max(10, w / 14)}px Tenor Sans, sans-serif`;
    ctx.textAlign = "center";
    for (let y = 25; y < h; y += 30) {
      for (let x = 0; x < w + 60; x += 80) {
        ctx.fillText("SCRATCH", x, y);
      }
    }

    // Gold border accent
    ctx.strokeStyle = "rgba(212,175,55,0.3)";
    ctx.lineWidth = 3;
    ctx.strokeRect(4, 4, w - 8, h - 8);

    const scratchAt = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 32, 0, Math.PI * 2);
      ctx.fill();
      measureReveal();
    };

    const measureReveal = () => {
      if (completedRef.current) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;
      const total = pixels.length / 4;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) transparent++;
      }
      if (transparent / total > 0.45) {
        completedRef.current = true;
        setRevealed(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onComplete();
      }
    };

    const getXY = (e: MouseEvent | TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      const scaleX = canvas.width / r.width;
      const scaleY = canvas.height / r.height;
      if ("touches" in e) {
        return {
          x: (e.touches[0].clientX - r.left) * scaleX,
          y: (e.touches[0].clientY - r.top) * scaleY,
        };
      }
      return {
        x: ((e as MouseEvent).clientX - r.left) * scaleX,
        y: ((e as MouseEvent).clientY - r.top) * scaleY,
      };
    };

    let lastX = 0;
    let lastY = 0;

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDrawingRef.current = true;
      const { x, y } = getXY(e);
      lastX = x;
      lastY = y;
      scratchAt(x, y);
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      const { x, y } = getXY(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 65;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      lastX = x;
      lastY = y;
      measureReveal();
    };

    const onUp = () => { isDrawingRef.current = false; };

    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", onDown, { passive: false });
    canvas.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("touchstart", onDown);
      canvas.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [onComplete]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
      <span style={{
        fontFamily: "var(--font-sans)",
        fontSize: "0.7rem",
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color: "#8a4f4c",
      }}>
        {label}
      </span>
      <div style={{
        position: "relative",
        width: "min(160px, 30vw)",
        height: "200px",
        borderRadius: "1rem",
        overflow: "hidden",
        boxShadow: "0 8px 30px rgba(138,79,76,0.12)",
        cursor: revealed ? "default" : "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "none",
        background: "#ffffff",
      }}>
        {/* Value underneath - white background */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: value.length > 4 ? "clamp(1rem, 3.5vw, 1.3rem)" : "clamp(2.5rem, 8vw, 3.5rem)",
            color: "#8a4f4c",
            lineHeight: 1,
            textAlign: "center",
            padding: "0 0.3rem",
            whiteSpace: "nowrap",
            letterSpacing: value.length > 4 ? "0.15em" : "normal",
          }}>
            {value}
          </span>
        </div>

        {/* Scratch canvas - Save the Date theme color */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "1rem",
            display: revealed ? "none" : "block",
          }}
        />
      </div>
    </div>
  );
};

const ConfettiBurst: React.FC = () => {
  useEffect(() => {
    const end = Date.now() + 2500;
    const fire = () => {
      confetti({ particleCount: 8, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#f7c6c7", "#eac9c7", "#d4af37", "#ffffff"] });
      confetti({ particleCount: 8, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#f7c6c7", "#eac9c7", "#d4af37", "#ffffff"] });
      if (Date.now() < end) requestAnimationFrame(fire);
    };
    fire();
  }, []);
  return null;
};

const ScratchReveal: React.FC<ScratchRevealProps> = ({ onComplete }) => {
  const [completedCount, setCompletedCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCardComplete = useCallback(() => {
    setCompletedCount((prev) => {
      const next = prev + 1;
      if (next === 3) {
        setShowConfetti(true);
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
      return next;
    });
  }, [onComplete]);

  return (
    <section className="scratch-section" style={{ position: "relative" }}>
      {showConfetti && <ConfettiBurst />}

      <div style={{ position: "relative", zIndex: 1 }}>
        <span style={{
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          fontSize: "0.75rem",
          color: "#c9a270",
          display: "block",
          marginBottom: "0.75rem",
        }}>
          The Date
        </span>
        <h2 className="scratch-title" style={{ marginBottom: "0.5rem" }}>
          Save the Date
        </h2>
        <p style={{
          fontFamily: "var(--font-body)",
          color: "#a08070",
          fontStyle: "italic",
          fontSize: "1rem",
          marginBottom: "3rem",
        }}>
          Scratch below to reveal our wedding date
        </p>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "clamp(1rem, 4vw, 2.5rem)",
          flexWrap: "wrap",
        }}>
          {SCRATCH_ITEMS.map((item) => (
            <ScratchCard
              key={item.label}
              label={item.label}
              value={item.value}
              onComplete={handleCardComplete}
            />
          ))}
        </div>

        {completedCount === 3 && (
          <div style={{
            marginTop: "2.5rem",
            animation: "fadeInUp 0.6s ease forwards",
          }}>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              color: "#8a4f4c",
            }}>
              18 September 2026
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScratchReveal;
