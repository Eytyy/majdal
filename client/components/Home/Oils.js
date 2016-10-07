import React, { PropTypes } from 'react';
import { getOils } from '../../util/helpers';

class Oils extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  initSlider() {
    $('.oils-slider').slick({
      dots: true,
      fade: true,
      arrows: false
    });
  }
  componentDidMount() {
    getOils().then(response => {
      this.setState({
        data: response.data.oils,
      });
      this.initSlider();
    }).catch(err => {
      console.log(err);
    });
  }
  rawMarkup(markup) {
    return { __html: markup };
  }
  render() {
    const oils = this.state.data.map((slide, index) => {
      const styles = {
        backgroundImage: `url('${this.props.s3Path}${slide.image.filename}')`,
      };
      return (
        <div className="slide" key={index}>
          <div className="slide__image" style={styles} />
          <div className="slide__description" dangerouslySetInnerHTML={this.rawMarkup(slide.description)} />
        </div>
      );
    });
    return (
      <div className="oils-slider slider">
        {oils}
      </div>
    );
  }
}

Oils.defaultProps = {
  s3Path: 'https://s3.amazonaws.com/eytyy.com/oils/',
};

export default Oils;
