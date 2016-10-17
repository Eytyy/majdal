import React, { PropTypes } from 'react'
import { getOlivesCategories } from '../../util/helpers';
import { Link } from 'react-router'

class OlivesCategories extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    getOlivesCategories().then(response => {
      this.setState({
        data: response.data.olives,
      });
      this.initSlider();
    }).catch(err => {
      console.log(err);
    });
  }

  initSlider() {
    $('.olives-list').slick({
      mobileFirst: true,
      slidesToShow: 1,
      nextArrow: $('.nav--next'),
      prevArrow: $('.nav--back'),
      speed: 400,
      responsive: [
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 3,
            infinite: true,
          },
        },
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 4,
            infinite: true,
          },
        },
      ],
    });
  }

  render() {
    const olivesCategories = this.state.data.map((category, index) => {
      return (
        <li className="olives-list__item" key={index}>
          <Link to={'/olives/' + category.name}>
            <img src={this.props.s3Path + category.image.filename} alt={category.name} />
          </Link>
        </li>
      );
    });
    return (
      <div>
        <button className="olive-slider__nav nav--back" role="button">
          <i className="fa fa-angle-left"></i>
        </button>
        <button className="olive-slider__nav nav--next" role="button">
          <i className="fa fa-angle-right"></i>
        </button>
        <ul className="olives-list">
          {olivesCategories}
        </ul>
      </div>
    );
  }
}

OlivesCategories.defaultProps = {
  s3Path: 'https://s3.amazonaws.com/eytyy.com/olives/',
};

export default OlivesCategories;
