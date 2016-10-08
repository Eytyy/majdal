import React, { PropTypes } from 'react'

const EstateHeader = (props) => {
  const s3Path = 'https://s3.amazonaws.com/eytyy.com/landing-pages/';
  const styles = {
    backgroundImage: props.data.image && `url('${s3Path}${props.data.image.filename}')`,
  };
  if (props.data['header style'] === 'Title') {
    return (
      <div className="landing-header landing-header--half">
        <div className="landing-background" style={styles}></div>
        <h2 className="landing-title">{props.data['header title']}</h2>
      </div>
    );
  }
  return (
    <div className="landing-header landing-header--full">
      <div className="landing-background" style={styles}></div>
      <div className="landing-text-wrapper">
        <p className="landing-text">{props.data['header paragraph']}</p>
        <button className="section__skipLink section__skipLink--estates">
          <i className="fa fa-angle-down"></i>
        </button>
      </div>
    </div>
  );
};

EstateHeader.PropTypes = {
  image: {
    filename: React.PropTypes.string
  }
};

export default EstateHeader;
