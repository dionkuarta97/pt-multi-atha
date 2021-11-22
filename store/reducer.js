import { SET_BREEDS, SET_BREED, SET_IMAGES, SET_LOADING } from "./actionTypes";

const initialState = {
  breeds: [],
  breed: [],
  images: [],
  loading: false,
};

function reducer(state = initialState, action) {
  if (action.type === SET_BREEDS) {
    return { ...state, breeds: action.payload };
  } else if (action.type === SET_BREED) {
    return { ...state, breed: action.payload };
  } else if (action.type === SET_IMAGES) {
    return { ...state, images: action.payload };
  } else if (action.type === SET_LOADING) {
    return { ...state, loading: action.payload };
  }
  return state;
}

export default reducer;
