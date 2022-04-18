import React from 'react';
import PageHeader from '../components/page-header/PageHeader';
import Userfront from '@userfront/react';

const Login = () => {

  Userfront.init("9ny8z7vb");
  const LoginForm = Userfront.build({
    toolId: "adkoln"
  });

    return (
      <>
        <div className='container'>
          <div className='section mb-3'>
            <PageHeader />
            <LoginForm />
          </div>
        </div>
      </>
    );
}

export default Login;
