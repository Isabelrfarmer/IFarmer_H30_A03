import React, { useContext } from "react";
import { MyContext } from "./App";

export default function ActorSelect() {
  const [context, setContext] = useContext(MyContext);

  const test = (e) => {
    e.preventDefault();
    let actorName = e.target.value;

    if (actorName === "") {
      fetch(`/movies`)
        .then((res) => res.json())
        .then((data) => {
          setContext(data.movies);
        });
    } else {
      fetch(`/actors/${actorName}`)
        .then((res) => res.json())
        .then((data) => {
          setContext(data.movies[0]);
        });
    }
  };

  return (
    <div className="selectionInput catTitle">
      <label htmlFor="actorName">Select an actor: </label>
      <input type="text" id="actorName" name="actor" onChange={test} />
    </div>
  );
}
