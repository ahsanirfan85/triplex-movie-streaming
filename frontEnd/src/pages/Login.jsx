import React from 'react';
import PageHeader from '../components/page-header/PageHeader';
import LoginForm from '../components/Login/LoginForm';


const Login = () => {

    return (
      <>
        <PageHeader />
        <div className='container'>
          <div className='section mb-3'>
            <LoginForm />
          </div>
        </div>
      </>
    );
}

export default Login;
