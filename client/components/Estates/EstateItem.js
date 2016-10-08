import React from 'react';
import EstateItemHeader from './EstateItemHeader'
import EstateItemBody from './EstateItemBody'


class EstateItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section key={ this.props.estate._id }
        className={ 'estate estate-section estate-section--' + this.props.estate.slug } >
        <EstateItemHeader estate={ this.props.estate }
          s3Path={ this.props.s3Path } nav={ this.props.nav } />
        <EstateItemBody parent={ this.props.estate._id }
          data={ this.props.sub } s3Path={ this.props.s3Path } />
      </section>
    );
  }
}

export default EstateItem;
