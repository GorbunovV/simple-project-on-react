import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

const Loader = (props) => {
  const { t, loaderText } = props;

  const text = loaderText || t('loading');

  return <div className="loader__circle">{text}</div>;
};

Loader.propTypes = {
  t: PropTypes.func.isRequired,
  loaderText: PropTypes.string,
};

Loader.defaultProps = {
  loaderText: '',
};

export default translate()(Loader);
