import React from 'react';
import './loading.css';

const Loading = ()=>{
    return (     
        <div id='loading'>

            <h2>Loading...</h2>
            <svg className='circle' style={{width:'30%'}}><circle r='30' cx='45' cy='55'/></svg>
        </div>
    )
  };
  export default Loading;