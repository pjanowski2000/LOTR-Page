import { QUOTES_REQUEST, GET_QUOTES_SUCCESS,  ADD_QUOTES, DELETE_QUOTES, PATCH_QUOTES, QUOTES_FAILURE } from "./types";
import { createAction } from 'redux-api-middleware'
import { normalize, schema } from "normalizr";

const quoteSchema = new schema.Entity('quotes');
const quotesSchema = new schema.Array(quoteSchema);

export const getQuotes = () => (dispatch) => dispatch(createAction({
  endpoint: 'http://localhost:5000/quotes',
  method: 'GET',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  types: [
    QUOTES_REQUEST, {
      type: GET_QUOTES_SUCCESS,
      payload: async (action, state, res) => {
        const json = await res.json();
        const { entities } = normalize(json, quotesSchema);
        return entities;
      },
      meta: { actionType: 'GET_ALL' }

    },
    QUOTES_FAILURE]

}));


export const addQuotes = (values) => (dispatch) => dispatch(createAction({
  endpoint: 'http://localhost:5000/quotes',
  method: 'POST',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...values
  }),
  types: [
    QUOTES_REQUEST,
    {
      type: ADD_QUOTES,
      payload: async (action, state, res) => {
        const json = await res.json();
        const { entities } = normalize(json, quoteSchema);
        return entities;
      },
      meta: { actionType: 'GET_ONE' }

    },
    QUOTES_FAILURE,
  ]

}));


export const delQuotes = (id) => (dispatch) => dispatch(createAction({
  endpoint: `http://localhost:5000/quotes/${id}`,
  method: 'DELETE',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id
  }),
  types: [
    QUOTES_REQUEST,
    {
      type: DELETE_QUOTES,
      payload: async (action, state, res) => {
        const entities = { quotes: { id } }
        return entities;
      },
      meta: { actionType: 'DELETE_ONE' }

    },
    QUOTES_FAILURE,
  ]

}))

export const putQuotes = (values) => (dispatch) => dispatch(createAction({
  endpoint: `http://localhost:5000/quotes/${values.id}`,
  method: 'PATCH',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...values
  }),
  types: [
    QUOTES_REQUEST,
    {
      type: PATCH_QUOTES,
      payload: async (action, state, res) => {
        const json = await res.json();
        console.log(json);
        const { entities } = normalize(json, quoteSchema);
        console.log(entities);
        return entities;
      },
      meta: { actionType: 'GET_ONE' }

    },
    QUOTES_FAILURE,
  ]

}));

