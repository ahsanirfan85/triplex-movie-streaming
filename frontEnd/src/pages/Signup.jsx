import React from 'react';
import PageHeader from '../components/page-header/PageHeader';
import Userfront from '@userfront/react';

const Login = () => {

  Userfront.init("9ny8z7vb");
  const SignupForm = Userfront.build({
    toolId: "rlbkak"
  });

    return (
      <>
        <div className='container'>
          <div className='section mb-3'>
            <PageHeader />
            <h1>Sign Up</h1>
            <SignupForm />
          </div>
        </div>
      </>
    );
}

export default Login;
