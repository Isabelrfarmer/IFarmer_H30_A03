import React from "react";
import "../styles/movies.css";

export default function Genre(genre) {
  return (
    <div>
      <span>Genres:</span>
      {genre.genres.map((genre, i) => (
        <p key={i}>{genre}</p>
      ))}
    </div>
  );
}
