import React, { Component } from 'react';
import PropTypes from 'prop-types';

import svgSprite from '../../../images/svg/spriteInline.svg';

import Icon from '../../components/Icon';

class Search extends Component {
  handleChange(e) {
    const { onSubmit } = this.props;

    e.preventDefault();

    if (onSubmit) {
      onSubmit(e.target.value);
    }
  }

  render() {
    return (
      <div className="header__search">
        <button className="search__btn header__btn js-search-open">
          <Icon className="icon icon-search" glyph={`${svgSprite}#search`} />
        </button>
        <div
          className="search__box js-search-box"
        >
          <input
            type="text"
            placeholder="Поиск..."
            onChange={e => this.handleChange(e)}
          />
          <button>
            <Icon className="icon icon-search" glyph={`${svgSprite}#search`} />
          </button>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Search;
