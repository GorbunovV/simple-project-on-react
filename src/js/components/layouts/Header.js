import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import svgSprite from '../../../images/svg/spriteInline.svg';

import Lang from '../header/Lang';
import Categories from '../header/Categories';
import Search from '../header/Search';
import Logo from '../header/Logo';

import Icon from '../../components/Icon';

import { changeCategory } from '../../actions/categories';

import { searchProject } from '../../actions/projects';

class Header extends Component {
  static initSearch() {
    const boxSearch = document.querySelector('.js-search-box');

    if (!boxSearch) return false;

    const btnSearch = document.querySelector('.js-search-open');
    const input = boxSearch.querySelector('input');
    const btnMenu = document.querySelector('.js-menu-open');
    const menu = document.querySelector('.js-menu-box');

    btnSearch.addEventListener('click', (e) => {
      if (e.currentTarget.classList.contains('active')) {
        boxSearch.classList.remove('opened');
        e.currentTarget.classList.remove('active');
      } else {
        boxSearch.classList.add('opened');
        e.currentTarget.classList.add('active');

        setTimeout(() => {
          input.focus();
        }, 300);
      }
    });

    input.addEventListener('blur', () => {
      boxSearch.classList.remove('opened');
      btnSearch.classList.remove('active');
    });

    btnMenu.addEventListener('click', (e) => {
      const overlay = document.createElement('div');
      overlay.classList.add('bg-overlay');

      document.body.appendChild(overlay);
      menu.classList.add('opened');
      e.currentTarget.classList.add('active');
      document.body.classList.add('menu-opened');

      overlay.addEventListener('click', (event) => {
        event.currentTarget.remove();
        menu.classList.remove('opened');
        btnMenu.classList.remove('active');
        document.body.classList.remove('menu-opened');
      });
    });

    return true;
  }

  static renderBackBtn(link) {
    return (
      <Link className="header__back header__btn" to={link}>
        <Icon className="icon icon-back" glyph={`${svgSprite}#back`} />
      </Link>
    );
  }

  componentDidMount() {
    Header.initSearch();
  }

  onChangeCategory(model) {
    const { dispatch } = this.props;

    dispatch(changeCategory(model.id));
  }

  onClickLogo() {
    const { dispatch } = this.props;

    dispatch(changeCategory(null));
  }

  onSearchProject(value) {
    const { dispatch } = this.props;

    dispatch(searchProject(value));
  }

  render() {
    const {
      route,
      smallHeader,
      categories,
      activeId,
      siteHeader,
      projectTitle,
      pageTitle,
    } = this.props;
    const locationPath = route.history.location.pathname;

    return (
      <header className={classNames('header', {
        small: smallHeader,
        'ex-small': siteHeader,
      })}
      >
        <div className="header__top">
          <div className="header__left">
            {siteHeader ?
              Header.renderBackBtn(`/${i18n.language}/projects/${route.match.params.project}`) :
              Header.renderBackBtn(`/${i18n.language}`)}

            <Search onSubmit={value => this.onSearchProject(value)} />

            <button className="header__burger header__btn js-menu-open">
              <Icon className="icon icon-menu" glyph={`${svgSprite}#menu`} />
            </button>

            <Logo
              button={smallHeader || siteHeader}
              link={`/${i18n.language}`}
              onClickLogo={() => this.onClickLogo()}
            />

            <nav className="header__nav">
              <Categories
                categories={categories}
                activeId={activeId}
                className="header__menu"
                onChangeCategory={model => this.onChangeCategory(model)}
              />
            </nav>
          </div>

          <div className="header__center">
            <div className="center__title">
              {projectTitle}
            </div>

            {pageTitle ?
              <div className="center__desc">
                {pageTitle}
              </div>
              : null}
          </div>

          <div className="header__right">
            <Lang locationPath={locationPath} />
          </div>
        </div>

        <div className="mobile-menu js-menu-box">
          <Logo
            link={`/${i18n.language}`}
            onCLick={() => this.onClickLogo()}
          />

          <Categories
            categories={categories}
            activeId={activeId}
            className="mobile-menu__list"
            onChangeCategory={model => this.onChangeCategory(model)}
          />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.objectOf(PropTypes.shape),
  categories: PropTypes.arrayOf(PropTypes.object),
  activeId: PropTypes.number,
  smallHeader: PropTypes.string,
  siteHeader: PropTypes.string,
  projectTitle: PropTypes.string,
  pageTitle: PropTypes.string,
};

Header.defaultProps = {
  route: null,
  categories: [],
  activeId: null,
  smallHeader: '',
  siteHeader: '',
  projectTitle: '',
  pageTitle: '',
};

const mapStateToProps = (state) => {
  const { categories, pages, page } = state;

  return {
    categories: categories.collection,
    activeId: categories.activeId,
    projectTitle: pages.title || page.title,
    pageTitle: page.model.title,
  };
};

export default connect(mapStateToProps)(Header);
