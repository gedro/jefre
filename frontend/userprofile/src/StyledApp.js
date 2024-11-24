import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";

import UserProfile from './components/UserProfile';

const useStyles = makeStyles((theme) => ({
  up_userprofile: {
    width: '100%',
    minWidth: '976px',
    maxWidth: '65rem',
    backgroundColor: 'rgb(255 255 255)',
    flexDirection: 'row',
    paddingLeft: '0px',
    paddingRight: '0px',
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: '1rem',
    minHeight: '500px',
    display: 'flex',
    unicodeBidi: 'isolate',
    lineHeight: 'inherit',
  },
  up_profile_columndiv: {
    boxShadow: '0 10px 15px -3px #d1d5db , 0 4px 6px -4px #d1d5db',
    paddingTop: '1.5rem',
    paddingBottom: '1.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    gap: '0.5rem',
    flexDirection: 'column',
    flex: '1 1',
    display: 'flex',
    unicodeBidi: 'isolate',
  },
  up_logo: {
    gap: '0.5rem',
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex',
    unicodeBidi: 'isolate',
  },
  up_details: {
    marginTop: '1rem',
    marginBottom: '1rem',
    display: 'block',
    unicodeBidi: 'isolate',
  },
  up_h3_name: {
    fontWeight: '600',
    fontSize: '1.5rem',
    lineHeight: '2rem',
    margin: '0',
    display: 'block',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
  up_user_props: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    marginBottom: '0.25rem',
    display: 'block',
    unicodeBidi: 'isolate',
  },
  up_user_prop_h1: {
    color: 'rgb(30 41 59)',
    fontWeight: '600',
    margin: '0',
    fontSize: 'inherit',
    display: 'block',
    marginBlockStart: '0.67em',
    marginBlockEnd: '0.67em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
  up_user_prop_span: {
    color: 'rgb(51 65 85)',
    fontWeight: '400',
    fontSize: 'inherit',
    display: 'inline',
  },
  up_accordions: {
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    display: 'block',
    unicodeBidi: 'isolate',
  },
  up_accordion: {
    boxShadow: '0 4px 6px -1px #d1d5db, 0 2px 4px -2px #d1d5db',
  },
  up_pwd_form: {
    gap: '0.75rem',
    flexDirection: 'column',
    display: 'flex',
    marginTop: '0em',
    unicodeBidi: 'isolate',
  },
  up_accordion_h3: {
    color: 'rgb(30 41 59)',
    fontWeight: '600',
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    margin: '0',
    display: 'block',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
  up_accordion_div: {
    marginTop: '1.5rem'
  },
  up_account_props: {
    gap: '1rem',
    flexDirection: 'column',
    display: 'flex',
    unicodeBidi: 'isolate',
  },
  up_last_login: {
    paddingTop: '2rem',
    display: 'block',
    unicodeBidi: 'isolate',
  },
  up_last_login_h3: {
    color: 'rgb(30 41 59)',
    fontWeight: '600',
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    marginBottom: '0.5rem',
    display: 'block',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
  up_last_login_div: {
    boxShadow: '0 4px 6px -1px #d1d5db, 0 2px 4px -2px #d1d5db',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    borderRadius: '0.375rem',
    display: 'block',
    unicodeBidi: 'isolate',
  },
  up_last_login_p: {
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
  }
}));

export default function StyledApp({ appContext, onAppContextChanged, history }) {
  const classes = useStyles();
  return (
    <Fragment>
      <UserProfile classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
    </Fragment>
  );
};
