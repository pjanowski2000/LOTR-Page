import React from 'react';
import { useFormik}  from 'formik'; 
import {connect} from "react-redux";
import {putQuotes} from '../../state/store/ducks/quotes/actions'
const EditQuotes=({putQuotes,quote,edited}) =>{
  
    const formik=useFormik({
        initialValues:{
              ...quote
        },
        validate: values=>{
            let errors={};
            if(!values.dialog){
                errors.dialog="Dialog cant be empty"
            }
           
           return errors
        },
    
    onSubmit: values=>{
        
        edited(null)
        putQuotes(values)
       
    },
    
   
    })
    return (
        <>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <div>
            <label htmlFor="text">Quote Dialog</label>
            <input id="dialog" name="dialog" type="dialog" onChange={formik.handleChange} value={formik.values.dialog}
            />
            {formik.errors.dialog ? <div className='error'>{formik.errors.dialog}</div>: null}
            <button type="submit">Edit Quote</button>
          </div>
          
        </form>
        </>
      );
    
}

export default connect(null, {putQuotes})(EditQuotes);