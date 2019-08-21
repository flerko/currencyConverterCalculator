import React, { Component } from 'react';
import Main from '../../components/home/Main';
import { getCurrenciesData } from '../../containers/home/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Home.css';

class Home extends Component {
  componentWillMount() {
    this.props.getCurrenciesDataAction();
  }

  render() {
    return (
      <div className={styles.main}>
        <Main />
      </div>
    );
  }
}

Home.propTypes = {
  getCurrenciesDataAction: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrenciesDataAction: bindActionCreators(getCurrenciesData, dispatch),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
