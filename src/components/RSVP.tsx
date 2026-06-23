import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const EVENT_LIST = [
  { name: "Miyo Night", date: "15 SEP &middot; 9:00 PM" },
  { name: "Dholki Night", date: "16 SEP &middot; 9:00 PM" },
  { name: "Barat", date: "18 SEP &middot; 10:00 PM" },
  { name: "Nikah Ceremony", date: "18 SEP &middot; 11:00 PM" },
  { name: "Walima Reception", date: "19 SEP &middot; 8:00 PM" },
];

interface CheckItemProps {
  label: string;
  sublabel: string;
  checked: boolean;
  onChange: () => void;
}

const CheckItem: React.FC<CheckItemProps> = ({ label, sublabel, checked, onChange }) => (
  <div className="check-item" onClick={onChange}>
    <div className={`check-box ${checked ? "checked" : ""}`}>
      {checked && (
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
          <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
    <div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--text-dark)" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", letterSpacing: "0.15em", color: "var(--gold)", marginTop: "0.15rem" }} dangerouslySetInnerHTML={{ __html: sublabel }} />
    </div>
  </div>
);

interface SongResult {
  trackName: string;
  artistName: string;
  artworkUrl60?: string;
}

const RSVP: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [songQuery, setSongQuery] = useState("");
  const [songResults, setSongResults] = useState<SongResult[]>([]);
  const [songLoading, setSongLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(
    new Set(EVENT_LIST.map((e) => e.name))
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!songQuery || songQuery.length < 2) {
      setSongResults([]);
      setShowDropdown(false);
      return;
    }
    setSongLoading(true);
    const timeout = setTimeout(() => {
      fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(songQuery)}&entity=song&limit=6`)
        .then((r) => r.json())
        .then((data) => {
          setSongResults(data.results || []);
          setShowDropdown(true);
          setSongLoading(false);
        })
        .catch(() => setSongLoading(false));
    }, 500);
    return () => clearTimeout(timeout);
  }, [songQuery]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleEvent = (name: string) => {
    const next = new Set(selectedEvents);
    next.has(name) ? next.delete(name) : next.add(name);
    setSelectedEvents(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const eventsAttended = EVENT_LIST.filter((ev) => selectedEvents.has(ev.name))
      .map((ev) => `  * ${ev.name}\n    ${ev.date}`)
      .join("\n");

    const dietaryVal = document.querySelector<HTMLSelectElement>(".rsvp-select")?.value || "N/A";
    const dietaryLabel: Record<string, string> = { none: "No specific preferences", halal: "Halal only", vegetarian: "Vegetarian", other: "Other" };

    const divider = "━━━━━━━━━━━━━━━━━━━━";
    const dividerThin = "────────────────────";

    const msg = [
      ``,
      `╔══════════════════════╗`,
      `║  *KIRAN & SIDDIQUE*  ║`,
      `║   Wedding RSVP       ║`,
      `╚══════════════════════╝`,
      ``,
      divider,
      ``,
      `*Name*`,
      `${name || "N/A"}`,
      ``,
      `*Phone*`,
      `${phone || "N/A"}`,
      ``,
      `*Attending*`,
      `${attending === "yes" ? "InshAllah, Yes" : "Regrettably Decline"}`,
      ``,
      divider,
    ];

    if (attending === "yes") {
      msg.push(
        ``,
        `*Events Attending*`,
        eventsAttended || "  None selected",
        ``,
        dividerThin,
        ``,
        `*Song Request*`,
        `${songQuery || "None"}`,
        ``,
        `*Dietary Preference*`,
        `${dietaryLabel[dietaryVal] || dietaryVal}`,
        ``,
        divider,
      );
    }

    msg.push(
      ``,
      `May Allah bless this union.`,
      `JazakAllah Khair`,
    );

    const whatsappNumber = "923192885926";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg.join("\n"))}`;

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      window.open(url, "_blank");
    }, 1000);
  };

  if (submitted) {
    return (
      <section id="rsvp-section">
        <div className="thankyou-screen">
          <div style={{
            width: "80px", height: "80px", borderRadius: "50%",
            background: "#8a4f4c", display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 2rem",
            animation: "scaleIn 0.6s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <svg width="40" height="30" viewBox="0 0 14 10" fill="none">
              <path d="M1 5L4.5 8.5L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ strokeDasharray: 20, strokeDashoffset: 0, animation: "drawCheck 0.5s ease 0.3s backwards" }}
              />
            </svg>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", color: "#8a4f4c", marginBottom: "1rem", animation: "fadeInUp 0.6s ease 0.2s backwards" }}>
            JazakAllah Khair!
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "#4a3d36", fontSize: "1.2rem", maxWidth: "400px", margin: "0 auto", lineHeight: 1.6, fontStyle: "italic", animation: "fadeInUp 0.6s ease 0.4s backwards" }}>
            Your RSVP has been beautifully received. May Allah bless this union. We look forward to celebrating with you!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp-section">
      <span className="sec-label">Join the Celebration</span>
      <h2 className="sec-heading" style={{ fontSize: "4rem" }}>RSVP</h2>
      <p style={{ fontFamily: "var(--font-body)", color: "var(--text-mid)", fontSize: "1rem", maxWidth: "400px", margin: "0 auto 3rem", lineHeight: 1.6, fontStyle: "italic" }}>
        Kindly let us know if you can make it — your presence will make this celebration whole.
      </p>

      <form className="rsvp-form" onSubmit={handleSubmit}>
        <div className="evt-details" style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.4rem", color: "#8a4f4c", fontStyle: "italic", marginBottom: "1.5rem" }}>
            Your details
          </p>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#8a4f4c", marginBottom: "0.5rem", fontWeight: 600 }}>
              Your name
            </label>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rsvp-input"
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#8a4f4c", marginBottom: "0.5rem", fontWeight: 600 }}>
              Phone number
            </label>
            <input
              type="tel"
              placeholder="+92 300 0000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rsvp-input"
            />
          </div>
        </div>

        <div className="evt-details" style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.4rem", color: "#8a4f4c", fontStyle: "italic", marginBottom: "1.5rem" }}>
            Will you join us?
          </p>
          <div
            className={`rsvp-radio-btn ${attending === "yes" ? "accept" : "decline"}`}
            onClick={() => setAttending("yes")}
            style={{ background: attending === "yes" ? "#8a4f4c" : "#fff", color: attending === "yes" ? "white" : "#8a4f4c", border: "1px solid #8a4f4c" }}
          >
            InshAllah, Yes!
          </div>
          <div
            className="rsvp-radio-btn decline"
            onClick={() => setAttending("no")}
            style={{ background: attending === "no" ? "#f5eae8" : "#fff" }}
          >
            Regrettably Decline
          </div>
        </div>

        {attending === "yes" && (
          <>
            <div className="evt-details" style={{ marginBottom: "1.5rem", animation: "fadeIn 0.5s ease" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.4rem", color: "#8a4f4c", fontStyle: "italic", marginBottom: "1.5rem" }}>
                Party size
              </p>
              <select className="rsvp-select">
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n === 1 ? "1 (Just me)" : `${n} guests`}</option>
                ))}
              </select>
            </div>

            <div className="evt-details" style={{ marginBottom: "1.5rem", animation: "fadeIn 0.5s ease" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.4rem", color: "#8a4f4c", fontStyle: "italic", marginBottom: "1.5rem" }}>
                Events you'll attend
              </p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {EVENT_LIST.map((ev) => (
                  <CheckItem
                    key={ev.name}
                    label={ev.name}
                    sublabel={ev.date}
                    checked={selectedEvents.has(ev.name)}
                    onChange={() => toggleEvent(ev.name)}
                  />
                ))}
              </div>
            </div>

            <div className="evt-details" style={{ marginBottom: "1.5rem", animation: "fadeIn 0.5s ease", position: "relative", zIndex: 20 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.4rem", color: "#8a4f4c", fontStyle: "italic", marginBottom: "1.5rem" }}>
                A song for the dance floor
              </p>
              <div className="song-search-wrap" ref={dropdownRef}>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    value={songQuery}
                    onChange={(e) => {
                      setSongQuery(e.target.value);
                      if (!e.target.value) setShowDropdown(false);
                    }}
                    placeholder="e.g. Kala Chashma..."
                    className="rsvp-input"
                  />
                  {songLoading && (
                    <div style={{ position: "absolute", right: 0, top: "0.5rem" }}>
                      <div style={{ width: "16px", height: "16px", border: "2px solid #e2d7c8", borderTop: "2px solid #8a4f4c", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                    </div>
                  )}
                </div>
                {showDropdown && songResults.length > 0 && (
                  <div className="song-dropdown">
                    {songResults.map((r, i) => (
                      <div
                        key={i}
                        className="song-item"
                        onClick={() => {
                          setSongQuery(`${r.trackName} - ${r.artistName}`);
                          setShowDropdown(false);
                        }}
                      >
                        {r.artworkUrl60 && (
                          <img src={r.artworkUrl60} alt="" style={{ width: "40px", height: "40px", borderRadius: "4px", flexShrink: 0 }} />
                        )}
                        <div>
                          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, color: "#333", fontSize: "0.92rem" }}>{r.trackName}</div>
                          <div style={{ fontFamily: "var(--font-sans)", color: "#888", fontSize: "0.78rem", marginTop: "0.15rem" }}>{r.artistName}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="evt-details" style={{ marginBottom: "1.5rem", animation: "fadeIn 0.5s ease" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.4rem", color: "#8a4f4c", fontStyle: "italic", marginBottom: "1.5rem" }}>
                Dietary preferences
              </p>
              <select className="rsvp-select" style={{ borderRadius: "0.8rem" }}>
                <option value="none">No specific preferences</option>
                <option value="halal">Halal only</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="evt-details" style={{ marginBottom: "2.5rem", animation: "fadeIn 0.5s ease" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.4rem", color: "#8a4f4c", fontStyle: "italic", marginBottom: "1.5rem" }}>
                Marriage advice &amp; Dua for the couple
              </p>
              <textarea
                className="rsvp-textarea"
                placeholder="Share your blessings and advice..."
              />
            </div>
          </>
        )}

        {attending && (
          <button
            type="submit"
            className="submit-btn"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <div style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.4)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                Sending...
              </>
            ) : (
              "Send My RSVP"
            )}
          </button>
        )}
      </form>
    </section>
  );
};

export default RSVP;
