import React, { PropTypes } from 'react'
import { getOlivesCategories } from '../../util/helpers';
import { Link } from 'react-router'

class OlivesCategories extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    getOlivesCategories().then(response => {
      this.setState({
        data: response.data.olives,
      });
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const olivesCategories = this.state.data.map((category, index) => {
      return (
        <li className="olives-list__item" key={index}>
          <Link to={'/olives/' + category.name}>
            <img src={this.props.s3Path + category.image.filename} alt={category.name} />
          </Link>
        </li>
      );
    });
    return (
      <ul className="olives-list">
        {olivesCategories}
      </ul>
    );
  }
}

OlivesCategories.defaultProps = {
  s3Path: 'https://s3.amazonaws.com/eytyy.com/olives/',
};

export default OlivesCategories;
