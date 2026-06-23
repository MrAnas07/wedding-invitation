import React, { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-09-18T11:00:00+05:00");

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

const Countdown: React.FC = () => {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section id="countdown-section">
      <span className="sec-label">Mark Your Calendar</span>
      <h2 className="sec-heading">The Big Day</h2>
      <p style={{ fontFamily: "var(--font-body)", color: "var(--text-mid)", fontStyle: "italic", fontSize: "1.05rem", marginTop: "0.5rem" }}>
        18 September 2026 — Barat Day
      </p>

      <div className="countdown-grid">
        {units.map((u) => (
          <div key={u.label} className="countdown-item">
            <span className="countdown-num">{String(u.value).padStart(2, "0")}</span>
            <span className="countdown-label">{u.label}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center", gap: "0.5rem", alignItems: "center" }}>
        <div style={{ width: "40px", height: "1px", background: "var(--border)" }} />
        <span style={{ color: "var(--gold)", fontSize: "1.2rem" }}>&#10022;</span>
        <div style={{ width: "40px", height: "1px", background: "var(--border)" }} />
      </div>
    </section>
  );
};

export default Countdown;
