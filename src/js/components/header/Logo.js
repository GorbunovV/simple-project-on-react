import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Logo extends Component {
  onClick(e) {
    const { onClickLogo } = this.props;

    e.preventDefault();

    if (onClickLogo) {
      onClickLogo();
    }
  }

  render() {
    const { link, button } = this.props;

    if (button) {
      return (
        <Link to={link} className="header__logo">
          <span>BLAKIT</span>
          WebStage
        </Link>
      );
    }

    return (
      <button
        className="header__logo"
        onClick={e => this.onClick(e)}
      >
        <span>BLAKIT</span>
        WebStage
      </button>
    );
  }
}

Logo.propTypes = {
  onClickLogo: PropTypes.func,
  link: PropTypes.string,
  button: PropTypes.string,
};

Logo.defaultProps = {
  link: '',
  onClickLogo: null,
  button: '',
};

export default Logo;
