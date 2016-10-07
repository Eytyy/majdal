import React from 'react';
import { Link } from 'react-router';

class EstateNav extends React.Component {
  constructor(props) {
    super(props);
  }
  markup() {
    const len = this.props.nav.length;
    if (len) {
      if (len === 1) {
        const item = this.props.nav[0];
        if (item.order === 2) {
          return (
            <Link className="estate-nav__item estate-nav__item--next" to={'/estate/' + item.slug}>
              <i className="fa fa-angle-right"></i>
            </Link>
          );
        }
        return (
          <Link className="estate-nav__item estate-nav__item--prev" to={'/estate/' + item.slug}>
            <i className="fa fa-angle-left"></i>
          </Link>
        );
      }
      const back = this.props.nav[0];
      const next = this.props.nav[1];
      return (
        <div className="estateNav-wrapper">
          <Link className="estate-nav__item estate-nav__item--prev" to={'/estate/' + back.slug}>
            <i className="fa fa-angle-left"></i>
          </Link>
          <Link className="estate-nav__item estate-nav__item--next" to={'/estate/' + next.slug}>
            <i className="fa fa-angle-right"></i>
          </Link>
        </div>
      );
    }
  }
  init() {
  }
  render() {
    return (
      <nav className="estate-navs">
        <div className="wrapper">
          {this.markup()}
        </div>
      </nav>
    );
  }
}

export default EstateNav;
