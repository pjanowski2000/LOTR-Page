import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getMovies, delMovies } from '../../state/store/ducks/movies/actions';
import Form from './Form'
import { getQuotes} from '../../state/store/ducks/quotes/actions';
import selectors from "../../state/store/ducks/movies/selectors";
import EditMovies from './EditMovies';
import Quotes from '../quotes/Quotes'
const Movies = ({ movies, getQuotes, delMovies,getMovies }) => {
    const [isedit, setisedit] = useState(null)
    const [isexpand, setisexpand] = useState(null)
    const [add, setadd] = useState(false)
    useEffect(() => {
        getMovies();
        getQuotes();
    }, [getMovies,getQuotes]);

    const handleAdd = (statement) => {
        setadd(statement)
    }

    const handleEdit = (id) => {
        setisedit(id)
    }
    const handleExpand = (id) => {
        setisexpand(id)
    }

    return (
        <div>
            <h1>
            MOVIES
            </h1>    
            
            {movies.map(movie => {
                const { name, runtimeInMinutes, budgetInMillions, academyAwardNominations, academyAwardWins, boxOfficeRevenueInMillions, rottenTomatesScore, id } = movie
                return (
                    <React.Fragment key={id}>

                        <div className="Movie">
                            <h1>
                                {`"${name}"`}
                            </h1>
                            { isedit === movie.id ? <EditMovies id={movie.id} edited={handleEdit} movie={movie}/> : <button onClick={() => handleEdit(movie.id)}>Edit Movie</button> }
                            <button onClick={() => delMovies(movie.id)}>Delete Movie</button>
                            <ul type="none">
                                <li>  {`Time: ${runtimeInMinutes} minutes`} </li>
                                <li> {`Budget: ${budgetInMillions} millions`} </li>
                                <li> {`Box Office: ${boxOfficeRevenueInMillions} millions`} </li>
                                <li> {`Acadeny Award Nominations: ${academyAwardNominations}`} </li>
                                <li> {`Acadeny Award Wins: ${academyAwardWins}`} </li>
                                <li> {`Score by Rotten Tomatoes: ${rottenTomatesScore} points`} </li>
                            </ul>
                          
                           
                            { isexpand === movie.id ? <Quotes  movie={movie} expanded={handleEdit}/> :  <button onClick={() => handleExpand(movie.id)}>Show Quotes</button> }

                        </div>
                    </React.Fragment>)})}
        { add ? <Form setadd={setadd}/> :  <button onClick={() => handleAdd(true)}>Add Movie</button> }
        </div>
    )

}

const mapStateToProps = state => ({ movies: selectors.allMovies(state) });


export default connect(mapStateToProps, { getMovies, delMovies, getQuotes })(Movies)