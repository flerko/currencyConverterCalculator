import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { concatTitle } from '../../utils/index';
import { connect } from 'react-redux';

class SelectCurrency extends Component {
  renderOptions = () => {
    return this.props.necessaryCurrencies.map((currency, index) => {
      return (
        <option key={index} value={get(currency, 'Value')}>
          {concatTitle(currency)}
        </option>
      );
    });
  };

  changeCurrency = event => {
    this.props.changeCurrency(event.target.value);
  };

  setDefaultValue = () => {
    const { necessaryCurrencies } = this.props;
    if (!this.props.necessaryCurrencies.length) return null;
    const value = get(necessaryCurrencies[0], 'Value');
    this.props.changeCurrency(value);
    return value;
  };

  render() {
    return (
      <select onChange={this.changeCurrency} defaultValue={this.setDefaultValue()}>
        {this.renderOptions()}
      </select>
    );
  }
}

SelectCurrency.propTypes = {
  necessaryCurrencies: PropTypes.array,
  changeCurrency: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    necessaryCurrencies: state.home.necessaryCurrencies,
  };
};

export default connect(mapStateToProps)(SelectCurrency);
