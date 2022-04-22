import React from 'react';
import Userfront from '@userfront/core';

// Define the logout button component
class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: !Userfront.tokens.accessToken,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    
    Userfront.logout();
  }

  render() {
    return (
      <li
        id="logout-button"
        onClick={this.handleClick}
        disabled={this.state.disabled}
      >
        <a>
        Log out
        </a>
      </li>
    );
  }
}
export default LogoutButton;