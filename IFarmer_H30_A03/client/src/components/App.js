import "../styles/App.css";
import React, { useEffect, useState, createContext } from "react";
import List from "./List";
import MovieAdd from "./MovieAdd";
import ActorSelect from "./ActorSelect";
import YearSelect from "./YearSelect";
import TitleSelect from "./TitleSelect";

export const MyContext = createContext();
export const ListContext = createContext();

function App() {
  const [context, setContext] = useState([{}]);
  const [listContext, setListContext] = useState("main");

  useEffect(() => {
    fetch(`/movies`)
      .then((res) => res.json())
      .then((data) => {
        setContext(data.movies);
      });
  }, []);

  return (
    <MyContext.Provider value={[context, setContext]}>
      <ListContext.Provider value={[listContext, setListContext]}>
        <div>
          <h1>Select & view movies below</h1>
          <div className="userInputArea">
            <MovieAdd />
            <ActorSelect />
            <YearSelect />
            <TitleSelect />
          </div>
          {context[0] && Object.keys(context[0]).length === 0 ? (
            <p id="loadingMessage">Loading...</p>
          ) : (
            <List movies={context} />
          )}
        </div>
      </ListContext.Provider>
    </MyContext.Provider>
  );
}

export default App;
