import React, { Component } from 'react';
import Header from './Header';
import ExchangeRates from './ExchangeRates';
import ConversionHistory from './ConversionHistory';

class Main extends Component {
  render() {
    return (
      <div className="home-main">
        <Header />
        <ExchangeRates />
        <ConversionHistory />
      </div>
    );
  }
}

export default Main;
