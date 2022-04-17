import React from 'react';
import Userfront from '@userfront/core';

class SSOButton extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(event) {
      event.preventDefault();
      Userfront.login({ method: this.props.provider });
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>
          Log in with {this.props.provider}
        </button>
      );
    }
  }

  export default SSOButton;