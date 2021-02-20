import React from 'react';
import { useFormik}  from 'formik'; 
import {connect} from "react-redux";
import {putBooks} from '../../state/store/ducks/books/actions'
const EditBook=({putBooks,id,edited}) =>{
  
    const formik=useFormik({
        initialValues:{
           name:'',
            id: id
            
        },
        validate: values=>{
            let errors={};
            if(!values.name){
                errors.name="Pole name nie moze byc puste"
            }
           
           return errors
        },
    
    onSubmit: values=>{
        console.log(values);
        edited(null)
        putBooks(values)
        formik.resetForm({
            values: { name:'',id:id}, 
          });
    },
    
   
    })
    return (
        <>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <div>
            <label htmlFor="text">Book name </label>
            <input id="name" name="name" type="name" onChange={formik.handleChange} value={formik.values.name}
            />
            {formik.errors.name ? <div className='error'>{formik.errors.name}</div>: null}
            <button type="submit">Edit Book</button>
          </div>
          
        </form>
        </>
      );
    
}

export default connect(null, {putBooks})(EditBook);