import React from 'react';
import { useFormik}  from 'formik'; 
import {connect} from "react-redux";
import {putChapters} from '../../state/store/ducks/chapters/actions'
const EditChapter=({putChapters,book,id,edited}) =>{
  
    const formik=useFormik({
        initialValues:{
           chapterName:'',
            id: id,
            book:book     
        },
        validate: values=>{
            let errors={};
            if(!values.chapterName){
                errors.chapterName="Pole chaptersName nie moze byc puste"
            }
           
           return errors
        },
    
    onSubmit: values=>{
        console.log(values);
        edited(null)
        putChapters(values)
        formik.resetForm({
            values: { chapterName:'',id:id, book:book}, 
          });
    },
    
   
    })
    return (
        <>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <div>
            <label htmlFor="text">Chapter name </label>
            <input id="chapterName" name="chapterName" type="chapterName" onChange={formik.handleChange} value={formik.values.chapterName}
            />
            {formik.errors.chapterName ? <div className='error'>{formik.errors.chapterName}</div>: null}
            <button type="submit">Edit Chapter</button>
          </div>
          
        </form>
        </>
      );
    
}

export default connect(null, {putChapters})(EditChapter);