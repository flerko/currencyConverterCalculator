import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { concatTitle } from '../../utils/index';
import { connect } from 'react-redux';

class SelectCurrency extends Component {
  renderOptions = () => {
    return this.props.necessaryCurrencies.map((currency, index) => {
      return (
        <option key={index} value={JSON.stringify(currency)}>
          {concatTitle(currency)}
        </option>
      );
    });
  };

  componentWillMount() {
    const { necessaryCurrencies } = this.props;
    if (!necessaryCurrencies.length) return null;
    this.props.setDefaultCurrency(this.props.necessaryCurrencies[0]);
  }

  changeCurrency = event => {
    this.props.changeCurrency(event.target.value);
  };

  render() {
    return <select onChange={this.changeCurrency}>{this.renderOptions()}</select>;
  }
}

SelectCurrency.propTypes = {
  setDefaultCurrency: PropTypes.func,
  necessaryCurrencies: PropTypes.array,
  changeCurrency: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    necessaryCurrencies: state.home.necessaryCurrencies,
  };
};

export default connect(mapStateToProps)(SelectCurrency);
