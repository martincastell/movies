## Requirements and Wire frames:
[URL=MoviePage.png]

## Initial Component Breakdown
This is useful to gives us an idea of the structure of the page and some of the main
components we are going to need for the app. 
https://docs.google.com/drawings/d/1FuTy4jfHVppCUjzMFnBufD_v7LJvyiXPm2Uq7rghPYA/edit

## Initial State Breakdown
Based on the wire frame, let's try to identify all the data that we need to display in
our app. This will help us identify the data we are going to need for our app and it's
a starting point to decide how the state of the store will look like:
https://docs.google.com/drawings/d/1bLZ5jLliJgNx1oZfdIsItlVAjtergZ4vtX1nBBu9v3g/edit?usp=sharing

## Design state and create a mock state
Starting with a mock state lets you try the components without any external data, this allows
faster iterations and rapid prototyping. You can also use this mock data to build some tests.

There are many different ways to structure the state of the app, there's no right answer
but here are some general guidelines:
- Keep it simple.
- Avoid repeating data, repeated data means that you have to update it in different places.
- Keep nesting to a minimum, as your state becomes deeper with nested objects, it becomes
harder to copy and update the state.

Option A: 
```
{
	isFetching: false,
	location: 'Foster City, CA',
	genre: 'All',
	movies: [ 
		{
			id: 1,
			title: 'The Boss Baby',
			genres: [ 'Comedy', 'Animation' ],
			poster: 'https://s-media-cache-ak0.pinimg.com/originals/80/e8/e2/80e8e2758b6215d7efd049dd45ad7955.jpg',
			rating: 'PG',
			trailer: 'https://www.youtube.com/watch?v=tquIfapGVqs',
			duration: '1h 38m',
			images: [
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrgHPEwdxylS7kMaCD037C6YWTeeCRdHe7uc85DIrtNL69Ar1b',
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDQZZQyK6NvESsSdUeyr2gwYC0Vmvgv9ZBRCfz3JMN4_jqdEFS',
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2fkrgY_Nim3_6N_TiRgkbs4FudqbxW0fLKCMXEtQ9XmfdTLnT',
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI2kgbFR2hgfaImccbGYXJnDUq2F58nBBNYG0_8rK1Kf0ZjZOVBQ'
			],
			scores: [],
			showtimes: []
		} 
	],
	genres: ['All', 'Animation', 'Comedy', 'Horror', 'Suspense'],
	selectedMovieIndex: 0,
}
```
PROS:
- Simple.
- Easy to update.

CONS: 
- Not very scalable, everything is in the root which means that as we add more attributes it will get messier.
- Only one reducer for everything.

Option B: 
```
{
	entities: {
		user: {
			movieReactions: {
				1: 'like'
			}
		},
		movies: {
			1: {
				id: 1,
				title: 'The Boss Baby',
				genres: [ 'Comedy', 'Animation' ],
				poster: 'https://s-media-cache-ak0.pinimg.com/originals/80/e8/e2/80e8e2758b6215d7efd049dd45ad7955.jpg',
				rating: 'PG',
				trailer: 'https://www.youtube.com/watch?v=tquIfapGVqs',
				duration: '1h 38m',
				images: [
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrgHPEwdxylS7kMaCD037C6YWTeeCRdHe7uc85DIrtNL69Ar1b',
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDQZZQyK6NvESsSdUeyr2gwYC0Vmvgv9ZBRCfz3JMN4_jqdEFS',
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2fkrgY_Nim3_6N_TiRgkbs4FudqbxW0fLKCMXEtQ9XmfdTLnT',
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI2kgbFR2hgfaImccbGYXJnDUq2F58nBBNYG0_8rK1Kf0ZjZOVBQ'
				],
				scores: [],
				showtimes: []
			}
		},
		genres: [ 'Animation', 'Comedy', 'Drama', 'Horror', 'Suspense' ]
	},
	page: {
		isFetching: false,
		results: [ 1 ],				// This is an array of movie ids.
		location: 'Foster City, CA',
		genre: 'Comedy',
		selected: 1,				// The id of the selected movie.
	}
}
```
PRO:
- Extensible, we can later on add a second carousel of movies or a different page that uses the same movies and none of our existing state 
would need to change.
- The state can be split up into multiple smaller reducers.

CONS: 
- The state is harder to update once we get results because entities and page need to be updated at the same time.
- Harder to map the state to props, all the ids need to be looked up in the entities section of the state.
- Genres data is repeated in a couple of places but we can refactor later.
 
// TODO: Add Option C
 
## Creating the app
```
npm install -g create-react-app
create-react-app movies
```

## Setting up the repo
```
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:martincastell/movies.git
git push -u origin master
```

## Using the mock state
Lets add our fake data into a file (root.js) and import it into the index.js file.
I'm doing this in index.js, so that the App.js doesn't need to change later on when we update our state to be in redux. 
We pass down the state to the App component as a property called `state`. 
```
import ROOT_STATE from './state/root';

ReactDOM.render(
  <App state={ROOT_STATE} />,
  document.getElementById('root')
);
```

I also changed the App component to a functional component, this is not required but functional components feel a little 
bit more natural to me, I added a property into the page to make sure the state is wired correctly:
```
function App ({state}) {
  return (
    <div className="App">
      Movies playing near {state.page.location}
    </div>
  );
}
```

## Creating the MovieCarousel
First we need to decide what information we need in order to render the component(inputs) and the way that 
we are going to notify to my parent component that something happened (outputs). I'm ignoring the next and previous icons for now.
https://docs.google.com/drawings/d/10TlIXAZyt7DRAlGwAWFkU5A2ZI7djDpr0DyFyqZP5AQ/edit?usp=sharing

We identified that we need an array of movies as input, and we have to let our parent know whenever someone clicks on one of the movies.
```
function MovieCarousel({ movies, onClickMovie }) {
  return (<div className="movie-carousel">
    {movies.map((movie) => <div className="movie" key={movie.id} onClick={() => onClickMovie(movie)}>{movie.title}</div>)}
  </div>);
}
```

Then we use the our new component in the App.js:
```
import MovieCarousel from './components/MovieCarousel';

function App ({state}) {
  const movies = state.page.results.map((movieId) => state.entities.movies[movieId]);
  const onClickMovie = (movie) => console.log('The user clicked on a movie, we need to do something here', movie);

  return (
    <div className="App">
      Movies playing near {state.page.location}
      <MovieCarousel movies={movies} onClickMovie={onClickMovie} />
    </div>
  );
}
```

#Creating the MovieTile component
For the movie tile component we only need one input (`movie`) and we won't have any outputs. This component is useful because it saves us 
from writing all this markup whenever we need to display a tile, this will help keeping the MovieCarousel component clean and short.
```
function MovieTile({ movie }) {
  const genres = movie.genres.join(' / ');

  return (<div className="movie-tile">
    <div className="movie-tile__poster">
      <img src={movie.poster} alt={movie.title} />
    </div>
    <div className="movie-tile__title" title={movie.title}>{movie.title}</div>
    <div className="movie-tile__genres" title={genres}>{genres}</div>
  </div>);
}
```

Now we can use the MovieTile component in the MovieCarousel component:
```
 import MovieTile from './MovieTile';
 
 function MovieCarousel({ movies, onClickMovie }) {
   return (<div className="movie-carousel">
     {movies.map((movie) => <div className="movie-carousel__item" key={movie.id} onClick={() => onClickMovie(movie)}>
       <MovieTile movie={movie} />
     </div>)}
   </div>);
 }
```

I also added a CSS file for each component in order to make it look a little bit better:
```
 .movie-tile {
   display: flex;
   flex-direction: column;
   width: 120px;
   height: 260px;
 
   font-size: 13px;
 }
 
 .movie-tile__poster {
   display: flex;
   flex: 0 0 182px;
   margin-bottom: 8px;
 }
 
 .movie-tile__poster > img {
   width: 100%;
 }
 
 .movie-tile__title {
   flex: 0 0 auto;
   margin-bottom: 8px;
 }
 
 .movie-tile__genres {
   flex: 0 0 auto;
   color: lightslategray;
 
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
 }
```

#Creating the MovieDetails component
Built a simple version of the MovieDetails component in order to display the selected movie, we'll add more functionality later.
```
import React from 'react';
import './MovieDetails.css';

function MovieDetails({ movie }) {
  return (<div className="movie-details">
    <div className="movie-details__section movie-details-header">
      <div className="movie-details-header__title">{movie.title}</div>
      <div className="movie-details-header__sub-title">{movie.rating} {movie.genres.join(' / ')}</div>
    </div>

    <div className="movie-details__section">
      <a href={movie.trailer} target="_blank">Play trailer</a>
    </div>

    <div className="movie-details__section movie-reactions">
      <div>Like</div>
      <div>Dislike</div>
    </div>

    <div className="movie-details__section movie-scores">
      {movie.scores.map(score => <div className="movie-scores__item movie-score" key={score.source}>
        <div className="movie-score__source">{score.source}</div>
        <div className="movie-score__score">{score.score}</div>
      </div>)}
    </div>

  </div>);
}

export default MovieDetails;
```

To add it into our app, we just need to import it, find the selected movie in our state and add it to our template:
```
 ...
 import MovieDetails from './components/MovieDetails';
 ...
 let selectedMovie = state.entities.movies[state.page.selected];
 
   return (
     <div className="App">
       Movies playing near {state.page.location}
       <MovieCarousel movies={movies} onClickMovie={onClickMovie} />
       <MovieDetails movie={selectedMovie} />
     </div>
   );
 ...
```

#Creating the UserReaction component
This component will be used to set and display a reaction (like or dislike) 
```
 import React from 'react';
 import './UserReaction.css';
 
 function UserReaction({ reaction }) {
   return (<div className="user-reaction">
     <div className={`user-reaction__option -like ${reaction === 'like' ? 'is-selected' : ''}`}>
       <i className="fa fa-thumbs-up" aria-hidden="true"></i>
       Like
     </div>
     <div className={`user-reaction__option -dislike ${reaction === 'dislike' ? 'is-selected' : ''}`}>
       <i className="fa fa-thumbs-down" aria-hidden="true"></i>
       Dislike
     </div>
   </div>);
 }
 
 export default UserReaction;
```

We also take this information out from the state and pass it down to our components:
```
 let selectedMovieReaction = state.entities.user.movieReactions[state.page.selected];
```

#Setting up redux
It's time to replace our mock root state, first, we'll install redux and react-redux:
``` 
npm install --save redux
npm install --save react-redux
```

Then we need to create our reducers, each key in our old root state will become a reducer:
```
  import {combineReducers} from 'redux';
  import moviesReducer from './reducers/moviesReducer';
  import userReducer from './reducers/userReducer';
  import genresReducer from './reducers/genresReducer';
  import pageReducer from './reducers/pageReducer';
  
  const entitiesReducer = combineReducers({
    user: userReducer,
    movies: moviesReducer,
    genres: genresReducer
  });
  
  const rootReducer = combineReducers({
    entities: entitiesReducer,
    page: pageReducer
  });
  
  export default rootReducer;
```

You can nest reducers using the `combineReducers` function from redux.

Each reducer needs to return an initial state, let's use our mock state as the initial state for now:
``` 
import mockRoot from '../mockRoot';

function moviesReducer(state = mockRoot.entities.movies, action) {


  return state;
}

export default moviesReducer;

```

Now we need to setup the store in `index.js`:
``` 
...
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './state/rootReducer';
...

const store = createStore(rootReducer);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```
In order to connect the app to the store, you need to use the Provider component passing in the store.
The store is created by passing in a reducer.

# Connecting the App component to redux
Connect takes in two functions:
- mapStateToProps receives the state of the store and returns an object with the inputs to the component you are trying to connect.
```
 function mapStateToProps(state) {
   return {
     location: state.page.location,
     movies: state.page.results.map((movieId) => state.entities.movies[movieId]),
     selectedMovie: state.entities.movies[state.page.selected],
     selectedMovieReaction: state.entities.user.movieReactions[state.page.selected]
   };
 }
```

- mapDispatchToProps receives a `dispatch` function and it should return an object with functions that dispatch actions to the store.
Let's leave it empty for now and we'll cover it later.
```
 function mapDispatchToProps(dispatch) {
   return {};
 }
```

Finally we connect our App component to the store, to do this we need to update the inputs the App component receives and 
use the connect function from react-redux:
```
function App ({location, movies, selectedMovie, selectedMovieReaction}) {
  const onClickMovie = (movie) => console.log('The user clicked on a movie, we need to do something here', movie);
  return (
    <div className="App">
      Movies playing near {location}
      <MovieCarousel movies={movies} onClickMovie={onClickMovie} />
      <MovieDetails movie={selectedMovie} reaction={selectedMovieReaction} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
```
Note that the App inputs match the result from `mapStateToProps`. 

# Updating the state
Only reducers can update the state, whenever we need to do it, we send a message to the reducers asking them to update the state.

The way components can talk to the reducers is through the `mapDispatchToProps` function. This function receives as a parameter a dispatch
function and returns an object with functions that dispatch actions.

An action is an object that describes what we want the reducers to do, we need to make sure that we include all the information
the reducer will need to update the state. I have created two actions, the first one updates the selected movie on the page and the 
second one changes the user reaction to a movie:
``` 
export const SELECT_MOVIE = 'SELECT_MOVIE';
export const REACT_TO_MOVIE = 'REACT_TO_MOVIE';

export function selectMovie(movie) {
  return { type: SELECT_MOVIE, payload: movie };
}

export function reactToMovie(movie, reaction) {
  return { type: REACT_TO_MOVIE, payload: { movie, reaction }};
}
```

We use these actions in the `App.js` mapDispatchToProps:
``` 
function mapDispatchToProps(dispatch) {
  return {
    selectMovie: (movie) => dispatch(selectMovie(movie)),
    reactToMovie: (movie, reaction) => dispatch(reactToMovie(movie, reaction))
  };
}
```

These functions will be passed into the App component in the same way the props gets passed:
```
  ...
  function App ({location, movies, selectedMovie, selectedMovieReaction, selectMovie, reactToMovie}) {
  ...
```

Finally, we need to tell the reducers to do something when they see the actions:
``` 
import mockRoot from '../mockRoot';
import {SELECT_MOVIE} from '../../actions/movies/movieActions';

function pageReducer(state = mockRoot.page, { type, payload }) {
  switch (type) {
    case SELECT_MOVIE:
      return {...state, selected: payload.id };
      break;
    default:
      break;
  }
  return state;
}
```

Each reducer will receive every action that gets dispatched into the store, but they can choose to react 
to only the actions that are relevant for that reducer. For example, the userReducer is not interested in the
 `SELECT_MOVIE` action, so it will return the previous state, because nothing has changed:
```
 function userReducer(state = mockRoot.entities.user, { type, payload }) {
   switch (type) {
     case REACT_TO_MOVIE:
       let { movie, reaction } = payload;
       let movieReactions = { ...state.movieReactions, [movie.id]: reaction };
       return { ...state, movieReactions: movieReactions };
       break;
     default:
       break;
   }
 
   return state;
 }
```  

# Adding sass
I followed this guide to convert all of my css to sass: 
https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc

### Reducing boilerplate code with sass
Sass lets you chain selectors by nesting them using the `&` operator. 
This lets you write less code, but the end result will be a flat list of rules.
``` 
.movie-details {
  display: flex;
  ...

  &__section {
    padding: 12px;
    ...

    &.is-hidden {
      display: none;
    }
  }
}
```

This compiles to:
``` 
.movie-details {
  display: flex;
  ...
}
.movie-details__section {
  padding: 12px;
  ...
}
.movie-details__section.is-hidden {
  display: none;
}

```

You can also do regular nesting if you want to target a descendant, simply do:
```
  .my-parent {
    color: red;
    
    .title {
      font-size: 20px;
    }
    
    .my-children {
      color: blue;
    }    
  }
```

This compiles to:
```
 .my-parent {
  color: red;
 }
 .my-parent .title {
  font-size: 20px;
 }
 .my-parent .my-children {
   color: blue;
 }
```

### Sass variables
To declare a variable, use `$[VAR_NAME]` and assign a value. You can then use that variable multiple times.
```
 .movie-details {
   ...
   $border: 1px solid color(blueGrey, 100);
   border-top: $border;
   border-left: $border;
   border-right: $border;
 
   &__section {
    ...
     border-bottom: $border;
     ...
   }
 }
```

### Sharing variables, functions, placeholders and mixins
You can create a partial file, which is a sass file that doesn't get compiled into a css file by starting your file name with `_[FILE_NAME]`.

I created a `$palettes` variable which is a map, the key is the name of the palette and the value is another map with the shade and color value
for the colors in that palette, I took the palettes from material design: https://material.io/guidelines/style/color.html#color-color-palette.
See `_shared.scss`:
``` 
$palettes: (
  blue: (
      50: #E3F2FD,
      100: #BBDEFB,
      200: #90CAF9,
      300: #64B5F6,
      400: #42A5F5,
      500: #2196F3,
      600: #1E88E5,
      700: #1976D2,
      800: #1565C0,
      900: #0D47A1
  ),
  ...
  black: (
    500: #000000
  ),
  white: (
    500: #000000
  )
);

```

Then, I created a function to be able to easily obtain the values for the palettes, the shade will default to 500 if not provided:
```
@function color($palette, $shade: 500) {
  @return map-get(map-get($palettes, $palette), $shade);
}
```

In order to use this function, I need to import _shared.scss and then I can just call the function:
``` 
@import "../../shared";
.movie-details {
  color: color(grey, 300);
  
  border: 1px solid color(blue);
}
```

### Typography 
Create common classes for typography, I based them on material design typography: 
https://material.io/guidelines/style/typography.html#typography-styles.
It's not implemented yet, but we'll add media queries later to change the size of the font
based on the users's screen size.

```
$regular-font: Roboto, Arial, sans-serif;
$medium-font: RobotoMedium, Arial, sans-serif;
$typography: (
    display-3: 56px $regular-font,
    display-2: 45px $regular-font,
    display-1: 34px $regular-font,
    headline: 24px $regular-font,
    title: 20px $medium-font,
    subheading: (
        device: 16px $regular-font,
        desktop: 15px $regular-font,
    ),
    body-2: (
        device: 14px $medium-font,
        desktop: 13px $medium-font,
    ),
    body-1: (
        device: 14px $regular-font,
        desktop: 13px $regular-font,
    ),
    caption: 12px $regular-font
);


@function get-typography-styles() {
  @return map-keys($typography);
}

@mixin typography($style) {
  $styleAttrs: map-get($typography, $style);
  @if type-of($styleAttrs) == map {
    font: map-get($styleAttrs, desktop);
  } @else {
    font: $styleAttrs;
  }
}
```
A mixin is similar to a function, but it will let you generate multiple rules inside of it, 
those rules will be copied in when you include the mixin:
```
@import "shared";
@each $style in get-typography-styles() {
  .#{$style} {
    @include typography($style);
  }
}
```

This compiles to:
```
 .display-3 { font: 56px Roboto, Arial, sans-serif; }
 .display-2 { font: 45px Roboto, Arial, sans-serif; }
 .display-1 { font: 34px Roboto, Arial, sans-serif; }
 .headline { font: 24px Roboto, Arial, sans-serif; }
 .title { font: 20px RobotoMedium, Arial, sans-serif; }
 .subheading { font: 15px Roboto, Arial, sans-serif; }
 .body-2 { font: 13px RobotoMedium, Arial, sans-serif; }
 .body-1 { font: 13px Roboto, Arial, sans-serif; }
 .caption { font: 12px Roboto, Arial, sans-serif; }
```

I also made some adjustments to the overall layout:
``` 
<div className="app">
  <div className="app__header">
    Movies playing near {location}
  </div>
  <div className="app__movies">
    <MovieCarousel movies={movies} onSelectMovie={selectMovie} />
  </div>
  <div className="app__selected-movie">
    <div className="app__selected-movie__showtimes">
      <MovieShowtimes movie={selectedMovie} />
    </div>
    <div className="app__selected-movie__details">
      <MovieDetails movie={selectedMovie} reaction={selectedMovieReaction} onMovieReaction={reactToMovie} />
    </div>
  </div>
</div>
```
And CSS:
``` 
.app {
  color: color(grey, 900);
  @include typography(body-1);

  &__header {
    padding: 12px 24px;
  }

  &__movies {
    padding: 12px 24px;
    background: color(grey, 100);
  }

  &__selected-movie {
    padding: 12px 24px;
    display: flex;

    &__showtimes {
      flex: 3 1 auto;

      margin-right: 12px;
    }
    &__details {
      flex: 1 1 auto;
    }
  }
}
```
