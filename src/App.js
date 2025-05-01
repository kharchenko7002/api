import React, { useState } from "react";
import Bilder from "./Bilder";
import Vaer from "./Vaer";
import "./App.css";

function App() {
  const [valg, setValg] = useState(null);

  if (valg === "bilder") return <Bilder onTilbake={() => setValg(null)} />;
  if (valg === "vaer") return <Vaer onTilbake={() => setValg(null)} />;

  return (
    <div className="app-container">
      <h1 className="app-title">Velg funksjon</h1>
      <div className="button-group">
        <button className="menu-button blue" onClick={() => setValg("bilder")}>
          Se bilder fra NASA
        </button>
        <button className="menu-button green" onClick={() => setValg("vaer")}>
          Sjekk været
        </button>
      </div>
    </div>
  );
}

export default App;
