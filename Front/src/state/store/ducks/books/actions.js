import { BOOKS_FAILURE, BOOKS_REQUEST, GET_BOOKS_SUCCESS,  ADD_BOOKS, DELETE_BOOKS, PATCH_BOOKS  } from "./types";
import { createAction } from 'redux-api-middleware'
import { normalize, schema } from "normalizr";

const bookSchema = new schema.Entity('books');
const booksSchema = new schema.Array(bookSchema);

export const getBooks = () => (dispatch) => dispatch(createAction({
  endpoint: 'http://localhost:5000/books',
  method: 'GET',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  types: [
    BOOKS_REQUEST, {
      type: GET_BOOKS_SUCCESS,
      payload: async (action, state, res) => {
        const json = await res.json();
        const { entities } = normalize(json, booksSchema);
        return entities;
      },
      meta: { actionType: 'GET_ALL' }

    },
    BOOKS_FAILURE]

}));


export const addBooks = (values) => (dispatch) => dispatch(createAction({
  endpoint: 'http://localhost:5000/books',
  method: 'POST',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...values
  }),
  types: [
    BOOKS_REQUEST,
    {
      type: ADD_BOOKS,
      payload: async (action, state, res) => {
        const json = await res.json();
        const { entities } = normalize(json, bookSchema);
        return entities;
      },
      meta: { actionType: 'GET_ONE' }

    },
    BOOKS_FAILURE,
  ]

}));


export const delBooks = (id) => (dispatch) => dispatch(createAction({
  endpoint: `http://localhost:5000/books/${id}`,
  method: 'DELETE',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id
  }),
  types: [
    BOOKS_REQUEST,
    {
      type: DELETE_BOOKS,
      payload: async (action, state, res) => {
        
        const entities = { books: { id } }
        return entities;
      },
      meta: { actionType: 'DELETE_ONE' }

    },
    BOOKS_FAILURE,
  ]

}))

export const putBooks = (values) => (dispatch) => dispatch(createAction({
  endpoint: `http://localhost:5000/books/${values.id}`,
  method: 'PATCH',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...values
  }),
  types: [
    BOOKS_REQUEST,
    {
      type: PATCH_BOOKS,
      payload: async (action, state, res) => {
        const json = await res.json();
        const { entities } = normalize(json, bookSchema);
        return entities;
      },
      meta: { actionType: 'GET_ONE' }

    },
    BOOKS_FAILURE,
  ]

}));
