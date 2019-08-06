import React, { Component } from 'react';

class ExchangeRates extends Component {
  render() {
    return (
      <div className="exchange-rates">
        <h2 className='exchange-rates__title'>Курс валют ЦБ РФ</h2>
        <div className='exchange-rates__currency-container'>
          <div className='exchange-rates__currency-block'>
            <h3 className='exchange-rates__currency-title'>Доллар США, USD</h3>
            <p className='exchange-rates__currency-value'>64.6423</p>
          </div>
          <div className='exchange-rates__currency-block'>
            <h3 className='exchange-rates__currency-title'>Евро, EUR</h3>
            <p className='exchange-rates__currency-value'>71.7077</p>
          </div>
          <div className='exchange-rates__currency-block'>
            <h3 className='exchange-rates__currency-title'>Фунт стерлингов, GBP</h3>
            <p className='exchange-rates__currency-value'>78.3982</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ExchangeRates;
