import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectCurrency from '../home/SelectCurrency';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { setConversionStorage } from '../../containers/home/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class CurrencyConverter extends Component {
  constructor() {
    super();
    this.state = {
      firstCurrency: { Value: 0 },
      secondCurrency: { Value: 0 },
      firstValue: 0,
      secondValue: 0,
    };
    this.firstDebounce = debounce(() => {
      this.computedSecondValue();
    }, 250);
    this.secondDebounce = debounce(() => {
      this.computedFirstValue();
    }, 250);
  }

  setFirstCurrency = currency => {
    this.setState({ firstCurrency: currency });
  };

  changeFirstCurrency = currency => {
    this.setState({ firstCurrency: JSON.parse(currency) }, () => {
      this.computedFirstValue();
    });
  };

  changeFirstValueCurrency = event => {
    this.setState({ firstValue: event.target.value }, () => {
      this.firstDebounce();
    });
  };

  computedFirstValue = () => {
    const { firstCurrency, secondCurrency, secondValue } = this.state;
    const firstCurrencyValue = get(firstCurrency, 'Value');
    const secondCurrencyValue = get(secondCurrency, 'Value');
    const firstValue = (secondValue * secondCurrencyValue) / firstCurrencyValue;
    this.setState({ firstValue }, () => {
      this.setLastConversionToStorage();
    });
  };

  setSecondCurrency = currency => {
    this.setState({ secondCurrency: currency });
  };

  changeSecondCurrency = currency => {
    this.setState({ secondCurrency: JSON.parse(currency) }, () => {
      this.computedSecondValue();
    });
  };

  changeSecondValueCurrency = event => {
    this.setState({ secondValue: event.target.value }, () => {
      this.secondDebounce();
    });
  };

  computedSecondValue = () => {
    const { firstCurrency, secondCurrency, firstValue } = this.state;
    const firstCurrencyValue = get(firstCurrency, 'Value');
    const secondCurrencyValue = get(secondCurrency, 'Value');
    const secondValue = (firstValue * firstCurrencyValue) / secondCurrencyValue;
    this.setState({ secondValue }, () => {
      this.setLastConversionToStorage();
    });
  };

  setLastConversionToStorage = () => {
    const { firstCurrency, secondCurrency, firstValue, secondValue } = this.state;
    const firstCurrencyCharCode = get(firstCurrency, 'CharCode');
    const secondCurrencyCharCode = get(secondCurrency, 'CharCode');
    if (firstCurrencyCharCode === secondCurrencyCharCode) return null;
    const lastConversion = `${firstValue} ${firstCurrencyCharCode} = ${secondValue} ${secondCurrencyCharCode}`;
    this.props.setConversionStorageAction(lastConversion);
  };

  render() {
    return this.props.show ? (
      <div className="currency-converter">
        <h2 className="currency-converter__title">Конвертер валют</h2>
        <div className="currency-converter__selection-container">
          <div className="currency-converter__selection-block">
            <input
              type="number"
              placeholder="Enter number please"
              onChange={this.changeFirstValueCurrency}
              value={this.state.firstValue}
            />
            <SelectCurrency setDefaultCurrency={this.setFirstCurrency} changeCurrency={this.changeFirstCurrency} />
          </div>
          <div className="currency-converter__selection-block">
            <input
              type="number"
              placeholder="Enter number please"
              onChange={this.changeSecondValueCurrency}
              value={this.state.secondValue}
            />
            <SelectCurrency setDefaultCurrency={this.setSecondCurrency} changeCurrency={this.changeSecondCurrency} />
          </div>
        </div>
      </div>
    ) : null;
  }
}

CurrencyConverter.propTypes = {
  show: PropTypes.bool,
  setConversionStorageAction: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    setConversionStorageAction: bindActionCreators(setConversionStorage, dispatch),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CurrencyConverter);
