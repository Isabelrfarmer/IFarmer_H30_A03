import React, { useContext } from "react";
import "../styles/movies.css";
import Actor from "./Actor";
import Genre from "./Genre";
import { ListContext } from "./App";

export default function Movie(movie) {
  const [listContext, setListContext] = useContext(ListContext);
  let x = movie.movie;

  return (
    <div>
      <p>
        <span>Title: </span>
        {x.movie.Title}
      </p>
      {listContext === "main" ? (
        <p>
          <span>Year: </span>
          {x.movie.Year}
        </p>
      ) : null}

      <p>
        <span>Runtime: </span>
        {x.movie.Runtime}
      </p>
      <p>
        <span>Revenue: </span>
        {x.movie.Revenue}
      </p>
      <Actor actors={x.movie.Actors} />
      <Genre genres={x.movie.Genre} />
    </div>
  );
}
