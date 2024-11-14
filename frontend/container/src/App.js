import React, { Fragment, lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';
import { Toaster } from "react-hot-toast";

import Progress from './components/Progress';

const HeaderLazy = lazy(() => import('./components/mfe/connector/HeaderApp'));
const FooterLazy = lazy(() => import('./components/mfe/connector/FooterApp'));
const BackendApiLazy = lazy(() => import('./components/mfe/connector/BackendApiApp'));
const HomeLazy = lazy(() => import('./components/mfe/connector/HomeApp'));
const AboutUsLazy = lazy(() => import('./components/mfe/connector/AboutUsApp'));
const ContactLazy = lazy(() => import('./components/mfe/connector/ContactApp'));
const TermsLazy = lazy(() => import('./components/mfe/connector/TermsApp'));
const PrivacyLazy = lazy(() => import('./components/mfe/connector/PrivacyApp'));
const AuthLazy = lazy(() => import('./components/mfe/connector/AuthApp'));
const AdminLazy = lazy(() => import('./components/mfe/connector/AdminApp'));
const DashboardLazy = lazy(() => import('./components/mfe/connector/DashboardApp'));

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

  // only for logging, no need to keep this
  useEffect(() => {
    console.log("appContextChanged", appContext);
  }, [
    appContext.user, appContext.token, appContext.isSignedIn,
    appContext.isAdmin, appContext.isCandidate, appContext.isRecruiter
  ]);

  useEffect(() => {
    console.log('appContextChanged isSignedIn ', appContext);
  }, [appContext.isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Fragment>
          <Suspense fallback={<Progress />}>
            <BackendApiLazy appContext={appContext} onAppContextChanged={setAppContext} />
            <HeaderLazy appContext={appContext} onAppContextChanged={setAppContext} />
            <div style={{
              twBgOpacity: 1,
              backgroundColor: 'rgb(243 244 246)',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 'calc(100vh - 74px)',
              display: 'flex',
              unicodeBidi: 'isolate',
            }}>
              <Switch>
                <Route path="/about" component={AboutUsLazy} />
                <Route path="/contact" component={ContactLazy} />
                <Route path="/terms" component={TermsLazy} />
                <Route path="/policy" component={PrivacyLazy} />
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
                <Route path="/admin">
                  {!appContext.isSignedIn && <Redirect to="/" />}
                  <AdminLazy
                    appContext={appContext}
                    onAppContextChanged={setAppContext}
                  />
                </Route>
                <Route path="/" component={HomeLazy} />
              </Switch>
            </div>
            <FooterLazy />
          </Suspense>
          <Toaster position="bottom-center" reverseOrder={false} />
        </Fragment>
      </StylesProvider>
    </Router>
  );
};
