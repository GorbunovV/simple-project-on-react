import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';

import BlockWithLoader from '../../components/BlockWithLoader';

const Default = props => (
  <BlockWithLoader className="wrapper" loading={props.loading}>
    <Header route={props} smallHeader={props.smallHeader} siteHeader={props.siteHeader} />

    <div className="wrapper__inner">
      <main className="default">
        <div className="container">
          {props.children}
        </div>
      </main>
    </div>

    <Footer />
  </BlockWithLoader>
);

Default.propTypes = {
  children: PropTypes.element,
  smallHeader: PropTypes.string,
  siteHeader: PropTypes.string,
  loading: PropTypes.bool,
};

Default.defaultProps = {
  smallHeader: '',
  siteHeader: '',
  loading: true,
  children: null,
};

export default withRouter(Default);
