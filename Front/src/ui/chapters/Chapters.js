import React, {  useState } from 'react';
import { connect } from 'react-redux';
import selectors from "../../state/store/ducks/chapters/selectors" ;
import { delChapters} from '../../state/store/ducks/chapters/actions';
import EditChapter from './EditChapter'
import Form from './Form'
const Chapters = ({ selectedChapters, book,delChapters }) => {
    const [edit, setedit] = useState(null)
    const view = selectedChapters(book.id).map((chapter,index) => {
    const handleEdit = (id) => {
            setedit(id)
        }

        return (<div key={chapter.id}> 
        {(index+1)+". "+chapter.chapterName}
        <button onClick={() => delChapters(chapter.id)}>Delete</button>
        <button onClick={() => handleEdit(chapter.id)}>Edit</button>
        {edit === chapter.id ? <EditChapter id={chapter.id} book={book.id} edited={setedit}/> : null }
         </div>)

    })

    return (
        <>  
            
            {view}
            <Form book={book.id}/>
        </>
    )
    }

    const mapStateToProps = (state) => {
        return {
            selectedChapters: (id) => selectors.selectedChapters(state,id)
        }
    }
    
      

export default connect(mapStateToProps, {delChapters})(Chapters)