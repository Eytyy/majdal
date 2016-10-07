import React from 'react';
import { getOlives, getOlivesCategories } from '../../util/helpers';
import OliveItem from './OliveItem';

class OlivesList extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    this.domMap = {
      body: document.querySelector('body'),
    };
  }

  initSlider() {
    $('.olives-slider').slick({
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

  componentDidMount() {
    if (!this.domMap.body.classList.contains('olives-inner')) {
      this.domMap.body.classList.add('olives-inner');
    }

    getOlivesCategories().then(categories => {
      const category = categories.data.olives.find(cat => cat.name === this.props.params.id)._id;
      getOlives(category).then(response => {
        this.setState({
          data: response.data.olives,
        });
        this.initSlider();
      }).catch(err => {
        console.log(err);
      });
    });
  }

  componentWillUnmount() {
    if (this.domMap.body.classList.contains('olives-inner')) {
      this.domMap.body.classList.remove('olives-inner');
    }
  }

  render() {
    const olives = this.state.data.map((olive, index) =>
      <OliveItem item={olive} s3Path={this.props.s3Path} key={index}/>
    );
    return (
      <div>
        <button className="olive-slider__nav nav--back" role="button">
          <i className="fa fa-angle-left"></i>
        </button>
        <button className="olive-slider__nav nav--next" role="button">
          <i className="fa fa-angle-right"></i>
        </button>
        <ul className="olives-lists olives-slider slider">
          { olives }
        </ul>
      </div>
    );
  }
}

OlivesList.defaultProps = {
  s3Path: 'https://s3.amazonaws.com/eytyy.com/olives/',
};

export default OlivesList;
