const allBooks = state => {
  return state.entities.books.allIds.map(id => state.entities.books.byId[id]);
};

const selectors = { allBooks };

export default selectors;
