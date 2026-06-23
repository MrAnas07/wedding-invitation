import React from "react";

const Gallery: React.FC = () => {
  return (
    <section id="gallery-section">
      <span className="sec-label">Captured Moments</span>
      <h2 className="sec-heading">Our Photos</h2>
      <p style={{
        fontFamily: "var(--font-body)",
        color: "var(--text-mid)",
        fontStyle: "italic",
        fontSize: "1rem",
        marginTop: "0.4rem",
      }}>
        Memories we've made — and many more to come
      </p>

      <div className="polaroid-grid">
        {[
          { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80", caption: "Together" },
          { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80", caption: "In Love" },
          { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80", caption: "Forever" },
          { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80", caption: "Always" },
        ].map((p, i) => (
          <div key={i} className="polaroid-card">
            <img src={p.src} alt={p.caption} loading="lazy" />
            <p className="polaroid-card__caption">{p.caption}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "3rem", textAlign: "center" }}>
        <button
          className="whatsapp-btn"
          onClick={() =>
            window.open(
              `https://wa.me/?text=${encodeURIComponent("You're invited to Kiran & Siddique's wedding! 18 September 2026, Lahore")}`,
              "_blank"
            )
          }
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Share on WhatsApp
        </button>
      </div>
    </section>
  );
};

export default Gallery;
