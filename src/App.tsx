import React, { useState, useCallback } from "react";
import EntryGate from "./components/EntryGate";
import Hero from "./components/Hero";
import ScratchReveal from "./components/ScratchReveal";
import Countdown from "./components/Countdown";
import OurStory from "./components/OurStory";
import Events from "./components/Events";
import Venue from "./components/Venue";
import RSVP from "./components/RSVP";
import Footer from "./components/Footer";
import MusicButton from "./components/MusicButton";
import FloatingCTA from "./components/FloatingCTA";
import PetalsCanvas from "./components/PetalsCanvas";

const App: React.FC = () => {
  const [gateOpen, setGateOpen] = useState(false);
  const [contentUnlocked, setContentUnlocked] = useState(false);

  const handleGateOpen = useCallback(() => {
    setGateOpen(true);
    setTimeout(() => {
      const el = document.getElementById("main-content");
      if (el) el.classList.add("visible");
    }, 200);
  }, []);

  const handleScratchComplete = useCallback(() => {
    setContentUnlocked(true);
  }, []);

  return (
    <>
      <MusicButton autoPlay={gateOpen} />

      {!gateOpen && <EntryGate onOpen={handleGateOpen} />}

      {gateOpen && <PetalsCanvas />}

      <div id="main-content">
        <Hero />
        <ScratchReveal onComplete={handleScratchComplete} />

        {contentUnlocked && (
          <>
            <Countdown />
            <OurStory />
            <Events />
            <Venue />
            <RSVP />
            <Footer />
          </>
        )}

        {contentUnlocked && <FloatingCTA />}
      </div>
    </>
  );
};

export default App;
