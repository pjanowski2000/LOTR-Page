const allMovies= state => {
  return state.entities.movies.allIds.map(id => state.entities.movies.byId[id]);
};

const selectors = { allMovies };

export default selectors;
