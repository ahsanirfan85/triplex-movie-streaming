import React from 'react';
import Userfront from '@userfront/core';
import './styles.scss';
import Alert from './Alert';
import SSOButton from './SSOButton';

class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        emailOrUsername: "",
        password: "",
        alertMessage: "",
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.setAlertMessage = this.setAlertMessage.bind(this);
    }
  
    handleInputChange(event) {
      event.preventDefault();
      const target = event.target;
      this.setState({
        [target.name]: target.value,
      });
      this.setState({ alertMessage: "" });
    }
  
    handleSubmit(event) {
      event.preventDefault();
     // Reset the alert to empty
      this.setAlertMessage();
      // Call Userfront.login()
      Userfront.login({
        method: "password",
        emailOrUsername: this.state.emailOrUsername,
        password: this.state.password,
      }).catch((error) => {
        this.setAlertMessage(error.message);
      });
    }
    setAlertMessage(message) {
        this.setState({ alertMessage: message });
    }
  
    render() {
      return (
        <div id="login">
          
          <form onSubmit={this.handleSubmit}>
          <h2>Sign in</h2>
            <label>
              Email or username
              <input
                placeholder='Email or Username'
                name="emailOrUsername"
                type="text"
                value={this.state.emailOrUsername}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Password
              <input
                placeholder='Password'
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </label>
            <Alert message={this.state.alertMessage} /> 
            <button class="button-84" role="button" type="submit">Log in</button>
            <p>or</p>

            <SSOButton provider="google" />
          </form>
        </div>
      );
    }
  }


  export default LoginForm;