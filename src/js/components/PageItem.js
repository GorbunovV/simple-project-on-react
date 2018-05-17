import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getPageName } from '../helpers/formatter';

const PortfolioItem = (props) => {
  const { model, project } = props;

  return (
    <div className="list__item">
      <Link to={`${project}/${getPageName(model.filename)}`} className="item__inner">
        <div className="item__img">
          <div
            className="item__bg"
            style={{ backgroundImage: `url(${model.image.url})` }}
          />
        </div>
        <div className="item__title">{model.name}</div>
      </Link>
    </div>
  );
};

PortfolioItem.propTypes = {
  model: PropTypes.objectOf(PropTypes.any),
  project: PropTypes.string,
};

PortfolioItem.defaultProps = {
  model: null,
  project: '',
};

export default PortfolioItem;
