import React, { PropTypes } from 'react';
import Oils from './Oils';
import Video from './Video';
import { debounce } from 'lodash';
import Hammer from 'react-hammerjs';

class Home extends React.Component {
  constructor() {
    super();
    this.setState = this.setState.bind(this);
    this.onmouse = this.onmouse.bind(this);
    this.state = {
      active: false,
    };
  }

  onmouse(event) {
    const direction = (event.detail < 0 || event.wheelDelta > 0) ? 'up' : 'down';
    this.setState({
      active: direction === 'down',
    });
    setTimeout(() => {
      document.querySelector('html').classList.remove('scrolling');
    }, 1000);
  }

  handleSwipe(event) {
    console.log('yo');
    console.log(event);
  }

  init() {
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
    const options = {
      preventDefault: true,
      recognizers: {
        swipe: {
            direction: DIRECTION_ALL,
            threshold: 10,
        },
      }
    };
    return (
      <Hammer onSwipe={this.handleSwipe} options={options}>
        <section className="section-home-wrapper">
          <Video active={this.state.active} />
          <Oils />
        </section>
      </Hammer>
    );
  }
}

export default Home;
