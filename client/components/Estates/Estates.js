import React from 'react'
import { getEstates, getAdjacentEstates } from '../../util/helpers';

import EstateHeader from './EstateHeader';
import EstateNav from './EstateNav';
import EstateItem from './EstateItem';

import { debounce } from 'lodash';
import Hammer from 'react-hammerjs';

import { withRouter } from 'react-router';


class Estates extends React.Component {

  constructor() {
    super();
    this.state = {
      estate: [],
      subs: [],
      nav: [],
      nextPage: null,
      previousPage: null,
      landing: [],
    };
    this.domMap = {
      body: document.querySelector('body'),
    };
    this.onmouse = this.onmouse.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
    this.setupNav = this.setupNav.bind(this);
  }

  onmouse(event) {
    const direction = (event.detail < 0 || event.wheelDelta > 0) ? 'up' : 'down';
    if (direction === 'up') {
      this.expandView();
    } else {
      this.retractView();
    }
  }

  handleSwipe(event) {
    console.log('vertical swipe');
    const direction = (event.deltaY < 0) ? 'up' : 'down';
    if (direction === 'up') {
      this.retractView();
    } else {
      this.expandView();
    }
  }

  navigateToNextPage() {
    console.log('next page');
    if (this.state.nextPage) {
      this.props.router.push(this.state.nextPage)
    }
  }

  navigateToPreviousPage() {
    console.log('previous page');
    if (this.state.previousPage) {
      this.props.router.push(this.state.previousPage)
    }
  }

  setupNav() {
    const len = this.state.nav.length;
    let next = null;
    let prev = null;
    if (len === 1) {
      const item = this.state.nav[0];
      if (item.order === 2) {
        next = `/estate/${item.slug}`;
      } else {
        prev = `/estate/${item.slug}`;
      }
    } else {
      prev = `/estate/${this.state.nav[0].slug}`;
      next = `/estate/${this.state.nav[1].slug}`;
    }
    if (prev || next) {
      this.setState({
        nextPage: next,
        previousPage: prev,
      });
    }
  }

  handleKeys(event) {
    const key = event.keyCode;
    switch (key) {
      case 40:
        this.retractView();
        break;
      case 38:
        this.expandView();
        break;
      case 39:
        this.navigateToNextPage();
        break;
      case 37:
        this.navigateToPreviousPage();
        break;
      default:
        return;
    }
  }

  retractView() {
    this.domMap.body.classList.add('js-estate-inner');
  }

  expandView() {
    this.domMap.body.classList.remove('js-estate-inner');
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
      this.setupNav();
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
    document.addEventListener('keydown', this.handleKeys);
  }

  componentDidMount() {
    this.init();
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
      <section className="estate">
        <Hammer onSwipe={this.handleSwipe} direction="DIRECTION_VERTICAL" >
          <EstateHeader data={ this.state.landing } s3Path={ this.props.s3Path } />
        </Hammer>
        <EstateNav
          nav={ this.state.nav }
          next={this.state.nextPage} prev={this.state.previousPage}/>
        <EstateItem
          estate={ this.state.estate }
          sub={ this.state.subs }
          s3Path={ this.props.s3Path }
        />
      </section>
    );
  }
}

Estates.defaultProps = {
  s3Path: 'https://s3.amazonaws.com/eytyy.com/estates/',
};


export default withRouter(Estates);
