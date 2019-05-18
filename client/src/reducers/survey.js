import {
  GET_SURVEYS,
  GET_SURVEY,
  SURVEY_ERROR,
  DELETE_SURVEY,
  ADD_SURVEY
} from "../actions/types";

const initialState = {
  surveys: [],
  survey: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SURVEYS:
      return {
        ...state,
        surveys: payload,
        loading: false
      };
    case GET_SURVEY:
      return {
        ...state,
        survey: payload,
        loading: false
      };
    case ADD_SURVEY:
      return {
        ...state,
        surveys: [payload, ...state.surveys],
        loading: false
      };
    case DELETE_SURVEY:
      return {
        ...state,
        surveys: state.surveys.filter(survey => survey._id !== payload),
        loading: false
      };
    case SURVEY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
