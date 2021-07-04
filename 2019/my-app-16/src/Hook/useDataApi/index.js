import { useState, useEffect } from 'react';
import axios from 'axios';
 
function useDataApi(initialUrl) {
  const [data, setData] = useState({ hits: [] });
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

 
  useEffect(() => {
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);

        try{
            const result = await axios(url);
            setData(result.data);
        }catch(e){
            setIsError(true);
        }
        setIsLoading(false);
    }
    fetchData();
  }, [url]);

  return [{isError, isLoading, data}, setUrl];
}
 
export default useDataApi;