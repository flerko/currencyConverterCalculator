import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setConversionStorage } from '../../containers/home/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import find from 'lodash/find';
import get from "lodash/get";
import {concatTitle} from "../../utils";

class CurrencyConverter extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      converters: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.necessaryCurrencies !== this.props.necessaryCurrencies) {
      const neededCurrencies = ['RUB', 'USD'];
      let currencies = [];

      neededCurrencies.map(item => {
        const currency = find(this.props.necessaryCurrencies, { CharCode: item });
        if (currency) currencies.push(currency.CharCode);
      });

      const converters = currencies.map((currency) => ({
        value: 0,
        currency
      }));
      this.setState({currencies, converters});
    }
  };

  renderConverters = () => {
    return this.state.converters.map((converter, index) => {
      return (
        <div className="currency-converter__selection-block" key={index}>
          <input
            type="number"
            placeholder="Enter number please"
            value={converter.value}
            onChange={(event) => this.changeConverterField(index, 'value', Number(event.target.value))}
          />
          <select
            onChange={(event) => this.changeConverterField(index, 'currency', event.target.value)}
            value={converter.currency}>
            {this.renderOptions(converter)}
          </select>
        </div>
      );
    });
  };

  renderOptions = (converter) => {
    const selectableCurrencies = this.props.necessaryCurrencies.filter((currency) => {
      return !find(this.state.converters, { currency: currency.CharCode }) ||
        currency.CharCode === converter.currency;
    });

    return selectableCurrencies.map((currency, index) => {
      return (
        <option key={index} value={get(currency, 'CharCode')}>
          {concatTitle(currency)}
        </option>
      );
    });
  };

  changeConverterField = (index, name, value) => {
    const converters = [...this.state.converters];
    converters[index] = {...converters[index], [name]: value};
    this.setState({converters}, () => this.convertValues(index));
  };

  convertValues = (index) => {
    const {necessaryCurrencies} = this.props;

    const converter = this.state.converters[index];
    const value = converter.value;
    const changedCurrency = find(necessaryCurrencies, {CharCode: converter.currency});

    const converters = this.state.converters.map((item, itemIndex) => {
      if (index === itemIndex) return item;

      const currency = find(necessaryCurrencies, { CharCode: item.currency });
      const newValue = (changedCurrency.Value / currency.Value) * value;
      this.setLastConversionToStorage(currency, changedCurrency, value, newValue);

      return {...item, value: newValue };
    });
    this.setState({converters});
  };

  setLastConversionToStorage = (currency, changedCurrency, value, newValue) => {
    const lastConversion = `${changedCurrency.Value * value} ${changedCurrency.CharCode} = ${newValue} ${currency.CharCode}`;
    this.props.setConversionStorageAction(lastConversion);
  };

  render() {
    return this.props.show ? (
      <div className="currency-converter">
        <h2 className="currency-converter__title">Конвертер валют</h2>
        <div className="currency-converter__selection-container">
          {this.renderConverters()}
        </div>
      </div>
    ) : null;
  }
}

CurrencyConverter.propTypes = {
  show: PropTypes.bool,
  setConversionStorageAction: PropTypes.func,
  necessaryCurrencies: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    necessaryCurrencies: state.home.necessaryCurrencies,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setConversionStorageAction: bindActionCreators(setConversionStorage, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyConverter);
