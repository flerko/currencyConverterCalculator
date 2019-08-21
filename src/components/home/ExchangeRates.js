import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { concatTitle } from '../../utils/index';
import styles from './ExchangeRates.css';

class ExchangeRates extends Component {
  renderCurrenciesBlock = () => {
    return this.props.necessaryCurrencies.map((currency, index) => {
      if (get(currency, 'CharCode') === 'RUB') return null;
      return (
        currency && (
          <div className={styles.currencyBlock} key={index}>
            <h3 className={styles.currencyTitle}>{concatTitle(currency)}</h3>
            <p className={styles.currencyValue}>{get(currency, 'Value')}</p>
          </div>
        )
      );
    });
  };

  render() {
    return (
      <div className={styles.main}>
        <h2 className={styles.title}>Курс валют ЦБ РФ</h2>
        <div className={styles.currencyContainer}>{this.renderCurrenciesBlock()}</div>
      </div>
    );
  }
}

ExchangeRates.propTypes = {
  necessaryCurrencies: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    necessaryCurrencies: state.home.necessaryCurrencies,
  };
};

export default connect(mapStateToProps)(ExchangeRates);
