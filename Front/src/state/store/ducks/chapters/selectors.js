const allChapters = state => {
  return state.entities.chapters.allIds.map(id => state.entities.chapters.byId[id]);
};
const selectedChapters = (state, book_id) => {
  const chapters = state.entities.chapters.allIds.filter(id => state.entities.chapters.byId[id].book === book_id).map(id => state.entities.chapters.byId[id]);
  return chapters
};

const selectors = {allChapters, selectedChapters};

export default selectors;
