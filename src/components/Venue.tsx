import React from "react";

const Venue: React.FC = () => {
  return (
    <section id="venue-section">
      <span className="sec-label">Where</span>
      <h2 className="sec-heading">The Venue</h2>

      <div className="venue-card">
        <div className="venue-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
            alt="Venue"
            loading="lazy"
          />
          <div style={{
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            background: "linear-gradient(to top, rgba(138,79,76,0.4), transparent)"
          }} />
          <div style={{
            position: "absolute", bottom: "1.5rem", left: 0, right: 0, textAlign: "center"
          }}>
            <span style={{
              fontFamily: "var(--font-display)", color: "white",
              fontSize: "2rem", textShadow: "0 2px 8px rgba(0,0,0,0.4)"
            }}>
              Grand Marquee
            </span>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "1.5rem", color: "var(--gold)" }}>&#10022;</span>
          </div>

          <h3 style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.5rem",
            color: "var(--sage-deep)",
            marginBottom: "0.8rem",
            lineHeight: 1.3,
            fontWeight: 400
          }}>
            Grand Marquee
          </h3>

          <p style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            color: "#a08070",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            marginBottom: "1.8rem"
          }}>
            Main Boulevard, Shahrah-e-Faisal,<br />
            Karachi, Sindh, Pakistan
          </p>

          <button
            className="venue-btn"
            onClick={() => window.open("https://maps.google.com/?q=Grand+Marquee+Karachi", "_blank")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            View on Maps
          </button>
        </div>
      </div>
    </section>
  );
};

export default Venue;
