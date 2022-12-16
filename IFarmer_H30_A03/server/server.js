const express = require("express"),
  path = require("path"),
  fs = require("fs");
const app = express();
const PORT = 8888;
const CLIENTFOLDER = "client";
const movies = require("./data/IMDBmovieData.json");
app.use(express.static(path.join(__dirname, CLIENTFOLDER, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getNewMovieId = () => {
  let allIds = movies.map(function (d) {
    return parseInt(d.Key);
  });
  let id = Math.max(...allIds) + 1;
  return id;
};

app.get("/movies", (req, res) => {
  movies.sort((a, b) => a.Title.localeCompare(b.Title));
  res.json({ movies: movies });
});

app.get("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movieToDisplay = movies.find((movie) => movie.Key === id);
  res.json({ movies: [movieToDisplay] });
});

app.get("/actors/:name", (req, res) => {
  const name = req.params.name;
  let actorsMovies = [];

  for (let i = 0; i < movies.length; i++) {
    for (let k = 0; k < movies[i].Actors.length; k++) {
      if (movies[i].Actors[k].toLowerCase().includes(name.toLowerCase())) {
        actorsMovies.push(movies[i]);
      }
    }
  }

  res.json({ movies: [actorsMovies] });
});

app.get("/years/:year", (req, res) => {
  const year = req.params.year;
  let yearMovies = [];

  for (let i = 0; i < movies.length; i++) {
    if (movies[i].Year.toString().includes(year)) {
      yearMovies.push(movies[i]);
    }
  }

  res.json({ movies: [yearMovies] });
});

app.get("/movieByTitle/:movieTitle", (req, res) => {
  const title = req.params.movieTitle;
  let titleMovies = [];
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].Title.toLowerCase().includes(title.toLowerCase())) {
      titleMovies.push(movies[i]);
    }
  }

  res.json({ movies: [titleMovies] });
});

app.post("/movies", (req, res) => {
  try {
    let newMovie = req.body;
    newMovie.Key = getNewMovieId();
    movies.push(newMovie);
    let data = JSON.stringify(movies);
    fs.writeFile("./data/IMDBmovieData.json", data, (err) => {
      console.log(err);
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port${PORT}`);
});
