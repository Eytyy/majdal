import React from 'react';

const OliveItem = (props) => {

  return (
    <li className="olives-list__item">
      <div className="olive__img">
        <img data-lazy={props.s3Path + props.item.image.filename} />
      </div>
      <div className="olive__info">
        <h2 className="olive__name">{props.item.title}</h2>
        <p className="olive__desc">{props.item.description}</p>
      </div>
    </li>
  );
};

export default OliveItem;
