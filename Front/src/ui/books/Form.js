import React from 'react';
import { useFormik}  from 'formik'; 
import { v4 as uuidv4 } from 'uuid';
import {connect} from "react-redux";
import {addBooks} from '../../state/store/ducks/books/actions'
const Form=({addBooks}) =>{
  
    const formik=useFormik({
        initialValues:{
           name:'',
            id: uuidv4(),
            
        },
        validate: values=>{
            let errors={};
            if(!values.name){
                errors.name="Pole name nie moze byc puste"
            }
           
           return errors
        },
    
    onSubmit: values=>{
        addBooks(values)
        formik.resetForm({
            values: { name:'',id:uuidv4()}, 
          });
    },
    
   
    })
    return (
        <>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <div>
            <label htmlFor="text">name</label>
            <input id="name" name="name" type="name" onChange={formik.handleChange} value={formik.values.name}
            />
            {formik.errors.name ? <div className='error'>{formik.errors.name}</div>: null}
            <button type="submit">Add Book</button>
          </div>
          
        </form>
        </>
      );
    
}

export default connect(null, {addBooks})(Form);