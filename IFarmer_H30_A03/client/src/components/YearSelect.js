import React, { useContext } from "react";
import { MyContext } from "./App";
import { ListContext } from "./App";

export default function YearSelect() {
  const [listContext, setListContext] = useContext(ListContext);
  const [context, setContext] = useContext(MyContext);
  const test = (e) => {
    setListContext("year");
    let year = e.target.value;

    if (year === "") {
      setListContext("main");
      fetch(`/movies`)
        .then((res) => res.json())
        .then((data) => {
          setContext(data.movies);
        });
    } else {
      fetch(`/years/${year}`)
        .then((res) => res.json())
        .then((data) => {
          setContext(data.movies[0]);
        });
    }
  };

  return (
    <div className="selectionInput">
      <label htmlFor="year">Select a year: </label>
      <input type="text" id="year" name="year" onChange={test} />
    </div>
  );
}
