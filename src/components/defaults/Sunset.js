import React from 'react';
import PhotoList from '../PhotoList';

const Sunset = props => {

  return (

    <div className="photo-container">
      <h2>Sunset Results</h2>
      {
        (props.loading)
        ? <p>Loading...</p>
        : <PhotoList data={props.photos} />
      }
    </div>
  );
}

export default Sunset;
