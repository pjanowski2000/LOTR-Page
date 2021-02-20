import React, { useEffect ,useState} from 'react';
import { connect } from 'react-redux';
import { getBooks, delBooks } from '../../state/store/ducks/books/actions';
import Form from './Form'
import { getChapters } from '../../state/store/ducks/chapters/actions';
import selectors from "../../state/store/ducks/books/selectors" ;
import EditBook from './EditBook';
import Chapters from '../chapters/Chapters'
const Books = ({books,getBooks,getChapters,delBooks}) => {
    const [isedit, setisedit] = useState(null)
    const [isexpand, setisexpand] = useState(null)
    
    useEffect(() => {
        getBooks();
        getChapters();
      }, [getChapters, getBooks]);
    
    
    
    const handleEdit = (id) => {
        setisedit( id )
    }
    const handleExpand = (id) => {
        setisexpand( id )
    }
    
        //const  books  = this.props.books
        return (
            <div>
                <Form/>
                {books.map(book =>
                    <React.Fragment key={book.id}>

                        <h1>
                            {book.name}

                            <button onClick={() => delBooks(book.id)}>Delete</button>
                            <button onClick={() => handleEdit(book.id)}>Edit</button>
                            { isedit === book.id ? <EditBook id={book.id} edited={handleEdit}/> : null }
                            { isexpand === book.id ? <Chapters  book={book} expanded={handleEdit}/> :  <button onClick={() => handleExpand(book.id)}>Show chapters</button> }
                             

                        </h1>
                    </React.Fragment>
                )}
               
            </div>
        )
    
}

const mapStateToProps = state => ({ books: selectors.allBooks(state) });


export default connect(mapStateToProps, { getBooks, delBooks,getChapters})(Books)