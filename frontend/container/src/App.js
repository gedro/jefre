import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Progress from './components/Progress';
import Header from './components/Header';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));
const BackendApiLazy = lazy(() => import('./components/BackendApiApp'));
const AboutUsLazy = lazy(() => import('./components/AboutUsApp'));
const ContactLazy = lazy(() => import('./components/ContactApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {

  const storageToken = localStorage.getItem("JWT_TOKEN");
  const getToken = storageToken ? JSON.stringify(storageToken) : null;

  const isADmin = localStorage.getItem("IS_ADMIN")
    ? JSON.stringify(localStorage.getItem("IS_ADMIN"))
    : false;

  const [appContext, setAppContext] = useState({
    apiUrl: process.env.API_BASE_URL,
    api: null,
    token: getToken,
    user: null,
    isSignedIn: false,
    isAdmin: false,
    isCandidate: false,
    isRecruiter: false,
  });

  const setIsSignedIn = (isSignedIn) => {
    setAppContext(previousState => {
      return { ...previousState, isSignedIn: isSignedIn }
    });
  }

  const setApi = (api) => {
    setAppContext(previousState => {
      return { ...previousState, api: api }
    });
  }

  useEffect(() => {
    if (appContext.isSignedIn) {
      history.push('/dashboard');
    }
  }, [appContext.isSignedIn]);

  useEffect(() => {
    if (appContext.api) {
      console.log("appContext.api", appContext.api);
      // console.log("api", api);
      appContext.api.get("").then((response) => {
        console.log("response", response);
      });
    }
  }, [appContext.api]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <React.Fragment>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={appContext.isSignedIn}
          />
          <div style={{
            twBgOpacity: 1,
            backgroundColor: 'rgb(243 244 246)',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 74px)',
            display: 'flex',
            unicodeBidi: 'isolate',
          }}>
            <Suspense fallback={<Progress />}>
              <BackendApiLazy
                appContext={{...appContext, onApiSet: (api) => setApi(api)}}
                onAppContextChanged={setAppContext}
              />
              <Switch>
                <Route path="/about" component={AboutUsLazy} />
                <Route path="/contact" component={ContactLazy} />
                <Route path="/auth">
                  <AuthLazy
                    appContext={{...appContext, onSignIn: () => setIsSignedIn(true)}}
                    onAppContextChanged={setAppContext}
                  />
                </Route>
                <Route path="/dashboard">
                  {!appContext.isSignedIn && <Redirect to="/" />}
                  <DashboardLazy />
                </Route>
                <Route path="/" component={MarketingLazy} />
              </Switch>
            </Suspense>
          </div>
        </React.Fragment>
      </StylesProvider>
    </Router>
  );
};
