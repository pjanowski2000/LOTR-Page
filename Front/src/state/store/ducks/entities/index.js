const allEntities = [
  "books",
  "chapters",
  "movies",
  "quotes"
];

const defaultState = allEntities.reduce(
  (acc, entity) => ({
    ...acc,
    [entity]: {
      byId: {},
      allIds: [],
    }
  }),
  {}
);

// Reducer compositions, delegate
const entityReducer = (entity, state = { allIds: [], byId: {} }, action) => {

  const actionEntities = action.payload[entity];
  const { actionType } = action.meta;

  switch (actionType) {
    case 'GET_ALL':
      return {
        byId: {
          ...Object.keys(actionEntities).reduce(
            (acc, id) => ({
              ...acc,
              [id]: {
                ...state.byId[id],
                ...actionEntities[id]
              }
            }),
            {}
          )
        },
        allIds: Object.keys(actionEntities).reduce(
          (allIds, id) => [...allIds, id],
          []
        )
      };
    case 'GET_ONE':
      return {
        byId: {
          ...state.byId,
          ...Object.keys(actionEntities).reduce(
            (acc, id) => ({
              ...acc,
              [id]: {
                ...state.byId[id],
                ...actionEntities[id]
              }
            }),
            {}
          )
        },
        allIds: Object.keys(actionEntities).reduce(
          (allIds, id) => (allIds.includes(id) ? allIds : [...allIds, id]),
          state.allIds
        )
      };
    case 'DELETE_ONE':
      console.log(actionEntities.id);
      return {
        byId:
          Object.keys(state.byId).reduce(
            (acc, id) => {
              if (id !== actionEntities.id) {
                return {
                  ...acc,
                  [id]: 
                    state.byId[id],
                }
              }
              else {
                return acc
              }
            },
            {}
          ),
        allIds: state.allIds.filter((id) => id !== actionEntities.id)
      };
    default:
      console.log("Warning: Unsupported operation!");
  }
};

const entities = (state = defaultState, action) => {
  if (!action.meta || !action.meta.actionType) return state;

  return {
    ...state,
    ...Object.keys(action.payload).reduce(
      (acc, entity) => ({
        ...acc,
        [entity]: entityReducer(entity, state[entity], action)
      }),
      {}
    )
  };
};

const entitiesReducers = { entities };

export default entitiesReducers;
