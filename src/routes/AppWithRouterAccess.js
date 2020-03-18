import React from 'react';
import { Route, Redirect, useHistory, Switch } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import Home from '../views/Home'
import LoginPage from '../views/LoginPage';
import Protected from '../components/Protected/Protected'
import AdminLayout from '../layouts/Admin/Admin.js'

const AppWithRouterAccess = () => { 
  const history = useHistory();
  const onAuthRequired = () => { 
    history.push('/login');
  };

  const config = {
    issuer: `https://${process.env.REACT_APP_OKTA_URL}/oauth2/default`,
    redirectUri: window.location.origin + "/implicit/callback",
    clientId: `${process.env.REACT_APP_OKTA_CLIEND_ID}`,
    pkce: true
  };

  return (
    <Security {...config} onAuthRequired={onAuthRequired}>
        <Switch>
            <Route path="/" exact component={Home} />
            <SecureRoute path="/protected" exact component={Protected} />
            <SecureRoute path="/admin" render={props => <AdminLayout {...props} />} />
            <Route path="/implicit/callback" exact component={LoginCallback} />
            <Route path='/login' exact render={() => <LoginPage baseUrl={`https://${process.env.REACT_APP_OKTA_URL}`} />} />
        </Switch>
      </Security>
  );
};
export default AppWithRouterAccess;