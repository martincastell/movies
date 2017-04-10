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
