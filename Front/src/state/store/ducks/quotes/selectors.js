const allQuotes = state => {
  return state.entities.quotes.allIds.map(id => state.entities.quotes.byId[id]);
};
const selectedQuotes = (state, movie_id) => {
  const Quotes = state.entities.quotes.allIds.filter(id => state.entities.quotes.byId[id].movie === movie_id).map(id => state.entities.quotes.byId[id]);
  return Quotes
};
const randomQuote =(state) =>{
  const random_id=state.entities.quotes.allIds[Math.floor(Math.random() * state.entities.quotes.allIds.length)] 
  const quote=state.entities.quotes.byId[random_id]
  return quote
}
const selectors = {allQuotes, selectedQuotes,randomQuote};

export default selectors;
