import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_SURVEYS,
  GET_SURVEY,
  SURVEY_ERROR,
  DELETE_SURVEY,
  ADD_SURVEY
} from "./types";

// Get posts
export const getSurveys = () => async dispatch => {
  try {
    const res = await axios.get("/api/surveys");

    dispatch({
      type: GET_SURVEYS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SURVEY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// delete posts
export const deleteSurvey = surveyId => async dispatch => {
  try {
    await axios.delete(`/api/surveys/${surveyId}`);

    dispatch({
      type: DELETE_SURVEY,
      payload: surveyId
    });

    dispatch(setAlert("Survey Removed", "success"));
  } catch (err) {
    dispatch({
      type: SURVEY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addSurvey = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("/api/surveys", formData, config);

    dispatch({
      type: ADD_SURVEY,
      payload: res.data
    });

    dispatch(setAlert("Survey Created", "success"));
  } catch (err) {
    dispatch({
      type: SURVEY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getSurvey = id => async dispatch => {
  try {
    const res = await axios.get(`/api/surveys/${id}`);

    dispatch({
      type: GET_SURVEY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SURVEY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
