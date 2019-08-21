import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Input.css';

class Input extends Component {
  onChange = (event) => {
    if (!this.props.change) return;
    this.props.change(this.props.index, 'value', Number(event.target.value))
  };

  render() {
    return (
      <input
        className={styles.main}
        type="number"
        placeholder="Enter number please"
        value={this.props.value}
        onChange={this.onChange}
      />
    );
  }
}

Input.propTypes = {
  change: PropTypes.func,
  value: PropTypes.number,
  index: PropTypes.number,
};

export default Input;
