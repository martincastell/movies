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
        poster: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRHk_CtG-C6nngOWXGNlmpA6uYLiOUAZFZO5vY8yfix-9sJRCGMbfHJtHS-Ujff-dMqZcra',
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
      },
      2: {
        id: 2,
        title: 'Beauty and the Beast',
        genres: [ 'Fantasy', 'Romance' ],
        poster: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSvMcs-FqOfL6v8vt2w8trDkwXaB2x47-V2HyuAkcWhCq-SwgfFMW85yp-zcdBN85_zx35L',
        rating: 'PG',
        trailer: 'https://www.youtube.com/watch?v=tquIfapGVqs',
        duration: '2h 19m',
        images: [
          'http://t2.gstatic.com/images?q=tbn:ANd9GcRfYpMZYI-nnFJZ6vmdH7w8qNCp_G2OwqWQqszSdhMbfLR_CHvi',
        ],
        scores: [],
        showtimes: []
      }
    },
    genres: [ 'Animation', 'Comedy', 'Drama', 'Horror', 'Suspense' ]
  },
  page: {
    isFetching: false,
    results: [ 1, 2 ],				// This is an array of movie ids.
    location: 'Foster City, CA',
    genre: 'All',
    selected: 1				// The id of the selected movie.
  }
};

export default ROOT;
