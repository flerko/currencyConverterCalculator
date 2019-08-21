import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { concatTitle } from '../../utils/index';
import { connect } from 'react-redux';
import get from 'lodash/get';

class SelectCurrency extends Component {
  renderOptions = () => {
    return this.props.necessaryCurrencies.map((currency, index) => {
      return (
        <option key={index} value={get(currency, 'CharCode')}>
          {concatTitle(currency)}
        </option>
      );
    });
  };

  render() {
    return <select onChange={this.props.onChange} value={this.props.value}>{this.renderOptions()}</select>;
  }
}

SelectCurrency.propTypes = {
  value: PropTypes.string,
  necessaryCurrencies: PropTypes.array,
  onChange: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    necessaryCurrencies: state.home.necessaryCurrencies,
  };
};

export default connect(mapStateToProps)(SelectCurrency);
