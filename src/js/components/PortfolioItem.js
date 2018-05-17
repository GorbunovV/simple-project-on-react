import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { STATUS_DEV, STATUS_PROD } from '../constants/enums/status';
import { getProjectStatusPlain } from '../helpers/formatter';
import getProjectUrl from '../helpers/project';

import notAvailable from '../../images/not-available.png';

const PortfolioItem = (props) => {
  const { t, model } = props;

  return (
    <div className="portfolio__item">
      <div className="item__inner ">
        <div className={classNames('item__img', {
          'item__img--not-available': !model.image.url,
        })}
        >
          <img src={model.image.url ? model.image.url : notAvailable} alt="" />
        </div>

        <div className="item__desc">
          <div className="item__title">{model.name}</div>
          <div className="item__text">
            {model.description}
          </div>

          {model.tags ?
            <ul className="item__tags">
              {model.tags.map(name => <li key={name}>{name}</li>)}
            </ul> : null}

          <ul className="item__btn">
            <li>
              {model.website ?
                <a href={model.website} target="_blank" className="_btn _prod">{model.website}</a>
                : null}
            </li>

            <li>
              <Link to={`/${i18n.language}/projects${getProjectUrl(model.url_alias)}`} className="_btn _demo">{t('demo')}</Link>
            </li>
          </ul>
        </div>

        <div className={classNames('item__status', {
          'item__status--during': model.status === STATUS_DEV,
          'item__status--complete': model.status === STATUS_PROD,
        })}
        >
          {t(getProjectStatusPlain(model.status))}
        </div>
      </div>
    </div>
  );
};

PortfolioItem.propTypes = {
  t: PropTypes.func.isRequired,
  model: PropTypes.objectOf(PropTypes.any),
};

PortfolioItem.defaultProps = {
  model: null,
};

export default translate()(PortfolioItem);
