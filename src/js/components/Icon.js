import React from 'react';
import PropTypes from 'prop-types';

const Icon = (props) => {
  const { className, glyph } = props;

  return (
    <svg className={className}>
      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={glyph} />
    </svg>
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  glyph: PropTypes.string,
};

Icon.defaultProps = {
  glyph: '',
  className: 'icon',
};

export default Icon;
