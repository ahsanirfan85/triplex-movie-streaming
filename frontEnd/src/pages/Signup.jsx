import React from 'react';
import PageHeader from '../components/page-header/PageHeader';
import SignupForm from '../components/Login/SignupForm';

const Signup = () => {

    return (
      <>
        <PageHeader />
        <div className='container'>
          <div className='section mb-3'>
            
            <SignupForm />
          </div>
        </div>
      </>
    );
}

export default Signup;
