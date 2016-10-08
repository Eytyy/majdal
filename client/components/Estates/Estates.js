import React from 'react'
import { getEstates, getAdjacentEstates } from '../../util/helpers';

import EstateHeader from './EstateHeader';
import EstateItem from './EstateItem';

import { debounce } from 'lodash';
import Hammer from 'react-hammerjs';

class Estates extends React.Component {

  constructor() {
    super();
    this.state = {
      estate: [],
      subs: [],
      nav: [],
      landing: [],
    };
    this.domMap = {
      body: document.querySelector('body'),
    };
    this.onmouse = this.onmouse.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
  }

  onmouse(event) {
    const direction = (event.detail < 0 || event.wheelDelta > 0) ? 'up' : 'down';
    if (direction === 'up') {
      if (window.innerWidth > 920) {
        this.retractView();
      }
    } else {
      this.expandView();
    }
  }

  handleSwipe(event) {
    console.log(event);
    const direction = (event.deltaY < 0) ? 'up' : 'down';
    console.log(direction);
    if (direction === 'up') {
      if (window.innerWidth > 920) {
        this.expandView();
      }
    } else {
      this.retractView();
    }
  }

  retractView() {
    this.domMap.body.classList.add('js-estate-inner');
    console.log('retract');
  }

  expandView() {
    this.domMap.body.classList.remove('js-estate-inner');
    console.log('expand');
  }

  setPageStyle() {
    if (!this.props.params.id) return;
    this.retractView();
  }

  resetPageStyle() {
    this.expandView();
  }

  initNav() {
    getAdjacentEstates(this.state.estate.order).then(response => {
      this.setState({
        nav: response.data.data,
      });
    }).catch(err => {
      console.log(err);
    });
  }

  init(pageId) {
    const id = pageId || this.props.params.id;
    getEstates(id).then(response => {
      this.setState({
        landing: response.landing.data,
        estate: response.estate.data[0],
        subs: response.subs.data,
      });
      this.setPageStyle();
      this.initNav();
    }).catch(err => {
      console.log(err);
    });
    document.getElementById('main').addEventListener('wheel', debounce(
      this.onmouse, 200, { leading: true, trailing: false })
    );
  }

  componentDidMount() {
    this.init();
    this.domMap.body.classList.add('js-entering');
    setTimeout(() => {
      this.domMap.body.classList.remove('js-entering');
    }, 600);
  }

  componentWillUnmount() {
    this.resetPageStyle();
  }
  componentWillReceiveProps(nextProps) {
    this.init(nextProps.params.id);
  }
  rawMarkup(markup) {
    return { __html: markup };
  }

  render() {
    return (
      <Hammer onSwipe={this.handleSwipe} direction="DIRECTION_VERTICAL" >
        <section className="estate">
          <EstateHeader data={ this.state.landing } s3Path={ this.props.s3Path } />
          <EstateItem
            estate={ this.state.estate }
            sub={ this.state.subs }
            nav={ this.state.nav }
            s3Path={ this.props.s3Path }
          />
        </section>
      </Hammer>
    );
  }
}

Estates.defaultProps = {
  s3Path: 'https://s3.amazonaws.com/eytyy.com/estates/',
};

export default Estates;
