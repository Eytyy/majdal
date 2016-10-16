import React from 'react';
import EstateItemHeader from './EstateItemHeader'
import EstateItemBody from './EstateItemBody'

import Hammer from 'react-hammerjs';

class EstateItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    return (
      <section key={ this.props.estate._id }
        className={ 'estate estate-section estate-section--' + this.props.estate.slug } >
        <EstateItemHeader estate={ this.props.estate }
          s3Path={ this.props.s3Path } />
        <EstateItemBody parent={ this.props.estate._id }
          data={ this.props.sub } s3Path={ this.props.s3Path } />
      </section>
    );
  }
}

export default EstateItem;
