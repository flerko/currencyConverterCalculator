import React, { Component } from 'react';
import styles from './Header.css';

class Header extends Component {
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.logo} />
        <h1 className={styles.title}>Курс валют</h1>
      </div>
    );
  }
}

export default Header;
