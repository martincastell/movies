## Requirements and Wire frames:
[URL=MoviePage.png]

## Initial Component Breakdown
This is useful to gives us an idea of the structure of the page and some of the main
components we are going to need for the app. [URL=ComponentBreakdown.png]

## Initial State Breakdown
Based on the wire frame, let's try to identify all the data that we need to display in
our app. This will help us identify the data we are going to need for our app and it's
a starting point to decide how the state of the store will look like. [URL=StateBreakdown.png]

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
			title: 'The Boss Baby,
			genres: [ 'Comedy', 'Animation' ],
			poster: 'https://s-media-cache-ak0.pinimg.com/originals/80/e8/e2/80e8e2758b6215d7efd049dd45ad7955.jpg',
			rating: 'PG',
			trailer: 'https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=22&cad=rja&uact=8&ved=0ahUKEwim36ShsJbTAhUL1GMKHbkMD9UQryQI7QIoADAV&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D-5DaJyxF5do&usg=AFQjCNGfhJLVszAV4BlfdHYAUOnzv6FA9g&bvm=bv.152174688,d.cGc',
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
				title: 'The Boss Baby,
				genres: [ 'Comedy', 'Animation' ],
				poster: 'https://s-media-cache-ak0.pinimg.com/originals/80/e8/e2/80e8e2758b6215d7efd049dd45ad7955.jpg',
				rating: 'PG',
				trailer: 'https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=22&cad=rja&uact=8&ved=0ahUKEwim36ShsJbTAhUL1GMKHbkMD9UQryQI7QIoADAV&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D-5DaJyxF5do&usg=AFQjCNGfhJLVszAV4BlfdHYAUOnzv6FA9g&bvm=bv.152174688,d.cGc',
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
- Extensible, we can later on add a second carousel of movies or a different page that uses the same movies and none of our existing state would need to change.
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

