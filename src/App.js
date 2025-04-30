import React, { useState } from "react";
import Bilder from "./Bilder";
import Vaer from "./Vaer"; 
function App() {
  const [valg, setValg] = useState(null); // null | 'bilder' | 'vaer'

  if (valg === "bilder") return <Bilder />;
  if (valg === "vaer") return <Vaer />;

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Velg funksjon</h1>
      <button onClick={() => setValg("bilder")} style={{ margin: "1rem" }}>
        Se bilder fra NASA
      </button>
      <button onClick={() => setValg("vaer")} style={{ margin: "1rem" }}>
        Sjekk været
      </button>
    </div>
  );
}

export default App;
