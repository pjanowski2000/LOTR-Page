import { CHAPTERS_FAILURE, CHAPTERS_REQUEST, GET_CHAPTERS_SUCCESS,  ADD_CHAPTERS, DELETE_CHAPTERS, PATCH_CHAPTERS } from "./types";
import { createAction } from 'redux-api-middleware'
import { normalize, schema } from "normalizr";

const chapterSchema = new schema.Entity('chapters');
const chaptersSchema = new schema.Array(chapterSchema);

export const getChapters = () => (dispatch) => dispatch(createAction({
  endpoint: 'http://localhost:5000/chapters',
  method: 'GET',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  types: [
    CHAPTERS_REQUEST, {
      type: GET_CHAPTERS_SUCCESS,
      payload: async (action, state, res) => {
        const json = await res.json();
        const { entities } = normalize(json, chaptersSchema);
        return entities;
      },
      meta: { actionType: 'GET_ALL' }

    },
    CHAPTERS_FAILURE]

}));


export const addChapters = (values) => (dispatch) => dispatch(createAction({
  endpoint: 'http://localhost:5000/chapters',
  method: 'POST',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...values
  }),
  types: [
    CHAPTERS_REQUEST,
    {
      type: ADD_CHAPTERS,
      payload: async (action, state, res) => {
        const json = await res.json();
        const { entities } = normalize(json, chapterSchema);
        return entities;
      },
      meta: { actionType: 'GET_ONE' }

    },
    CHAPTERS_FAILURE,
  ]

}));


export const delChapters = (id) => (dispatch) => dispatch(createAction({
  endpoint: `http://localhost:5000/chapters/${id}`,
  method: 'DELETE',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id
  }),
  types: [
    CHAPTERS_REQUEST,
    {
      type: DELETE_CHAPTERS,
      payload: async (action, state, res) => {
        const entities = { chapters: { id } }
        return entities;
      },
      meta: { actionType: 'DELETE_ONE' }

    },
    CHAPTERS_FAILURE,
  ]

}))

export const putChapters = (values) => (dispatch) => dispatch(createAction({
  endpoint: `http://localhost:5000/chapters/${values.id}`,
  method: 'PATCH',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...values
  }),
  types: [
    CHAPTERS_REQUEST,
    {
      type: PATCH_CHAPTERS,
      payload: async (action, state, res) => {
        const json = await res.json();
        console.log(json);
        const { entities } = normalize(json, chapterSchema);
        console.log(entities);
        return entities;
      },
      meta: { actionType: 'GET_ONE' }

    },
    CHAPTERS_FAILURE,
  ]

}));

