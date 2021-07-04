import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const dataFetchReducer = function(state, action) {
  switch(action.type){
    case 'FETCH_DATA_BEGIN':
      return {
        ...state,
        isLoading: true,
      }
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
      }
    case 'FETCH_DATA_ERROR':
      return {
        ...state,
        isError: true,
        isLoading: false,
      }
    default: 
      return state;
  }
}
 
function useDataApi(initialUrl) {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isError: false,
    isLoading: false,
    data: {hits: []}
  });
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    const didCancel = false;
    const fetchData = async () => {
      dispatch({type: 'FETCH_DATA_BEGIN'})
      try{
          const data = await axios(url);
          dispatch({
            type: 'FETCH_DATA_SUCCESS',
            payload: { data }
          })
      }catch(e){
        dispatch({type: 'FETCH_DATA_ERROR'})
      }
    }
    fetchData();

    return () => {
      didCancel = true;
    }
  }, [url]);

  return [state, setUrl];
}
 
export default useDataApi;