import React, { useEffect, useRef } from "react";

const events = [
  { name: "Miyo Night", date: "15 September", time: "9:00 PM onwards", icon: "\u{1F33F}", venue: "Jawaid Residence, Karachi" },
  { name: "Dholki Night", date: "16 September", time: "9:00 PM", icon: "\u{1F3B5}", venue: "Jawaid Residence, Karachi" },
  { name: "Barat", date: "18 September", time: "10:00 PM", icon: "\u{1F434}", venue: "Grand Marquee, Karachi" },
  { name: "Nikah Ceremony", date: "18 September", time: "11:00 PM", icon: "\u{1F48D}", venue: "Grand Marquee, Nikah Hall" },
  { name: "Walima Reception", date: "19 September", time: "8:00 PM", icon: "\u{1F389}", venue: "Grand Marquee, Main Hall" },
];

const Events: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".event-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = "1";
                (card as HTMLElement).style.transform = "translateY(0)";
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="events-section">
      <span className="sec-label">Join the Celebrations</span>
      <h2 className="sec-heading">Wedding Events</h2>
      <p style={{ fontFamily: "var(--font-body)", color: "var(--text-mid)", fontStyle: "italic", fontSize: "1rem", marginTop: "0.5rem" }}>
        Four magical days of celebration
      </p>

      <div className="events-list" ref={listRef}>
        {events.map((ev, i) => (
          <div
            key={i}
            className="event-card"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <div className="event-card__icon">{ev.icon}</div>
            <div style={{ flex: 1 }}>
              <div className="event-card__name">{ev.name}</div>
              <div className="event-card__detail">{ev.date} &middot; {ev.time}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--text-light)", fontStyle: "italic", marginTop: "0.25rem" }}>
                {ev.venue}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
