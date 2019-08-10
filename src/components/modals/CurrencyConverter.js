import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectCurrency from '../home/SelectCurrency';
import debounce from 'lodash/debounce';

class CurrencyConverter extends Component {
  constructor() {
    super();
    this.state = {
      firstValueCurrency: 0,
      secondValueCurrency: 0,
      currentValue: 0,
      totalValue: 0,
    };
    this.debounce = debounce(() => {
      this.computedTotalValue();
    }, 250);
  }

  changeFirstCurrency = value => {
    this.setState({ firstValueCurrency: value }, () => {
      this.computedTotalValue();
    });
  };

  changeSecondCurrency = value => {
    this.setState({ secondValueCurrency: value }, () => {
      this.computedTotalValue();
    });
  };

  changeFirstValueCurrency = event => {
    this.setState({ currentValue: event.target.value }, () => {
      this.debounce();
    });
  };

  computedTotalValue = () => {
    const { firstValueCurrency, secondValueCurrency, currentValue } = this.state;
    this.setState({ totalValue: ((currentValue * firstValueCurrency) / secondValueCurrency).toFixed(2) });
  };

  render() {
    return this.props.show ? (
      <div className="currency-converter">
        <h2 className="currency-converter__title">Конвертер валют</h2>
        <div className="currency-converter__selection-container">
          <div className="currency-converter__selection-block">
            <input type="number" placeholder="Enter number please" onChange={this.changeFirstValueCurrency} />
            <SelectCurrency changeCurrency={this.changeFirstCurrency} />
          </div>
          <div className="currency-converter__selection-block">
            <input type="text" disabled value={this.state.totalValue} />
            <SelectCurrency changeCurrency={this.changeSecondCurrency} />
          </div>
        </div>
      </div>
    ) : null;
  }
}

CurrencyConverter.propTypes = {
  show: PropTypes.bool,
};

export default CurrencyConverter;
