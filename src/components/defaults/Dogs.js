import React from 'react';
import PhotoList from '../PhotoList';


const Dogs = props => {

  return (
    <div className="photo-container">
      <h2>Dogs Results</h2>
      {
        (props.loading)
        ? <p>Loading...</p>
        : <PhotoList data={props.photos} />
      }
    </div>
  );
}

export default Dogs;
