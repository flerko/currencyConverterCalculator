import React, { Component } from 'react';
import businessBank from '../../assets/images/home/business-bank-investor.png';
import CurrencyConverter from '../modals/CurrencyConverter';

class ConversionHistory extends Component {
  state = {
    showCurrencyConverter: true
  };

  render() {
    return (
      <div className="conversion-history">
        <CurrencyConverter show={this.state.showCurrencyConverter} />
        <h2 className='conversion-history__title'>История конвертации</h2>
        <ul className='conversion-history__list'>
          <li className='conversion-history__item'>220 USD = 14221.3 RUB</li>
          <li className='conversion-history__item'>123 RUB = 1.5689 GBP</li>
          <li className='conversion-history__item'>52 EUR = 57.6836 USD</li>
          <li className='conversion-history__item'>349 GBP = 381.563 EUR</li>
        </ul>
        <div className='conversion-history__button'>Конвертор валют</div>
        <img className='conversion-history__business' src={businessBank} alt="businessman"/>
      </div>
    );
  }
}

export default ConversionHistory;
