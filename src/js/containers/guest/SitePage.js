import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FramePage from '../../components/layouts/FramePage';

import { getPage } from '../../actions/page';

class SitePage extends Component {
  componentWillMount() {
    const { match, dispatch } = this.props;

    dispatch(getPage(match.params.project, match.params.page));
  }

  renderFrame() {
    const { match, url } = this.props;

    if (url) {
      return (
        <iframe
          className="pframe"
          src={url}
          frameBorder="0"
          title={match.params.project}
        />
      );
    }

    return null;
  }

  render() {
    const { pageLoading } = this.props;

    return (
      <FramePage loading={pageLoading} smallHeader="true" siteHeader="true">
        {this.renderFrame()}
      </FramePage>
    );
  }
}

SitePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.shape),
  url: PropTypes.string,
  pageLoading: PropTypes.bool,
};

SitePage.defaultProps = {
  match: null,
  url: '',
  pageLoading: true,
};

const mapStateToProps = (state) => {
  const { page } = state;

  return {
    url: page.model.url,
    pageLoading: page.loading,
  };
};

export default connect(mapStateToProps)(SitePage);
