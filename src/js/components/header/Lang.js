import React, { Component } from 'react';
import classNames from 'classnames';
import i18n from 'i18next';
import PropTypes from 'prop-types';

class Lang extends Component {
  renderLang(lang) {
    const { locationPath } = this.props;

    return (
      <li key={lang}>
        <a
          href={locationPath.replace(`/${i18n.language}`, lang === 'en' ? `/${lang}` : `/${lang}`)}
          className={classNames('_link', {
            active: i18n.language === lang,
          })}
        >
          {lang}
        </a>
      </li>
    );
  }

  render() {
    const languages = ['ru', 'en'];

    return (
      <ul className="header__lang">
        {languages.map(lang => this.renderLang(lang))}
      </ul>
    );
  }
}

Lang.propTypes = {
  locationPath: PropTypes.string,
};

Lang.defaultProps = {
  locationPath: '',
};


export default Lang;
