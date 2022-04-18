import React from 'react';
import PageHeader from '../components/page-header/PageHeader';
import SignupForm from '../components/Login/SignupForm';

const Signup = () => {

    return (
      <>
        <div className='container'>
          <div className='section mb-3'>
            <PageHeader />
            
            <SignupForm />
          </div>
        </div>
      </>
    );
}

export default Signup;
