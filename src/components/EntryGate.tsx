import React, { useEffect, useRef, useState } from "react";

interface EntryGateProps {
  onOpen: () => void;
}

const EntryGate: React.FC<EntryGateProps> = ({ onOpen }) => {
  const [clicked, setClicked] = useState(false);
  const gateRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (clicked) return;
    setClicked(true);

    const flash = document.createElement("div");
    flash.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: white; opacity: 0; pointer-events: none;
    `;
    document.body.appendChild(flash);

    const fadeIn = flash.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 1000, easing: "ease-in-out", fill: "forwards" }
    );

    fadeIn.onfinish = () => {
      if (gateRef.current) {
        gateRef.current.style.display = "none";
      }
      onOpen();

      flash.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 2000, easing: "ease-out", fill: "forwards", delay: 200 }
      );
      setTimeout(() => flash.remove(), 3000);
    };
  };

  return (
    <div
      ref={gateRef}
      onClick={handleOpen}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#000",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <img
        src="https://i.ibb.co/Z1Fcmczq/frame-001.jpg"
        alt="Intro Cover"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
          transition: "opacity 0.5s ease",
          opacity: clicked ? 0 : 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.4) 100%)",
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default EntryGate;
