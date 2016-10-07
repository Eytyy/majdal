import React, { PropTypes } from 'react';
import { debounce } from 'lodash';
import Hammer from 'react-hammerjs';

import Oils from './Oils';
import Video from './Video';

import { getOils } from '../../util/helpers';
import { getFrontVideo } from '../../util/helpers';


class Home extends React.Component {
  constructor() {
    super();
    this.setState = this.setState.bind(this);
    this.onmouse = this.onmouse.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.state = {
      active: false,
    };
  }

  onmouse(event) {
    const direction = (event.detail < 0 || event.wheelDelta > 0) ? 'up' : 'down';
    this.setState({
      active: direction === 'down',
    });
  }

  handleSwipe(event) {
    const direction = (event.deltaY < 0) ? 'up' : 'down';
    this.setState({
      active: direction === 'up',
    });
  }

  initSlider() {
    $('.oils-slider').slick({
      dots: true,
      fade: true,
      arrows: false
    });
  }

  fetchOilData() {
    getOils().then(response => {
      this.setState({
        oils: response.data.oils,
      });
      this.initSlider();
    }).catch(err => {
      console.log(err);
    });
  }

  fetchVideo() {
    getFrontVideo().then(response => {
      this.setState({
        video: response.data,
      });
    }).catch(err => {
      console.log(err);
    });
  }

  init() {
    this.fetchVideo();
    this.fetchOilData();
    document.getElementById('app').addEventListener('wheel', debounce(
      this.onmouse, 200, { leading: true, trailing: false })
    );
  }

  updateActiveState(nextProps) {
    if (this.props.location && this.props.location.pathname === '/oils' ||
      nextProps && nextProps.location.pathname === '/oils') {
      this.setState({
        active: true,
      });
    } else {
      this.setState({
        active: false,
      });
    }
  }

  componentDidMount() {
    this.init();
    this.updateActiveState();
  }

  componentWillReceiveProps(nextProps) {
    this.updateActiveState(nextProps);
  }

  render() {
    return (
      <Hammer onSwipe={ this.handleSwipe } direction="DIRECTION_VERTICAL" >
        <section className="section-home-wrapper">
          <Video data={ this.state.video } active={ this.state.active } />
          <Oils data={ this.state.oils } />
        </section>
      </Hammer>
    );
  }
}

export default Home;
