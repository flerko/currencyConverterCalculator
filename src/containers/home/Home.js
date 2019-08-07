import React, { Component } from 'react';
import Main from '../../components/home/Main';
import { getData } from '../../containers/home/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Home extends Component {
  componentWillMount() {
    this.props.getDataAction();
  }

  render() {
    return (
      <div className="home">
        <Main />
      </div>
    );
  }
}

Home.propTypes = {
  getDataAction: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    getDataAction: bindActionCreators(getData, dispatch),
  }
};

export default connect(null, mapDispatchToProps)(Home);
