import React from 'react';
import { Link } from 'react-router';
import EstateNav from './EstateNav';

// Header With 2 Cols
const EstateItemHeaderSplit = (props) => {
  return (
    <header className="estate-section__header estate-section__header--split">
      <div className="estate__title-wrapper">
        <h1 className="estate__title">{props.item.title}</h1>
      </div>
      <div className="estate__desc-wrapper">
        <p className="estate__desc">
          {props.item['header description']}
        </p>
      </div>
    </header>
  );
};

// Header With Full Image
const EstateItemHeaderFull = (props) => {
  const styles = {
    backgroundImage: props.item['header image'] && `url('${props.s3Path}${props.item["header image"].filename}')`,
  }
  return (
    <header className="estate-section__header estate-section__header--full">
      <div className="wrapper">
        <h1 className="estate__title">{props.item.title}</h1>
      </div>
      <div className="estate__background" style={ styles} />
    </header>
  );
};


class EstateItemHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  markup() {
    if (this.props.estate['header template'] !== 'Split') {
      return <EstateItemHeaderFull item={this.props.estate} s3Path={this.props.s3Path} />;
    }
    return <EstateItemHeaderSplit item={this.props.estate} s3Path={this.props.s3Path} />;
  }
  render() {
    return (
      <div className="estate-section__header__inner">
        <EstateNav nav={this.props.nav} />
        {this.markup()}
      </div>
    );
  }
}

export default EstateItemHeader;
