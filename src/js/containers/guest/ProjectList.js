import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Default from '../../components/layouts/Default';
import PortfolioItem from '../../components/PortfolioItem';
import NotFound from '../../components/NotFound';

const ProjectList = (props) => {
  const {
    collection,
    activeId,
    search,
    projectsLoading,
    categoriesLoading,
  } = props;

  let filterCollection = collection;

  if (activeId) {
    filterCollection = filterCollection.filter(model => model.category.id === activeId);
  }

  if (search) {
    filterCollection = filterCollection.filter(model =>
      model.name.toLowerCase().includes(search.toLowerCase()));
  }

  const renderProjects = () => {
    if (collection.length !== 0) {
      if (filterCollection.length !== 0) {
        return filterCollection.map(model => <PortfolioItem model={model} key={model.id} />);
      }

      return <NotFound />;
    }

    return <NotFound />;
  };

  return (
    <Default loading={categoriesLoading || projectsLoading}>
      <div className="portfolio">
        {collection ? renderProjects() : null}
      </div>
    </Default>
  );
};

ProjectList.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.object),
  activeId: PropTypes.number,
  search: PropTypes.string,
  projectsLoading: PropTypes.bool,
  categoriesLoading: PropTypes.bool,
};

ProjectList.defaultProps = {
  collection: [],
  activeId: null,
  search: '',
  projectsLoading: true,
  categoriesLoading: true,
};

const mapStateToProps = (state) => {
  const { projects, categories } = state;

  return {
    collection: projects.collection,
    activeId: categories.activeId,
    search: projects.search,
    projectsLoading: projects.loading,
    categoriesLoading: categories.loading,
  };
};

export default connect(mapStateToProps)(ProjectList);
