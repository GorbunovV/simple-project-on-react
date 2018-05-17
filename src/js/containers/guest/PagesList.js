import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import Default from '../../components/layouts/Default';
import PageItem from '../../components/PageItem';

import { getPages } from '../../actions/pages';

class PagesList extends Component {
  componentWillMount() {
    const { dispatch, match } = this.props;

    dispatch(getPages(match.params.project, i18n.language));
  }

  renderList() {
    const { collection, match } = this.props;

    if (collection) {
      return (
        <div className="list">
          {collection.map(model => (
            <PageItem
              model={model}
              key={model.id}
              project={match.params.project}
            />
          ))}
        </div>
      );
    }

    return null;
  }

  render() {
    const { pagesLoading } = this.props;

    return (
      <Default smallHeader="true" loading={pagesLoading}>
        {this.renderList()}
      </Default>
    );
  }
}

PagesList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any),
  collection: PropTypes.arrayOf(PropTypes.object),
  pagesLoading: PropTypes.bool,
};

PagesList.defaultProps = {
  match: null,
  collection: [],
  pagesLoading: true,
};

const mapStateToProps = (state) => {
  const { pages } = state;

  return {
    collection: pages.collection,
    pagesLoading: pages.loading,
  };
};

export default connect(mapStateToProps)(PagesList);
