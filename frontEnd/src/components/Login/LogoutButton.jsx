
// import Userfront from "@userfront/core";
// // Initialize Userfront Core JS
// Userfront.init("demo1234");

// // Define the logout button component
// import React from 'react'


// function LogoutButton() {
//   return (
//     <>
//     <li>Logout</li>
//     </>
//   )
// }

// export default LogoutButton

// Initialize Userfront Core JS
import React from 'react';
import Userfront from '@userfront/core';
//Userfront.init("9ny8z7vb");

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
    console.log(Userfront)
    return (
      <li
        id="logout-button"
        onClick={this.handleClick}
        disabled={this.state.disabled}
      >
        Log out
      </li>
    );
  }
}
export default LogoutButton;