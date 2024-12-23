import axios from 'axios';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchData = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });
    axios.get('http://localhost:3001/files/data')
      .then(response => {
        dispatch({ type: FETCH_DATA_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
      });
  };
};

