import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    //Asynchronous Actions
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true }; //when we start we are loading
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: payload, isLoading: false }; //if success we stop loading thus have correct payload
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED: //if failed we stop loading thus have an error
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
