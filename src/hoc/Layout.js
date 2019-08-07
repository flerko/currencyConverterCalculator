import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Home from '../containers/home/Home';

class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <Home />
      </div>
    );
  }
}

export default withRouter(Layout);
