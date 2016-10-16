import React from 'react';

const rawMarkup = markup => {
  return { __html: markup };
};

const EstateItemBodyImage = props => {
  const styles = {
    backgroundImage: props.item.image && `url('${props.s3Path}${props.item.image.filename}')`,
  }

  const dirClass = props.item['grid orientation'] === 'Right to Left' ?
    'estate__sub--image--rtl' : 'estate__sub--image--ltr';

  const classes = 'estate__sub estate__sub--image ' + dirClass;

  return (
    <section className={classes}>
      <div className="estate__sub__background" style={styles}></div>
      <div className="sub__text-wrapper">
        <h2 className="sub__text" dangerouslySetInnerHTML={rawMarkup(props.item.text)} />
      </div>
    </section>
  );
};

const EstateItemBodyDefault = props => {
  return (
    <section className="estate__sub estate__sub--text">
      <div className="sub__text-wrapper">
        <p className="sub__text" dangerouslySetInnerHTML={rawMarkup(props.item.text)} />
      </div>
    </section>
  );
};


class EstateItemBody extends React.Component {
  constructor(props) {
    super(props);
  }

  markup() {
    const item = this.props.data.find(x => x.estate === this.props.parent);
    if (item) {
      if (item.template === 'Image') {
        return <EstateItemBodyImage item={ item } s3Path={ this.props.s3Path } />;
      }
      return <EstateItemBodyDefault item={ item } />;
    }
  }

  render() {
    return (
      <div className="estate-section__body__inner">
        { this.markup() }
      </div>
    );
  }
}

export default EstateItemBody;
