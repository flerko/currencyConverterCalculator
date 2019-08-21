import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setConversionStorage } from '../../containers/home/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import find from 'lodash/find';
import Input from '../common/Input';
import Select from '../common/Select';
import styles from './CurrencyConverter.css';
import {concatTitle} from "../../utils";
import get from "lodash/get";

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
      const neededCurrencies = ['RUB', 'USD', 'GBP'];
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
        <div className={styles.selectionBlock} key={index}>
          <Input
            index={index}
            value={converter.value}
            change={this.changeConverterField}
          />
          <Select
            index={index}
            value={converter.currency}
            change={this.changeConverterField}
            converter={converter}
            renderOptions={this.renderOptions}
          />
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
        <option className={styles.option} key={index} value={get(currency, 'CharCode')}>
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

      this.setLastConversionToStorage(currency, index, newValue);
      return {...item, value: newValue };
    });
    this.setState({converters});
  };

  setLastConversionToStorage = (currency, index, newValue) => {
    const currentCurrency = this.state.converters[index];
    const lastConversion = `${currentCurrency.value} ${currentCurrency.currency} = ${newValue} ${currency.CharCode}`;
    this.props.setConversionStorageAction(lastConversion);
  };

  render() {
    return this.props.show ? (
      <div className={styles.main}>
        <h2 className={styles.title}>Конвертер валют</h2>
        <div className={styles.selectionContainer}>
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
