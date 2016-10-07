import React, { PropTypes } from 'react';

class Oils extends React.Component {
  rawMarkup(markup) {
    return { __html: markup };
  }
  render() {
    const oils = this.props.data.map((slide, index) => {
      const styles = {
        backgroundImage: `url('${this.props.s3Path}${slide.image.filename}')`,
      };
      return (
        <div className="slide" key={index}>
          <div className="slide__image" style={styles} />
          <div className="slide__description"
            dangerouslySetInnerHTML={ this.rawMarkup(slide.description) } />
        </div>
      );
    });
    return (
      <div className="oils-slider slider">
        { oils }
      </div>
    );
  }
}

Oils.defaultProps = {
  data: [],
  s3Path: 'https://s3.amazonaws.com/eytyy.com/oils/',
};

export default Oils;
