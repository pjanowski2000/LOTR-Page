import React from 'react';
import { useFormik}  from 'formik'; 
import { v4 as uuidv4 } from 'uuid';
import {connect} from "react-redux";
import {addChapters} from '../../state/store/ducks/chapters/actions'
const Form=({book,addChapters}) =>{
  
    const formik=useFormik({
        initialValues:{
           chapterName:'',
            id: uuidv4(),
            book:book     
        },
        validate: values=>{
            let errors={};
            if(!values.chapterName){
                errors.chapterName="Pole chapterName nie moze byc puste"
            }
           
           return errors
        },
    
    onSubmit: values=>{
        console.log(values);
        addChapters(values)
        formik.resetForm({
            values: { chapterName:'',id:uuidv4(),book:book}, 
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
            <button type="submit">Add Chapter</button>
          </div>
          
        </form>
        </>
      );
    
}

export default connect(null, {addChapters})(Form);