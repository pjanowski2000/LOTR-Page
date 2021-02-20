import { MOVIES_FAILURE, MOVIES_REQUEST, GET_MOVIES_SUCCESS,  ADD_MOVIES, DELETE_MOVIES, PATCH_MOVIES } from "./types";
import { createAction } from 'redux-api-middleware'
import { normalize, schema } from "normalizr";

const movieSchema = new schema.Entity('movies');
const moviesSchema = new schema.Array(movieSchema);

export const getMovies = () => (dispatch) => dispatch(createAction({
  endpoint: 'http://localhost:5000/movies',
  method: 'GET',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  types: [
    MOVIES_REQUEST, {
      type: GET_MOVIES_SUCCESS,
      payload: async (action, state, res) => {
        const json = await res.json();
        const { entities } = normalize(json, moviesSchema);
        return entities;
      },
      meta: { actionType: 'GET_ALL' }

    },
    MOVIES_FAILURE]

}));


export const addMovies = (values) => (dispatch) => dispatch(createAction({
  endpoint: 'http://localhost:5000/movies',
  method: 'POST',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...values
  }),
  types: [
    MOVIES_REQUEST,
    {
      type: ADD_MOVIES,
      payload: async (action, state, res) => {
        const json = await res.json();
        const { entities } = normalize(json, movieSchema);
        return entities;
      },
      meta: { actionType: 'GET_ONE' }

    },
    MOVIES_FAILURE,
  ]

}));


export const delMovies= (id) => (dispatch) => dispatch(createAction({
  endpoint: `http://localhost:5000/movies/${id}`,
  method: 'DELETE',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id
  }),
  types: [
    MOVIES_REQUEST,
    {
      type: DELETE_MOVIES,
      payload: async (action, state, res) => {
        
        const entities = { movies: { id } }
        return entities;
      },
      meta: { actionType: 'DELETE_ONE' }

    },
    MOVIES_FAILURE,
  ]

}))

export const putMovies = (values) => (dispatch) => dispatch(createAction({
  endpoint: `http://localhost:5000/movies/${values.id}`,
  method: 'PATCH',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...values
  }),
  types: [
    MOVIES_REQUEST,
    {
      type: PATCH_MOVIES,
      payload: async (action, state, res) => {
        const json = await res.json();
        const { entities } = normalize(json, movieSchema);
        console.log(entities);
        return entities;
      },
      meta: { actionType: 'GET_ONE' }

    },
    MOVIES_FAILURE,
  ]

}));

