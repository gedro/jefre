import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*, ::before, ::after': {
      boxSizing: 'border-box',
      borderWidth: '0',
      borderStyle: 'solid',
      borderColor: '#e5e7eb',
    },
    html: {
      lineHeight: '1.5',
      tabSize: '4',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      fontFeatureSettings: 'normal',
      fontVariationSettings: 'normal',
    }
  },
  au_signin: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 74px)',
    display: 'flex',
  },
  au_signup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  au_form: {
    display: 'block',
    marginTop: '0em',
    unicodeBidi: 'isolate',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    width: '450px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'rgb(255 255 255)',
  },
  au_socialDiv: {
    display: 'block',
  },
  au_socialButtonsDiv: {
    paddingTop: '1.25rem',
    paddingBottom: '1.25rem',
    gap: '0.25rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
  },
  au_p: {
    color: 'rgb(71 85 105)',
    textAlign: 'center',
    margin: '0',
    display: 'block',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
  au_h1: {
    fontWeight: '700',
    fontSize: '1.5rem',
    lineHeight: '2rem',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    margin: '0',
    display: 'block',
    marginBottom: '1rem',
    marginBlockStart: '0.67em',
    marginBlockEnd: '0.67em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
  au_socialButtonLink: {
    transitionDuration: '300ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 1px 2px 0 #e2e8f0',
    padding: '0.5rem',
    borderWidth: '1px',
    borderRadius: '0.375rem',
    gap: '0.25rem',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 1',
    display: 'flex',
    color: 'inherit',
    textDecoration: 'inherit',
    cursor: 'pointer',
  },
  au_socialButtonLogoSpan: {
    color: 'inherit',
    cursor: 'pointer',
  },
  au_socialButtonLogo: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    display: 'block',
    verticalAlign: 'middle',
    stroke: 'currentcolor',
    fill: 'currentcolor',
    strokeWidth: '0',
    width: '1em',
    height: '1em',
    overflowClipMargin: 'content-box',
    overflow: 'hidden',
    x: '0px',
    y: '0px',
  },
  au_socialButtonText: {
    fontSize: '15px',
    fontWeight: '600',
    lineHeight: '1rem',
    color: 'inherit',
    textDecoration: 'inherit',
    cursor: 'pointer',
  },
  au_socialDivider: {
    margin: '1em !important',
    fontWeight: '600',
    borderBottomWidth: 'thin',
  },
  au_formDiv: {
    gap: '0.5rem',
    flexDirection: 'column',
    display: 'flex',
    unicodeBidi: 'isolate',
  },
  au_formButton: {
    transitionDuration: '100ms',
    transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    color: 'rgb(255 255 255)',
    fontWeight: '600',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    backgroundColor: 'rgba(172, 30, 35, 1)',
    borderRadius: '0.125rem',
    width: '100%',
    marginTop: '0.75rem',
    marginBottom: '0.75rem',
    cursor: 'pointer',
    backgroundImage: 'none',
    textTransform: 'none',
    fontFamily: 'inherit',
    fontFeatureSettings: 'inherit',
    fontVariationSettings: 'inherit',
    fontSize: '100%',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
    margin: '0',
    padding: '0',
    textIndent: '0px',
    textShadow: 'none',
    display: 'inline-block',
    textAlign: 'center',
    paddingBlock: '1px',
    paddingInline: '6px',
  },
  au_pForgotPassword: {
    color: 'rgb(51 65 85)',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    margin: '0',
    display: 'block',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
  au_linkForgotPassword: {
    textDecorationLine: 'underline',
    color: 'inherit',
    textDecoration: 'inherit',
    cursor: 'pointer',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
  au_belowP: {
    color: 'rgb(51 65 85)',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    textAlign: 'center',
    marginTop: '1.5rem',
    margin: '0',
    display: 'block',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
  au_belowLink: {
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: 'inherit',
    textDecoration: 'inherit',
    cursor: 'pointer',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    textAlign: 'center',
  }
}));

export default ({ appContext, onAppContextChanged, history }) => {
  const classes = useStyles();

  return (
    <Switch>
      <Route path="/auth/signin">
        <SignIn classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
      </Route>
      <Route path="/auth/signup">
        <SignUp classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
      </Route>
      <Route path="/auth/oauth2/redirect">
        <OAuth2RedirectHandler appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
      </Route>
      <Route path="/auth/reset-password">
        <ResetPassword classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
      </Route>
      <Route exact path="/auth/forgot-password">
        <ForgotPassword classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
      </Route>
    </Switch>
  );
};
