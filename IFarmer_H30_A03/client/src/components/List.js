import React, {  useState, useContext  } from "react";
import Movie from "./Movie";
import "../styles/movies.css";
import { ListContext } from "./App";

export default function List(movies) {
  const [viewMore, updateView] = useState(false);
  const [selectedMovie, updateSelectedMovie] = useState({
    movie: {
      Key: 0,
      Title: "",
      Genre: [],
      Actors: [],
      Year: 0,
      Runtime: 0,
      Revenue: 0,
    },
  });
  const [listContext, setListContext] = useContext(ListContext);
  let idToSelect;
  const displayMovieInfo = (e) => {
    e.preventDefault();
    idToSelect = e.target.id;

    fetch(`/movies/${idToSelect}`)
      .then((res) => res.json())
      .then((data) => {
        updateSelectedMovie((selectedMovie) => ({
          ...selectedMovie,
          movie: data.movies[0],
        }));
      });
  };

  const removeViewMore = () => {
    updateSelectedMovie((selectedMovie) => ({
      ...selectedMovie,
      movie: {},
    }));
  };

  return (
    <div>
      <div className={movies.movies.length !== 0 ? "parent" : ""}>
        {movies.movies.length !== 0 ? (
          movies.movies.map((movie, i) => {
            return selectedMovie.movie.Key !== movie.Key ? (
              <div className="movie" key={i}>
                <button
                  onClick={displayMovieInfo}
                  id={movie.Key}
                  className="viewMoreBtns"
                  href={`#${movie.Key}`}
                >
                  {viewMore ? "View Less" : "View More"}
                </button>

                {listContext === "main" ? (
                  <div>
                    {" "}
                    <p>
                      <span>Title: </span>
                      {movie.Title}
                    </p>
                    <p>
                      <span>Year: </span>
                      {movie.Year}
                    </p>
                  </div>
                ) : (
                  <div>
                    {" "}
                    <p>
                      <span>Title: </span>
                      {movie.Title}
                    </p>
                    <p>
                      <span>ID: </span>
                      {movie.Key}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="movie" key={i}>
                <button
                  onClick={removeViewMore}
                  id={movie.Key}
                  className="viewMoreBtns selectedBtn"
                >
                  {viewMore ? "View More" : "View Less"}
                </button>
                <Movie movie={selectedMovie} />
              </div>
            );
          })
        ) : (
          <div id="noMoviesFoundError">
            Sorry, there are no movies which match this selection.
          </div>
        )}
      </div>
    </div>
  );
}
