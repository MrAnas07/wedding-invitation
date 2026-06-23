import React from "react";

const Navbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <span className="navbar__brand">Meenal &amp; Avinash</span>
      <div className="navbar__links">
        <button className="navbar__link" onClick={() => scrollTo("events-section")}>Events</button>
        <button className="navbar__link" onClick={() => scrollTo("venue-section")}>Venue</button>
        <button className="navbar__link" onClick={() => scrollTo("rsvp-section")}>RSVP</button>
      </div>
    </nav>
  );
};

export default Navbar;
