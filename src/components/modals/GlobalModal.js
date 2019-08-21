import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './GlobalModal.css';

class GlobalModal extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.closePopup);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closePopup);
  }

  setWrapperRef = node => {
    this.wrapper = node;
  };

  closePopup = event => {
    if (this.wrapper && !this.wrapper.contains(event.target)) {
      if (!this.props.close) return;
      this.props.close();
    }
  };

  render() {
    return (
      <div className={styles.main} ref={this.setWrapperRef}>
        {this.props.children}
      </div>
    );
  }
}

GlobalModal.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.func,
};

export default GlobalModal;
