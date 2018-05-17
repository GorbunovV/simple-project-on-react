import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

const PageNotFound = (props) => {
  const { t } = props;

  return (
    <div className="p404">
      <div className="p404__box">
        <div className="p404__title">404</div>
        <div className="p404__desc">Страница не найдена</div>
        <div className="p404__btn">
          <Link to="/" className="btn btn-primary">{t('go_to_main')}</Link>
        </div>
      </div>
    </div>
  );
};

PageNotFound.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(connect()(PageNotFound));
