import React from "react";

const FloatingCTA: React.FC = () => {
  return (
    <button
      className="floating-cta"
      onClick={() =>
        window.open(
          "https://wa.me/923122688107?text=Hi!%20I%20loved%20the%20digital%20invitation%20and%20would%20like%20to%20get%20one%20made%20for%20myself.",
          "_blank"
        )
      }
      aria-label="Buy now for yourself"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
      Buy Now for Yourself
    </button>
  );
};

export default FloatingCTA;
