import React, { Component } from 'react';
import businessBank from '../../assets/images/home/business-bank-investor.png';
import CurrencyConverter from '../modals/CurrencyConverter';
import GlobalModal from '../modals/GlobalModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setConversionStorageFromSessionStorage } from '../../containers/home/actions';
import { bindActionCreators } from 'redux';
import styles from './ConversionHistory.css';

class ConversionHistory extends Component {
  state = {
    showCurrencyConverter: false,
  };

  componentWillMount() {
    this.props.setConversionStorageFromSessionStorageAction();
  }

  openConverter = () => {
    this.setState({ showCurrencyConverter: true });
  };

  closeConverter = () => {
    this.setState({ showCurrencyConverter: false });
  };

  renderConversionHistory = () => {
    const { conversionStorage } = this.props;
    if (!conversionStorage.length) return null;
    return <ul className={styles.list}>{this.renderConversions()}</ul>;
  };

  renderConversions = () => {
    const { conversionStorage } = this.props;
    return conversionStorage.map((conversion, index) => {
      return (
        <li className={styles.item} key={index}>
          {conversion}
        </li>
      );
    });
  };

  render() {
    return (
      <div className={styles.main}>
        <GlobalModal close={this.closeConverter}>
          <CurrencyConverter show={this.state.showCurrencyConverter} />
        </GlobalModal>
        <h2 className={styles.title}>История конвертации</h2>
        {this.renderConversionHistory()}
        <div className={styles.button} onClick={this.openConverter}>
          Конвертор валют
        </div>
        <img className={styles.business} src={businessBank} alt="businessman" />
      </div>
    );
  }
}

ConversionHistory.propTypes = {
  conversionStorage: PropTypes.array,
  setConversionStorageFromSessionStorageAction: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    conversionStorage: state.home.conversionStorage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setConversionStorageFromSessionStorageAction: bindActionCreators(setConversionStorageFromSessionStorage, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversionHistory);
