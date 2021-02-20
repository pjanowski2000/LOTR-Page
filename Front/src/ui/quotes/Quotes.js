import React, {  useState } from 'react';
import { connect } from 'react-redux';
import selectors from "../../state/store/ducks/quotes/selectors" ;
import { delQuotes} from '../../state/store/ducks/quotes/actions';
import EditQuotes from './EditQuotes'
import Form from './Form'
const Quotes = ({ selectedQuotes, movie,delQuotes }) => {
    const [edit, setedit] = useState(null)
    const handleEdit = (id) => {
        setedit(id)
    }
    
    const view = selectedQuotes(movie.id).map((quote) => {
        

        return (<div key={quote.id}> 
        {quote.dialog}
        <button onClick={() => delQuotes(quote.id)}>Delete</button>
        <button onClick={() => handleEdit(quote.id)}>Edit</button>
        {edit === quote.id ? <EditQuotes quote={quote} edited={setedit}/> : null }
         </div>)

    })
    
    return (
        <>  
            
            {view}
            <Form movie={movie.id}/>
        </>
    )
    }

    const mapStateToProps = (state) => {
        return {
            selectedQuotes: (id) => selectors.selectedQuotes(state,id)
           
        }
    }
    
      

export default connect(mapStateToProps, {delQuotes})(Quotes)