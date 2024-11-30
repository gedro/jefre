import React, { Fragment, lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';
import toast, { Toaster } from "react-hot-toast";

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
const UserProfileLazy = lazy(() => import('./components/mfe/connector/UserProfileApp'));
const AdminLazy = lazy(() => import('./components/mfe/connector/AdminApp'));
const CandidateLazy = lazy(() => import('./components/mfe/connector/CandidateApp'));
const DashboardLazy = lazy(() => import('./components/mfe/connector/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {

  const storageCsrfToken = localStorage.getItem("CSRF_TOKEN");
  const foundCsrfToken = storageCsrfToken ? JSON.parse(storageCsrfToken) : null;

  const storageToken = localStorage.getItem("JWT_TOKEN");
  const foundToken = storageToken ? JSON.parse(storageToken) : null;

  const storageUser = localStorage.getItem("USER");
  const foundUser = storageUser ? JSON.parse(storageUser) : null;

  // Clean up local storage if token or user is missing (inconsistency)
  if(foundToken && !foundUser) {
    localStorage.removeItem("JWT_TOKEN");
  }
  if(foundUser && !foundToken) {
    localStorage.removeItem("USER");
  }

  //TODO: validate token and user against backend
  const [appContext, setAppContext] = useState({
    apiUrl: process.env.PRODUCTION_BACKEND_DOMAIN,
    api: null,
    csrfToken: foundCsrfToken,
    token: foundToken && foundUser ? foundToken : null,
    user: foundToken && foundUser ? foundUser : null,
    isSignedIn: foundToken && foundUser,
    isAdmin: foundToken && foundUser && foundUser.roles?.includes("ROLE_ADMIN"),
    isCandidate: foundToken && foundUser && foundUser.roles?.includes("ROLE_CANDIDATE"),
    isRecruiter: foundToken && foundUser && foundUser.roles?.includes("ROLE_RECRUITER"),
  });

  const onAppContextChanged = (newAppContext) => {
    setAppContext(previousState => {
      return { ...previousState, ...newAppContext }
    });
  }

  useEffect(() => {
    if (!appContext.isSignedIn && (appContext?.user || appContext?.token)) {
      appContext.api.post("/logout")
        .then(() => toast.success("Logged out"))
        .then(() => onAppContextChanged({
          csrfToken: null,
          token: null,
          user: null,
          isAdmin: false,
          isCandidate: false,
          isRecruiter: false
        }))
        .then(() => history.push('/'))
        .catch(() => toast.error("Failed to logout"));
    }
  }, [appContext.isSignedIn]);

  useEffect(() => {
    if (appContext.csrfToken) {
      localStorage.setItem("CSRF_TOKEN", JSON.stringify(appContext.csrfToken));
    } else {
      localStorage.removeItem("CSRF_TOKEN");
    }
  }, [appContext.csrfToken]);

  useEffect(() => {
    if (appContext.token) {
      localStorage.setItem("JWT_TOKEN", JSON.stringify(appContext.token));
    } else {
      localStorage.removeItem("JWT_TOKEN");
    }
  }, [appContext.token]);

  useEffect(() => {
    if (appContext.user) {
      localStorage.setItem("USER", JSON.stringify(appContext.user));
    } else {
      localStorage.removeItem("USER");
    }
  }, [appContext.user]);

  // only for logging, no need to keep this
  useEffect(() => {
    console.log("CONTAINER appContextChanged", appContext);
  }, [
    appContext.api, appContext.csrfToken,
    appContext.user, appContext.token, appContext.isSignedIn,
    appContext.isAdmin, appContext.isCandidate, appContext.isRecruiter
  ]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Fragment>
          <Suspense fallback={<Progress />}>
            <BackendApiLazy appContext={appContext} onAppContextChanged={onAppContextChanged} />
            <HeaderLazy appContext={appContext} onAppContextChanged={onAppContextChanged} />
            <div style={{
              backgroundColor: 'rgb(243 244 246)',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 'calc(100vh - 74px)',
              display: 'flex',
              unicodeBidi: 'isolate',
              width: '100%'
            }}>
              <Switch>
                <Route exact path="/about" component={AboutUsLazy} />
                <Route exact path="/contact" component={ContactLazy} />
                <Route exact path="/terms" component={TermsLazy} />
                <Route exact path="/policy" component={PrivacyLazy} />
                <Route path="/auth">
                  {appContext.isSignedIn && <Redirect to="/" />}
                  <AuthLazy appContext={appContext} onAppContextChanged={onAppContextChanged} />
                </Route>
                <Route exact path="/dashboard">
                  {!appContext.isSignedIn && <Redirect to="/" />}
                  <DashboardLazy />
                </Route>
                <Route path="/recruiter">
                  {(!appContext.isSignedIn || !appContext.isRecruiter) && <Redirect to="/" />}
                  <AdminLazy appContext={appContext} onAppContextChanged={onAppContextChanged} />
                </Route>
                <Route path="/candidate">
                  {(!appContext.isSignedIn || !appContext.isCandidate) && <Redirect to="/" />}
                  <CandidateLazy appContext={appContext} onAppContextChanged={onAppContextChanged} />
                </Route>
                <Route path="/profile">
                  {!appContext.isSignedIn && <Redirect to="/" />}
                  <UserProfileLazy appContext={appContext} onAppContextChanged={onAppContextChanged} />
                </Route>
                <Route path="/admin">
                  {(!appContext.isSignedIn || !appContext.isAdmin) && <Redirect to="/" />}
                  <AdminLazy appContext={appContext} onAppContextChanged={onAppContextChanged} />
                </Route>
                <Route exact path="/" component={HomeLazy} />
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
