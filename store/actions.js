import axios from "axios";
import { SET_BREEDS, SET_BREED, SET_IMAGES, SET_LOADING } from "./actionTypes";

export function setBreeds(payload) {
  return {
    type: SET_BREEDS,
    payload,
  };
}

export function setBreed(payload) {
  return {
    type: SET_BREED,
    payload,
  };
}

export function setLoading(payload) {
  return {
    type: SET_LOADING,
    payload,
  };
}

export function setImages(payload) {
  return {
    type: SET_IMAGES,
    payload,
  };
}

export function getBreeds() {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios({
        url: "https://dog.ceo/api/breeds/list",
        method: "GET",
      });

      dispatch(setBreeds(data.message));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getBreed(payload) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios({
        url: `https://dog.ceo/api/breed/${payload}/list`,
        method: "GET",
      });
      dispatch(setBreed(data.message));
    } catch (err) {
      console.log(err);
    }
  };
}

export function getImages(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios({
        url: `https://dog.ceo/api/breed/${payload}/images`,
        method: "GET",
      });
      dispatch(setImages(data.message));
      dispatch(setLoading(false));
    } catch (err) {
      console.log(err);
    }
  };
}
