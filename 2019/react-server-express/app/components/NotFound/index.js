import React from 'react';
import { Status } from '../../../utils.js';

// export default function NotFound({staticContext={}}){
//     staticContext.status = 404; // 更改server context{}
//     return <h2>Oops, nothing here!</h2>
// }

export default function NotFound(){
    return (
        <Status code={404}>
          <div>
            <h1>Sorry, can’t find that.</h1>
          </div>
        </Status>
      );
}