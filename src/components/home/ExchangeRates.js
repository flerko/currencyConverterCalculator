import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { concatTitle } from '../../utils/index';

class ExchangeRates extends Component {
  renderCurrenciesBlock = () => {
    return this.props.necessaryCurrencies.map((currency, index) => {
      if (get(currency, 'CharCode') === 'RUB') return null;
      return (
        currency && (
          <div className="exchange-rates__currency-block" key={index}>
            <h3 className="exchange-rates__currency-title">{concatTitle(currency)}</h3>
            <p className="exchange-rates__currency-value">{get(currency, 'Value')}</p>
          </div>
        )
      );
    });
  };

  render() {
    return (
      <div className="exchange-rates">
        <h2 className="exchange-rates__title">Курс валют ЦБ РФ</h2>
        <div className="exchange-rates__currency-container">{this.renderCurrenciesBlock()}</div>
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
