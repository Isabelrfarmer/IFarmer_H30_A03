import React from "react";
import "../styles/movies.css";

export default function Actor(actors) {
  return (
    <div>
      <span>Actors:</span>
      {actors.actors.map((actor, i) => (
        <p key={i}>{actor}</p>
      ))}
    </div>
  );
}
