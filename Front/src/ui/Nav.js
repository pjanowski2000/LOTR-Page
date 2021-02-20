import React from 'react';
import {Link} from 'react-router-dom';
const  Nav=()=> {
    const navStyle={
        color: "white"
    }
  return (  
      <nav> 
       <Link style={navStyle} to='/'>
      <h3 >Lotr Compendium</h3>
      </Link>
      <ul className="nav-links">
      <Link style={navStyle} to='/books'>
        <li>Books</li>
        </Link>
        <Link style={navStyle} to='/movies'>
        <li>Movies</li>
        </Link>
      </ul>
      </nav>
  )
   }


export default Nav;
