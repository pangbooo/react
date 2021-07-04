import useDataApi from '../../Hook/useDataApi';
import React, { useState, Fragment } from 'react'

function FetchDataPageWithCustomHook() {
  const [query, setQuery] = useState('redux');
  const url = `https://hn.algolia.com/api/v1/search?query=${query}`
  const [{isError, isLoading, data}, setUrl] = useDataApi(url);

    return (
        <Fragment>
            <form onSubmit={(e) => {
                setUrl(url);
                e.preventDefault();
            }}> 
                <input 
                    type="text"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                />
                <button type="submit">
                    Search
                </button>
            </form>
            {isError && <div>Something went wrong ...</div>}

            {
                isLoading ? (
                    <div>Loading...</div>
                ) : (
                <ul>
                    {data.hits.map(item => (
                        <li key={item.objectID}>
                        <a href={item.url}>{item.title}</a>
                        </li>
                    ))}
                </ul>
                )
            }
            
        </Fragment>
    );
}

export default FetchDataPageWithCustomHook