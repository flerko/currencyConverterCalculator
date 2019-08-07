import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      this.props.close();
    }
  };

  render() {
    return this.props.show ? (
      <div className="global-modal" ref={this.setWrapperRef}>
        {this.props.children}
      </div>
    ) : null;
  }
}

GlobalModal.propTypes = {
  children: PropTypes.element.isRequired,
  show: PropTypes.bool,
  close: PropTypes.func,
};

export default GlobalModal;
