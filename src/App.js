import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

const Films = (props) => {
  let FavoriteFilms = props.fav;
  return (
    <>
      {props.films.map((film, index) => (
        <div className="image m-1 d-flex flex-fill justify-content-center">
          <img src={film.Poster} style={{padding: 0, margin: 0}} alt='movie'></img>
          <div className="over d-flex align-items-center justify-content-center"
          onClick={() => props.doFavClick(film)}
          >
            <FavoriteFilms />
          </div>
        </div>
      ))}
    </>
  );
};

const SearchField = (props) => {
  return (
    <div className="col col-xs-4">
      <input 
        className='form-control'
        onChange={(event) => props.setSearchEntry(event.target.value)}
        value={props.value}
        placeholder="Find a movie..."
        /> 
    </div>
  );
};

const AddFilmToFavorite = () => {
  return (
    <>
      <span className="mr-2">
        Add to Favorites
      </span>
      <svg
        width='1vw'
        height="1vw"
        viewBox="0 0 20 20"
        class="bi bi-heart-fill"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill-rule="evenodd"d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>

      </svg>
    </>
  );
};

const DeleteFilmFromFavorite = () => {
  return (
    <>
      <span className='mr-2'>
        Delete Favorite
      </span>
      <svg
        width="1vw"
        height="1vw"
        viewBox="0 0 20 20"
        class="bi bi-x-square"
        fill='red'
        xmlns="http://www.w3.org/2000/svg"
      >
      <path
        fill-rule='evenodd'
        d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'
      />
      <path 
        fill-rule="evenodd"
        d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
      />
      <path
        fill-rule="evenodd"
        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </>
  );
};

const MovieApplication = () => {
  const [movies, setMovies] = useState([]);
  const [searchEntry, setSearchEntry] = useState("");

  const [favorited_films, setFavFilms] = useState([]);

  const processFilmSearch = async() => {
    const api_path = `https://www.omdbapi.com/?s=${searchEntry}&apikey=dc2fc6e9`;

    const api_call = await fetch(api_path);
    const api_result = await api_call.json();

    if (api_result.Search) {
      setMovies(api_result.Search);
    }
  };

  useEffect(() => {
		processFilmSearch(searchEntry);
    const movieFavorites = JSON.parse(
			localStorage.getItem('film favorites')
		);
    if (movieFavorites) {
      setFavFilms(movieFavorites);
    }
	}, [searchEntry]);

	const favoriteAFilm = (film) => {
		const more_favorited = [...favorited_films, film];
		setFavFilms(more_favorited);
		localStorage.setItem('film favorites', JSON.stringify(more_favorited));
	};

	const unfavoriteAFilm = (film) => {
		const more_favorited = favorited_films.filter(function(fav_film) {
      return (fav_film.imdbID !== film.imdbID);
    });

		setFavFilms(more_favorited);
		localStorage.setItem('film favorites', JSON.stringify(more_favorited));
	};

  let divStyle2 = {
    display: "flex",
    alignItems: "center",

  };
  
  return (
    <div className="container-fluid movie-app">
      <div style={divStyle2}>
        <div className='col'>
          <h1>Film Listing</h1>
        </div>
        <SearchField searchEntry={searchEntry} setSearchEntry={setSearchEntry} />  
      </div>
      <div className="row" style={{width: "100vw"}}>
        <Films films={movies} fav={AddFilmToFavorite}
        doFavClick={favoriteAFilm}
        />
      </div>
      <div className={"divStyle2"}>
        <div className="col">
          <h1>Your Favorite Films</h1>
        </div>
      </div>
      <div className="row">
        <Films films={favorited_films} doFavClick={unfavoriteAFilm} fav={DeleteFilmFromFavorite} /> 
      </div>
    </div>
  );
};

export default MovieApplication;
