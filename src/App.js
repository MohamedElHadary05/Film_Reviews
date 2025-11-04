import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import download from "./img/download.webp";
import inception from "./img/inception.webp";
import OIP from "./img/OIP.webp";

const moviePosters = [download, inception, OIP];

import "./styles.css";

const userId = "admin";

function InputFilm({ onAddFilm }) {
  const [title, setTitle] = useState("");
  const [rate, setRate] = useState("1");
  const [review, setReview] = useState("");

  function handleAdd() {
    const newFilm = { title, rate, review };
    onAddFilm(newFilm);
    setTitle("");
    setRate("1");
    setReview("");
  }

  return (
    <div
      style={{
        background: "rgba(0, 0, 0, 0.7)",
        padding: "30px",
        borderRadius: "15px",
        marginBottom: "30px",
        backdropFilter: "blur(10px)",
      }}
    >
      <h2 style={{ color: "#ffd700", marginBottom: "20px", fontSize: "24px" }}>
        Add New Film Review
      </h2>
      <div style={{ marginBottom: "15px" }}>
        <label
          style={{
            display: "block",
            color: "#fff",
            marginBottom: "5px",
            fontWeight: "bold",
          }}
        >
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "2px solid #ffd700",
            background: "rgba(255, 255, 255, 0.9)",
            fontSize: "16px",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label
          style={{
            display: "block",
            color: "#fff",
            marginBottom: "5px",
            fontWeight: "bold",
          }}
        >
          Rate
        </label>
        <select
          id="rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "2px solid #ffd700",
            background: "rgba(255, 255, 255, 0.9)",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {"⭐".repeat(r)}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            color: "#fff",
            marginBottom: "5px",
            fontWeight: "bold",
          }}
        >
          Review
        </label>
        <input
          value={review}
          onChange={(e) => setReview(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "2px solid #ffd700",
            background: "rgba(255, 255, 255, 0.9)",
            fontSize: "16px",
          }}
        />
      </div>
      <button
        onClick={handleAdd}
        style={{
          background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
          border: "none",
          padding: "12px 30px",
          borderRadius: "25px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          color: "#000",
          boxShadow: "0 4px 15px rgba(255, 215, 0, 0.4)",
          transition: "transform 0.2s",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      >
        ADD REVIEW
      </button>
    </div>
  );
}

function FilmList() {
  const [films, setFilms] = useState([]);

  function addFilm(film) {
    setFilms((prev) => [...prev, film]);
  }

  function deleteFilm(index) {
    setFilms((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <InputFilm onAddFilm={addFilm} />

      <h2
        style={{
          color: "#ffd700",
          fontSize: "28px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        My Film Reviews
      </h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {films.map((film, index) => (
          <li
            key={index}
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "15px",
              backdropFilter: "blur(10px)",
              border: "2px solid #ffd700",
              position: "relative",
            }}
          >
            <label
              style={{
                color: "#ffd700",
                fontSize: "20px",
                fontWeight: "bold",
                display: "block",
                marginBottom: "10px",
              }}
            >
              {film.title}
            </label>
            <div style={{ color: "#fff", marginBottom: "10px" }}>
              Rating: {"⭐".repeat(parseInt(film.rate))}
            </div>
            <label style={{ color: "#ddd", fontSize: "16px" }}>
              {film.review}
            </label>
            <button
              onClick={() => deleteFilm(index)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "#ff4444",
                border: "none",
                color: "#fff",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#cc0000")}
              onMouseOut={(e) => (e.target.style.background = "#ff4444")}
            >
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1a1a1a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background movie posters */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          opacity: 0.15,
          zIndex: 0,
        }}
      >
        {moviePosters.map((poster, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              backgroundImage: "url(${poster})",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(3px)",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#ffd700",
            fontSize: "42px",
            marginBottom: "10px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
          }}
        >
          🎬 Film Review Box
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#ddd",
            marginBottom: "40px",
            fontSize: "18px",
          }}
        >
          Track and review your favorite movies
        </p>
        <FilmList />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
export default App;
