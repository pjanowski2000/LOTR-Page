import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Books from './ui/books/Books'
import Home from './ui/Home'
 import Movies from './ui/movies/Movies'
import Nav from './ui/Nav'
import { getQuotes} from './state/store/ducks/quotes/actions';
import { connect } from 'react-redux';
function App({getQuotes}) {
  useEffect(() => {
    getQuotes();
  }, [getQuotes]);
  return (
    <Router>
    <div className="App">
    
      <Nav/>
      <Switch>
      <Route path='/' exact component={Home}    />
      <Route path='/books' component={Books}    />
      <Route path='/movies' component={Movies}    />   
      </Switch>
    </div>
   </Router> )}

export default connect(null, { getQuotes})(App)

