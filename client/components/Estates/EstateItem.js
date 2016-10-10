import React from 'react';
import EstateItemHeader from './EstateItemHeader'
import EstateItemBody from './EstateItemBody'

import Hammer from 'react-hammerjs';

class EstateItem extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageSwipe = this.handlePageSwipe.bind(this);
  }

  handlePageSwipe(event) {
    console.log('horizontal swipe');
    console.log(event);
  }

  render() {
    return (
      <Hammer onSwipe={this.handlePageSwipe} >
        <section key={ this.props.estate._id }
          className={ 'estate estate-section estate-section--' + this.props.estate.slug } >
          <EstateItemHeader estate={ this.props.estate }
            s3Path={ this.props.s3Path } />
          <EstateItemBody parent={ this.props.estate._id }
            data={ this.props.sub } s3Path={ this.props.s3Path } />
        </section>
      </Hammer>
    );
  }
}

export default EstateItem;
