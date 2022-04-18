import React from 'react';
import Userfront from '@userfront/core';
import Alert from './Alert';
import './styles.scss';

// Define the Signup form component
class SignupForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        name: "",
        password: "",
        passwordVerify: "",
        alertMessage: "",
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.setAlertMessage = this.setAlertMessage.bind(this);
    }
  
    // Whenever an input changes value, change the corresponding state variable
    handleInputChange(event) {
      event.preventDefault();
      // Reset the alert to empty
      //this.setAlertMessage();
      const target = event.target;
      this.setState({
        [target.name]: target.value,
      });
    }
  
    // Handle the form submission by calling Userfront.signup()
    handleSubmit(event) {
      event.preventDefault();
      // Reset the alert to empty
      this.setAlertMessage();
      // Verify that the passwords match
      if (this.state.password !== this.state.passwordVerify) {
        return this.setAlertMessage('Passwords doesn\'t match');
      }
      // Call Userfront.signup()
      Userfront.signup({
        method: "password",
        email: this.state.email,
        password: this.state.password,   
        name: this.state.name,    
      }).catch((error) => {
        this.setAlertMessage(error.message);
      });
    }
    setAlertMessage(message) {
        this.setState({ alertMessage: message });
    }
    render() {
      return (
        <div className="login">
            
          <form onSubmit={this.handleSubmit}>
          <h2>Sign Up</h2>
            <label>
              Email address
              <input
                placeholder="Email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Account name
              <input
                placeholder="Account Name"
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Password
              <input
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Verify password
              <input
                placeholder="Confirm Password"
                name="passwordVerify"
                type="password"
                value={this.state.passwordVerify}
                onChange={this.handleInputChange}
              />
            </label>
            <Alert message={this.state.alertMessage} />
            <button className="button-84" role="button" type="submit">Sign up</button>
          </form>
        </div>
      );
    }
  }

  export default SignupForm;