import React, { useContext } from "react";
import { MyContext } from "./App";

export default function ActorSelect() {
  const [context, setContext] = useContext(MyContext);

  const test = (e) => {
    e.preventDefault();
    let title = e.target.value;

    if (title === "") {
      fetch(`/movies`)
        .then((res) => res.json())
        .then((data) => {
          setContext(data.movies);
        });
    } else {
      fetch(`/movieByTitle/${title}`)
        .then((res) => res.json())
        .then((data) => {
          setContext(data.movies[0]);
        });
    }
  };

  return (
    <div className="selectionInput">
      <label htmlFor="movieTite" className="catTitle">
        Select a title:{" "}
      </label>
      <input type="text" id="movieTite" name="title" onChange={test} />
    </div>
  );
}
