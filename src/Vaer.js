import React, { useState } from "react";
import axios from "axios";

const API_KEY = "59f5b8da94793c89caed7535088b1f52 "; 

const Vaer = () => {
  const [by, setBy] = useState("");
  const [data, setData] = useState(null);

  const hentVaer = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${by}&units=metric&appid=${API_KEY}&lang=no`
      );
      setData(res.data);
    } catch (error) {
      alert("Fant ikke byen. Prøv igjen.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Været i din by</h2>
      <input
        type="text"
        placeholder="Skriv bynavn"
        value={by}
        onChange={(e) => setBy(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "1rem" }}
      />
      <button onClick={hentVaer}>Søk</button>

      {data && (
        <div style={{ marginTop: "2rem" }}>
          <h3>{data.name}, {data.sys.country}</h3>
          <p>Temperatur: {data.main.temp}°C</p>
          <p>Vær: {data.weather[0].description}</p>
          <p>Vind: {data.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Vaer;
