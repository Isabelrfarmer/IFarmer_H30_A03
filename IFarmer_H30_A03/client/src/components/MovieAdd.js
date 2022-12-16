import React, { useState } from "react";
import "../styles/movies.css";
import successAdd from "../images/successAdd.gif";
let errors = [];
let errorMsg = {
  titleError: "Please enter a title",
  yearError: "Please enter a numeric year",
  revenueError: "Please enter a numeric revenue",
  runtimeError: "Please enter a numeric runtime",
  genresError: "Please enter a list of comma seperated genres",
  actorsError: "Please enter a list of comma seperated actors",
};
let title, year, runtime, revenue, genres, actors;

export default function MovieAdd() {
  const [viewForm, updateFormView] = useState(false);
  const [showMovieAddedMsg, setshowMovieAddedMsg] = useState(false);

  const toggleForm = () => {
    updateFormView((viewForm) => !viewForm);
  };

  const isValidForm = () => {
    let isValid = true;
    errors = [];

    if (title === "") {
      errors.push("titleError");
      isValid = false;
    }
    if (year === "") {
      errors.push("yearError");
      isValid = false;
    }
    if (revenue === "") {
      errors.push("revenueError");
      isValid = false;
    }
    if (runtime === "") {
      errors.push("runtimeError");
      isValid = false;
    }
    if (genres === "") {
      errors.push("genresError");
      isValid = false;
    }
    if (actors === "") {
      errors.push("actorsError");
      isValid = false;
    }
    if (runtime !== "") {
      if (!Number.isInteger(Number(runtime))) {
        errors.push("runtimeError");
        isValid = false;
      }
    }
    if (revenue !== "") {
      if (!Number.isInteger(Number(revenue))) {
        errors.push("revenueError");
        isValid = false;
      }
    }
    if (year !== "") {
      if (!Number.isInteger(Number(year))) {
        errors.push("yearError");
        isValid = false;
      }
    }

    return isValid;
  };

  const setMovieInfo = () => {
    genres = genres.split(",");
    actors = actors.split(",");

    let data = {
      Key: 0,
      Title: title,
      Genre: genres,
      Actors: actors,
      Year: year,
      Runtime: runtime,
      Revenue: revenue,
    };
    return data;
  };

  const addMovie = (e) => {
    e.preventDefault();
    title = document.querySelector("#title").value;
    year = document.querySelector("#year").value;
    runtime = document.querySelector("#runtime").value;
    revenue = document.querySelector("#revenue").value;
    genres = document.querySelector("#genres").value;
    actors = document.querySelector("#actors").value;

    if (isValidForm()) {
      let movieToAdd = setMovieInfo();
      fetch("/movies", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieToAdd),
      }).catch((error) => console.log(error.stack));

      updateFormView(false);
      setshowMovieAddedMsg(true);
      setTimeout(function () {
        setshowMovieAddedMsg(false);
      }, 3800);
    } else {
      [...document.querySelectorAll(".formErrorMsg")].map(
        (i) => (i.innerHTML = "")
      );
      for (let i = 0; i < errors.length; i++) {
        for (var key in errorMsg) {
          var value = errorMsg[key];
          if (errors[i] === key) {
            document.querySelector(`#${key}`).innerHTML = value;
          }
        }
      }
    }
  };

  return (
    <div id="movieAddFormDiv">
      <input type="button" value="Add movie" onClick={toggleForm} />{" "}
      <div>
        {showMovieAddedMsg ? (
          <p id="successMovieAdd">
            <img src={successAdd} id="successMovieAddImg" alt="Movie added"></img> Movie added!
          </p>
        ) : (
          <></>
        )}
      </div>
      <div>
        {viewForm ? (
          <div id="movieAdd">
            <form onSubmit={addMovie} className="formGrid">
              <div>
                <label>Title:</label>
                <input type="text" id="title" />
                <div id="titleError" className="formErrorMsg"></div>
              </div>

              <div>
                <label>Year:</label>
                <input type="text" id="year" />
                <div id="yearError" className="formErrorMsg"></div>
              </div>

              <div>
                <label>Runtime:</label>
                <input type="text" id="runtime" />
                <div id="runtimeError" className="formErrorMsg"></div>
              </div>

              <div>
                <label>Revenue:</label>
                <input type="text" id="revenue" />
                <div id="revenueError" className="formErrorMsg"></div>
              </div>

              <div>
                <label>Genre(s):</label>
                <input type="text" id="genres" />
                <div id="genresError" className="formErrorMsg"></div>
              </div>

              <div>
                <label>Actor(s):</label>
                <input type="text" id="actors" />
                <div id="actorsError" className="formErrorMsg"></div>
              </div>
            </form>
            <input
              type="submit"
              value="Add"
              id="addMovieBtn"
              onClick={addMovie}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
