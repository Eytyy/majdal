import React, { PropTypes } from 'react';
import Oils from './Oils';
import Video from './Video';
import { debounce } from 'lodash';

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
  }

  ontouch(event) {
    console.log(event);
  }

  init() {
    document.getElementById('app').addEventListener('wheel', debounce(
      this.onmouse, 200, { leading: true, trailing: false })
    );
    document.getElementById('app').addEventListener('touchmove', debounce(
      this.ontouch, 200, { leading: true, trailing: false })
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
      <section className="section-home-wrapper">
        <Video active={this.state.active} />
        <Oils />
      </section>
    );
  }
}

export default Home;
