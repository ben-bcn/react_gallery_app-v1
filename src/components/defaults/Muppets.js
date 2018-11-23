import React from 'react';
import PhotoList from '../PhotoList';

const Muppets = props => {

  return (
    <div className="photo-container">
      <h2>Muppets Results</h2>
      {
        (props.loading)
        ? <p>Loading...</p>
        : <PhotoList data={props.photos} />
      }
    </div>
  );
}

export default Muppets;
