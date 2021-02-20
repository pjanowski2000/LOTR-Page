
import React from 'react';
import { connect } from 'react-redux';
import selectors from "../state/store/ducks/quotes/selectors" ;

const Home=({quote})=>{
 
  
    return(
    <div>
      <h1>Welcome to the One Page to Rule Them All</h1>
      <h2>Your random quote is </h2>
      { quote? <h2>{`"${quote.dialog}"`}</h2>:null}
    </div>)
  };

  const mapStateToProps = state => ({ quote: selectors.randomQuote(state) });


  export default connect(mapStateToProps, )(Home)
