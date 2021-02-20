import React from 'react';
import { useFormik}  from 'formik'; 
import { v4 as uuidv4 } from 'uuid';
import {connect} from "react-redux";
import {addQuotes} from '../../state/store/ducks/quotes/actions'
const Form=({movie,addQuotes}) =>{
  
    const formik=useFormik({
        initialValues:{
           dialog:'',
            id: uuidv4(),
            movie:movie     
        },
        validate: values=>{
            let errors={};
            if(!values.dialog){
                errors.dialog="Dialog cant be empty"
            }
           
           return errors
        },
    
    onSubmit: values=>{
       
        addQuotes(values)
        formik.resetForm({
            values: { dialog:'',id:uuidv4(),movie:movie}, 
          });
    },
    
   
    })
    return (
        <>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <div>
        <label htmlFor="text">Quotes Dialog </label>
            <input id="dialog" name="dialog" type="dialog" onChange={formik.handleChange} value={formik.values.dialog}
            />
            {formik.errors.dialog ? <div className='error'>{formik.errors.dialog}</div>: null}
            <button type="submit">Add Quotes</button>
          </div>
          
        </form>
        </>
      );
    
}

export default connect(null, {addQuotes})(Form);