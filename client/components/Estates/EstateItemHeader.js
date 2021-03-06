import React from 'react';

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
  const bg = () => {
    if (window.innerWidth > 1280) {
      const styles = {
        backgroundImage: props.item['header image'] && `url('${props.s3Path}${props.item["header image"].filename}')`,
      };
      return <div className="estate__background" style={ styles } />;
    }
    const styles = {
      backgroundImage: props.item['header image mobile'] && `url('${props.s3Path}${props.item["header image"].filename}')`,
    };
    return <div className="estate__background bg--mobile" style={ styles } />;
  }
  return (
    <header className="estate-section__header estate-section__header--full">
      <div className="wrapper">
        <h1 className="estate__title">{props.item.title}</h1>
      </div>
      { bg() }
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
        {this.markup()}
      </div>
    );
  }
}

export default EstateItemHeader;
