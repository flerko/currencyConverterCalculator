import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CurrencyConverter extends Component {
  render() {
    return (
      <div className="currency-converter" onClick={this.handleClickOutside}>
        <h2 className="currency-converter__title">Конвертер валют</h2>
        <div className="currency-converter__selection-container">
          <div className="currency-converter__selection-block">
            <input type="text" placeholder="10" />
            <select>
              <option value="USD">Доллар США, USD</option>
              <option value="EUR">Евро, EUR</option>
              <option value="GBP">Фунт стерлингов, GBP</option>
            </select>
          </div>
          <div className="currency-converter__selection-block">
            <input type="text" placeholder="10" />
            <select>
              <option value="USD">Доллар США, USD</option>
              <option value="EUR">Евро, EUR</option>
              <option value="GBP">Фунт стерлингов, GBP</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

CurrencyConverter.propTypes = {
  show: PropTypes.bool,
};

export default CurrencyConverter;
