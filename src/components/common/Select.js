import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Select.css';

class Input extends Component {
  onChange = (event) => {
    if (!this.props.change) return;
    this.props.change(this.props.index, 'currency', event.target.value)
  };

  render() {
    return (
      <select
        className={styles.select}
        onChange={this.onChange}
        value={this.props.value}>
        {this.props.renderOptions(this.props.converter)}
      </select>
    );
  }
}

Input.propTypes = {
  change: PropTypes.func,
  value: PropTypes.string,
  index: PropTypes.number,
  converter: PropTypes.object,
  renderOptions: PropTypes.func,
};

export default Input;
