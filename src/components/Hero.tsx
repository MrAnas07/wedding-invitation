import React, { useEffect, useRef } from "react";

const Hero: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.opacity = "0";
      cardRef.current.style.transform = "translateY(30px)";
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.transition = "opacity 0.9s ease, transform 0.9s ease";
          cardRef.current.style.opacity = "1";
          cardRef.current.style.transform = "translateY(0)";
        }
      }, 150);
    }
  }, []);

  return (
    <section id="hero">
      <div className="hero-corner"><span /></div>

      <div className="hero-card" ref={cardRef}>
        {/* Islamic geometric icon */}
        <div className="hero-icon" style={{ width: "70px", height: "70px" }}>
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
            <circle cx="35" cy="35" r="32" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="5 3" />
            <circle cx="35" cy="35" r="23" stroke="#d4af37" strokeWidth="0.8" opacity="0.4" />
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle) => (
              <ellipse
                key={angle}
                cx="35" cy="35"
                rx="3.5" ry="10"
                fill="#d4af37"
                opacity="0.6"
                transform={`rotate(${angle} 35 35) translate(0 -13)`}
              />
            ))}
            <circle cx="35" cy="35" r="7" fill="#d4af37" opacity="0.9" />
            <circle cx="35" cy="35" r="3.5" fill="#fff" opacity="0.7" />
          </svg>
        </div>

        {/* Bismillah */}
        <p className="god-quote">
          بسم الله الرحمن الرحيم
        </p>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--text-mid)", fontSize: "0.95rem", fontStyle: "italic", lineHeight: 1.5, maxWidth: "90%" }}>
          "And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts." — Ar-Rum 30:21
        </p>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "80%", margin: "0 auto" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          <span style={{ color: "var(--gold)", fontSize: "0.9rem" }}>&#10022;</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>

        <p style={{ fontFamily: "var(--font-body)", color: "var(--text-mid)", fontSize: "1rem", fontStyle: "italic", lineHeight: 1.6 }}>
          Together with their families,
        </p>

        {/* Bride */}
        <span className="couple-name shimmer">Kiran</span>

        {/* & row */}
        <div className="amp-row">
          <div className="amp-line" />
          <span className="amp">&amp;</span>
          <div className="amp-line" />
        </div>

        {/* Groom */}
        <span className="couple-name shimmer">Siddique</span>

        <p style={{ fontFamily: "var(--font-body)", color: "var(--text-mid)", fontSize: "1rem", fontStyle: "italic", lineHeight: 1.6 }}>
          cordially invite you to their barat
        </p>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "80%", margin: "0 auto" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          <span style={{ color: "var(--gold)", fontSize: "0.9rem" }}>&#10022;</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>

        {/* Parents */}
        <p className="parent-sub">
          Daughter of Mr. Jawaid &amp; Family
        </p>
        <p className="parent-sub">
          Son of Mr. Iqbal &amp; Family
        </p>
      </div>

      {/* Scroll cue */}
      <div
        className="scroll-indicator"
        onClick={() => {
          const el = document.getElementById("countdown-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="scroll-indicator__label">Scroll</span>
        <div className="scroll-indicator__dot" />
      </div>
    </section>
  );
};

export default Hero;
