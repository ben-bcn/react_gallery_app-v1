import React from 'react';
import PhotoList from './PhotoList';

const Gallery = props => {

let paramsQuery   = props.match.params.query;
let pagePath      = props.match.path;
let pageTitle     = (pagePath === "/search/:query") ? paramsQuery : props.title;

// Change the page title based on photos content
document.title = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return (
    <div className="photo-container">
      <h2>{pageTitle} Results</h2>
      {/* if loading true, show a msg, otherwise display images*/}
      {
        (props.loading)
        ? <p className="loading">Photos are loading...</p>
        : <PhotoList data={props.photos} />
      }
    </div>
  );
}

export default Gallery;
