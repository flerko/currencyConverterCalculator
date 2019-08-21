import React, { Component } from 'react';
import Header from './Header';
import ExchangeRates from './ExchangeRates';
import ConversionHistory from './ConversionHistory';
import styles from './Main.css';

class Main extends Component {
  render() {
    return (
      <div className={styles.main}>
        <Header />
        <ExchangeRates />
        <ConversionHistory />
      </div>
    );
  }
}

export default Main;
