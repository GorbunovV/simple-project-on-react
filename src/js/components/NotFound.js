import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import Icon from '../components/Icon';

import svgSprite from '../../images/svg/spriteInline.svg';

const NotFound = props => (
  <div className="not-found">
    <div className="not-found__icon">
      <Icon className="icon icon-sad" glyph={`${svgSprite}#sad`} />
    </div>
    <div className="not-found__title">{props.t('not_found_title')}</div>
    <div className="not-found__desc">{props.t('not_found_desc')}</div>
  </div>
);

NotFound.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(NotFound);
