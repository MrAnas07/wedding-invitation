import React from "react";

const Footer: React.FC = () => {
  return (
    <footer id="footer-section">
      <div style={{
        color: "#f5ecd4",
        fontFamily: "var(--font-body)",
        fontStyle: "italic",
        fontSize: "1.25rem",
        lineHeight: 1.6,
        maxWidth: "600px",
        margin: "0 auto",
      }}>
        Your presence will make this blessed day even more special.
        <br /><br />
        Come, celebrate, and share in our joy!
      </div>

      <div style={{ marginTop: "3.5rem", marginBottom: "3.5rem" }}>
        <span style={{ display: "block", color: "#d4af37", fontFamily: "var(--font-sans)", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Warm regards,
        </span>
        <span style={{ display: "block", color: "#f5ecd4", fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "1.2rem" }}>
          Mr. Jawaid &amp; Mr. Iqbal and families
        </span>
      </div>

      <span className="footer-name">Kiran &amp; Siddique</span>

      <div className="footer-credit">
        CRAFTED WITH &#10084; BY MR ANAS
      </div>
    </footer>
  );
};

export default Footer;
