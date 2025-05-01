import React, { useState } from "react";
import axios from "axios";
import "./Vaer.css";

const API_KEY = "ВСТАВЬ_СВОЙ_API_КЛЮЧ";

const Vaer = ({ onTilbake }) => {
  const [by, setBy] = useState("");
  const [data, setData] = useState(null);

  const hentVaer = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${by}&units=metric&lang=no&appid=${API_KEY}`
      );
      setData(res.data);
    } catch (error) {
      alert("Fant ikke byen. Prøv igjen.");
      setData(null);
    }
  };

  return (
    <div className="vaer-container">
      <h2 className="vaer-title">Været i din by</h2>
      <div className="vaer-controls">
        <input
          type="text"
          placeholder="F.eks. Oslo"
          value={by}
          onChange={(e) => setBy(e.target.value)}
        />
        <button onClick={hentVaer}>Søk</button>
      </div>
      {data && (
        <div className="vaer-result">
          <h3>{data.name}, {data.sys.country}</h3>
          <p>🌡 Temperatur: {data.main.temp}°C</p>
          <p>☁ Vær: {data.weather[0].description}</p>
          <p>💨 Vind: {data.wind.speed} m/s</p>
        </div>
      )}
      <button className="tilbake-button" onClick={onTilbake}>Tilbake</button>
    </div>
  );
};

export default Vaer;
