import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Loader from './Loader';

const BlockWithLoader = (props) => {
  const { loading, loaderText, style } = props;

  const className = classNames(props.className, { 'loader loader--trans': loading });

  return (
    <div className={className} style={style}>
      {loading ? <Loader preloaderText={loaderText} /> : null}
      {props.children}
    </div>
  );
};

BlockWithLoader.propTypes = {
  loading: PropTypes.bool,
  loaderText: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.object),
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

BlockWithLoader.defaultProps = {
  loaderText: '',
  loading: true,
  className: '',
  style: {},
};

export default BlockWithLoader;
