import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Categories extends Component {
  onClick(e, model) {
    const { onChangeCategory } = this.props;

    e.preventDefault();

    if (onChangeCategory) {
      onChangeCategory(model);
    }
  }

  renderCategory(model) {
    const { activeId } = this.props;

    return (
      <li
        key={model.id}
        className={classNames({
          active: activeId === model.id,
        })}
      >
        <button
          className="_link"
          onClick={e => this.onClick(e, model)}
        >
          {model.name}
        </button>
      </li>
    );
  }

  render() {
    const { className, categories } = this.props;

    if (!categories) {
      return false;
    }

    return (
      <ul className={className}>
        {categories.map(model => this.renderCategory(model))}
      </ul>
    );
  }
}

Categories.propTypes = {
  className: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.object),
  activeId: PropTypes.number,
  onChangeCategory: PropTypes.func.isRequired,
};

Categories.defaultProps = {
  className: '',
  categories: [],
  activeId: null,
};

export default Categories;
