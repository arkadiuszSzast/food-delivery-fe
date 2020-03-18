import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm.js';
import { useOktaAuth } from '@okta/okta-react';

const LoginPage = ({ baseUrl }) => { 
  const { authState } = useOktaAuth();

  if (authState.isPending) { 
    return <div>Loading...</div>;
  }
  return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/' }}/> :
    <LoginForm baseUrl={baseUrl} />;
};

export default LoginPage