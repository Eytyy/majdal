import React from 'react';
import { Link } from 'react-router';

class EstateNav extends React.Component {
  constructor(props) {
    super(props);
  }
  markup() {
    const next = this.props.next;
    const prev = this.props.prev;
    if (next && prev) {
      return (
        <div className="estateNav-wrapper">
          <Link className="estate-nav__item estate-nav__item--next" to={ next }>
            <i className="fa fa-angle-right"></i></Link>
          <Link className="estate-nav__item estate-nav__item--prev" to={ prev }>
            <i className="fa fa-angle-left"></i></Link>
        </div>
      );
    } else if (next) {
      return <Link className="estate-nav__item estate-nav__item--next" to={ next }>
          <i className="fa fa-angle-right"></i></Link>;
    } else if (prev) {
      return <Link className="estate-nav__item estate-nav__item--prev" to={ prev }>
        <i className="fa fa-angle-left"></i></Link>;
    }
    return <div />;
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

EstateNav.propTypes = {
  nav: React.PropTypes.array,
  next: React.PropTypes.string,
  prev: React.PropTypes.string,
};

export default EstateNav;
