import React from 'react';
import { PropTypes } from 'prop-types';

class Link extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }
  handleClick = () => {
    alert('clicked');
    this.setState({ clicked: true });
  }
  render() {
    const { title, url } = this.props;
    return <a href={url} onClick={this.handleClick}>{title}</a>
  }
}
Link.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string
}

export default Link;