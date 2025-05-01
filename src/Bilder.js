import React, { useState } from "react";
import axios from "axios";
import "./Bilder.css";

const NASA_API_KEY = "DEMO_KEY"; // Замени на свой API-ключ

const getRandomDate = () => {
  const start = new Date(2010, 0, 1);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().split("T")[0];
};

const Bilder = ({ onTilbake }) => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRandomImage = async () => {
    setLoading(true);
    try {
      const date = getRandomDate();
      const res = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`
      );
      if (res.data.media_type === "image") {
        setImages([res.data]);
      } else {
        fetchRandomImage();
      }
    } catch (error) {
      console.error("Feil:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://images-api.nasa.gov/search?q=${encodeURIComponent(searchTerm)}&media_type=image`
      );
      const items = res.data.collection.items;
      const formatted = items.map(item => ({
        url: item.links[0].href,
        title: item.data[0].title,
        description: item.data[0].description
      }));
      setImages(formatted);
    } catch (error) {
      console.error("Feil:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bilder-container">
      <h2 className="bilder-title">NASA Bilder</h2>
      <div className="bilder-controls">
        <input
          type="text"
          placeholder="Skriv f.eks. Jupiter"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Søk</button>
        <button onClick={fetchRandomImage}>Tilfeldig bilde</button>
      </div>
      {loading && <p>Laster inn...</p>}
      <div className="bilder-grid">
        {images.map((img, idx) => (
          <div key={idx} className="bilder-card">
            <img src={img.url} alt={img.title} />
            <h4>{img.title}</h4>
            <p>{img.description}</p>
          </div>
        ))}
      </div>
      <button className="tilbake-button" onClick={onTilbake}>Tilbake</button>
    </div>
  );
};

export default Bilder;
