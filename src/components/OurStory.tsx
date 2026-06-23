import React, { useEffect, useRef } from "react";

const storyPhotos = [
  { src: "/images/photo1.jpg", cap: "Memories Together" },
  { src: "/images/photo2.jpg", cap: "Written in the Stars" },
  { src: "/images/photo3.jpg", cap: "Joy and Laughter" },
  { src: "/images/photo4.jpg", cap: "Forever Us" },
];

const rotations = [-2.5, 1.8, -1.5, 2.2];

const OurStory: React.FC = () => {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = stackRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".story-card-wrapper");
    if (cards.length === 0) return;

    const onScroll = () => {
      cards.forEach((card, idx) => {
        const rot = rotations[idx] || 0;
        if (idx < cards.length - 1) {
          const nextCard = cards[idx + 1];
          if (!nextCard) return;
          const nextCardTop = nextCard.getBoundingClientRect().top;
          const threshold = window.innerHeight * 0.22;

          if (nextCardTop <= threshold) {
            (card as HTMLElement).style.transform = `scale(0.92) rotate(${rot}deg)`;
            (card as HTMLElement).style.filter = "brightness(0.5)";
            (card as HTMLElement).style.opacity = "1";
          } else if (nextCardTop < window.innerHeight) {
            const progress = Math.max(0, Math.min(1, 1 - (nextCardTop - threshold) / (window.innerHeight - threshold)));
            const scaleVal = 1 - 0.08 * progress;
            const brightVal = 1 - 0.5 * progress;
            (card as HTMLElement).style.transform = `scale(${scaleVal}) rotate(${rot}deg)`;
            (card as HTMLElement).style.filter = `brightness(${brightVal})`;
            (card as HTMLElement).style.opacity = "1";
          } else {
            (card as HTMLElement).style.transform = `scale(1) rotate(${rot}deg)`;
            (card as HTMLElement).style.filter = "brightness(1)";
            (card as HTMLElement).style.opacity = "1";
          }
        } else {
          (card as HTMLElement).style.transform = `scale(1) rotate(${rot}deg)`;
          (card as HTMLElement).style.filter = "brightness(1)";
          (card as HTMLElement).style.opacity = "1";
        }
      });
    };

    cards.forEach((card, idx) => {
      const rot = rotations[idx] || 0;
      (card as HTMLElement).style.transform = `scale(1) rotate(${rot}deg)`;
      (card as HTMLElement).style.filter = "brightness(1)";
      (card as HTMLElement).style.opacity = "1";
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section style={{ background: "var(--cream)" }}>
      <div style={{
        textAlign: "center",
        padding: "2vh 1rem 2vh",
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "linear-gradient(var(--cream) 80%, transparent)",
      }}>
        <span style={{
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          fontSize: "0.75rem",
          color: "#c9a270",
          display: "block",
          marginBottom: "0.5rem",
        }}>
          Our Story
        </span>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "4.5rem",
          color: "var(--sage-dark)",
          marginBottom: 0,
          lineHeight: 1.1,
        }}>
          Forever Us
        </h2>
      </div>

      <div
        ref={stackRef}
        className="story-stack-container"
        style={{ paddingBottom: "5vh" }}
      >
        {storyPhotos.map((photo, i) => (
          <div
            key={i}
            className="story-card-wrapper"
          >
            <div className="story-polaroid">
              <img
                src={photo.src}
                alt={photo.cap}
                loading="lazy"
                decoding="async"
              />
              <div className="story-polaroid-caption">
                {photo.cap}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurStory;
