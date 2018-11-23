import React from 'react';
import Photo from './Photo';
import NoPhotos from './NoPhotos';

const Photos = props => {

  const results = props.data;
  let photos;

  if(results.length > 0) {
    photos = results.map( photo =>
              <Photo id={photo.id} secret={photo.secret} farm={photo.farm} title={photo.title} server={photo.server} key={photo.id} />
            );
  } else {
    photos = <NoPhotos />;
  }

  return(

      <ul>
        { photos }
      </ul>

  )
}

export default Photos;
