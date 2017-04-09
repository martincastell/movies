// Adding mock data so that we can build our components without worrying about the state for a while.
// We can replace this with redux later
const ROOT = {
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
    selected: 1				// The id of the selected movie.
  }
};

export default ROOT;
