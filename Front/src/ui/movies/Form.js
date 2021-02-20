import React from 'react';
import { useFormik}  from 'formik'; 
import { v4 as uuidv4 } from 'uuid';
import {connect} from "react-redux";
import {addMovies} from '../../state/store/ducks/movies/actions'
const Form=({addMovies,setadd}) =>{
  
    const formik=useFormik({
        initialValues:{
           name:'',
            id: uuidv4(),
            runtimeInMinutes:0,
            budgetInMillions:0,
            boxOfficeRevenueInMillions:0,
            academyAwardNominations:0,
            academyAwardWins:0,
            rottenTomatesScore:0
        },
        validate: values=>{
            let errors={};
            if(!values.name){
                errors.name="Title cant be empty"
            }
            if(0>=values.runtimeInMinutes){
                errors.runtimeInMinutes="Time cant be less or equal 0"
            }
            if(0>=values.budgetInMillions){
                errors.budgetInMillions="Budget cant be less or equal 0"
            }
            if(0>=values.boxOfficeRevenueInMillions){
                errors.boxOfficeRevenueInMillions="Box Office cant be less or equal 0"
            }
            if(0>values.academyAwardNominations){
                errors.academyAwardNominations="Nominations cant be less than 0"
            }
            if(0>values.academyAwardWins ){
                errors.academyAwardWins="Wins cant be less than 0"
            }
            if(values.academyAwardWins>values.academyAwardNominations ){
                errors.academyAwardWins="Wins cant be more than Nominations"
            }
            if(0>values.rottenTomatesScore || values.rottenTomatesScore>100){
                errors.rottenTomatesScore="Score cant be less or equal 0 and higher than 100"
            }

           return errors
        },
    
    onSubmit: values=>{
        addMovies(values)
        formik.resetForm({
            values: {
            name:'',
            id: uuidv4(),
            runtimeInMinutes:0,
            budgetInMillions:0,
            boxOfficeRevenueInMillions:0,
            academyAwardNominations:0,
            academyAwardWins:0,
            rottenTomatesScore:0}, 
          });
          setadd(false)
    },
    
   
    })
    return (
        <>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <div>
            <div>
            <div>
            <label htmlFor="text">Title</label>
            </div>
            <input id="name" name="name" type="name" onChange={formik.handleChange} value={formik.values.name}/>
            </div>
            {formik.errors.name ? <div className='error'>{formik.errors.name}</div>: null}
            <div>
            <div>
            <label htmlFor="text">Time</label>
            </div>
            <input id="runtimeInMinutes" name="runtimeInMinutes" type="number" onChange={formik.handleChange} value={formik.values.runtimeInMinutes}/>
            {formik.errors.runtimeInMinutes ? <div className='error'>{formik.errors.runtimeInMinutes}</div>: null}
            </div>
            <div>
            <div>
            <label htmlFor="text">Budget</label>
            </div>
            <input id="budgetInMillions" name="budgetInMillions" type="number" onChange={formik.handleChange} value={formik.values.budgetInMillions}/>
            {formik.errors.budgetInMillions ? <div className='error'>{formik.errors.budgetInMillions}</div>: null}
            </div>

            <div>
            <div>
            <label htmlFor="text">Box Office</label>
            </div>
            <input id="boxOfficeRevenueInMillions" name="boxOfficeRevenueInMillions" type="number" onChange={formik.handleChange} value={formik.values.boxOfficeRevenueInMillions}/>
            {formik.errors.boxOfficeRevenueInMillions ? <div className='error'>{formik.errors.boxOfficeRevenueInMillions}</div>: null}
            </div>

            <div>
            <label htmlFor="text">Acadeny Award Nominations</label>
            <div>
            <input id="academyAwardNominations" name="academyAwardNominations" type="number" onChange={formik.handleChange} value={formik.values.academyAwardNominations}/>
            {formik.errors.academyAwardNominations ? <div className='error'>{formik.errors.academyAwardNominations}</div>: null}
            </div>
            </div>


            <div>
            <label htmlFor="text">Acadeny Award Wins</label>
            <div>
            <input id="academyAwardWins" name="academyAwardWins" type="number" onChange={formik.handleChange} value={formik.values.academyAwardWins}/>
            {formik.errors.academyAwardWins ? <div className='error'>{formik.errors.academyAwardWins}</div>: null}
            </div>
            </div>

            <div>
            <label htmlFor="text">Score by Rotten Tomatoes</label>
            <div>
            <input id="rottenTomatesScore" name="rottenTomatesScore" type="number" onChange={formik.handleChange} value={formik.values.rottenTomatesScore}/>
            {formik.errors.rottenTomatesScore ? <div className='error'>{formik.errors.rottenTomatesScore}</div>: null}
            </div>
            </div>

            <button type="submit">Add Movie</button>
          </div>
          
        </form>
        </>
      );
    
}

export default connect(null, {addMovies})(Form);