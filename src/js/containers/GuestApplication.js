import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import ProjectList from '../containers/guest/ProjectList';
import PagesList from '../containers/guest/PagesList';
import SitePage from '../containers/guest/SitePage';

import { getCategories } from '../actions/categories';
import { getProjects } from '../actions/projects';

class GuestApplication extends Component {
  componentWillMount() {
    const { match, dispatch } = this.props;
    const lang = match.params.locale;

    i18n.changeLanguage(lang);
    dispatch(getCategories());
    dispatch(getProjects());
  }

  render() {
    const { match } = this.props;
    const localLang = match.params.locale;

    return (
      <Switch>
        <Route exact path={`/${localLang}`} component={ProjectList} />
        <Route exact path={`/${localLang}/projects/:project`} component={PagesList} />
        <Route exact path={`/${localLang}/projects/:project/:page`} component={SitePage} />
        <Route path={`/${localLang}/projects`} render={() => <Redirect to={`/${localLang}`} />} />
      </Switch>
    );
  }
}

GuestApplication.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any),
};

GuestApplication.defaultProps = {
  match: null,
};

export default connect()(GuestApplication);
