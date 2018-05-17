import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import Header from '../../components/layouts/Header';
import BlockWithLoader from '../../components/BlockWithLoader';

const FramePage = props => (
  <BlockWithLoader className="wrapper" loading={props.loading}>
    <Header route={props} smallHeader={props.smallHeader} siteHeader={props.siteHeader} />

    <div className="wrapper__inner">
      {props.children}
    </div>
  </BlockWithLoader>
);

FramePage.propTypes = {
  children: PropTypes.element,
  smallHeader: PropTypes.string,
  siteHeader: PropTypes.string,
  loading: PropTypes.bool,
};

FramePage.defaultProps = {
  smallHeader: '',
  siteHeader: '',
  loading: true,
  children: null,
};

export default withRouter(FramePage);
