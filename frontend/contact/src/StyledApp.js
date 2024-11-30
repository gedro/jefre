import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ContactForm from './components/ContactForm';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*, ::before, ::after': {
      boxSizing: 'border-box',
      borderWidth: '0',
      borderStyle: 'solid',
      borderColor: '#e5e7eb',
    }
  },
  con_contact: {
    padding: '2rem',
    twBgOpacity: 1,
    backgroundColor: 'rgb(255 255 255)',
    borderRadius: '0.5rem',
    maxWidth: '35rem',
    width: '100%',
    marginLeft: '1rem',
    marginRight: '1rem',
    display: 'block',
    unicodeBidi: 'isolate',
  },
  con_h1: {
    fontWeight: '700',
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
    marginBottom: '1rem',
    margin: '0',
    display: 'block',
    marginBlockStart: '0.67em',
    marginBlockEnd: '0.67em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
    textAlign: 'center',
    twBgOpacity: 1,
  },
  con_form: {
    display: 'block',
    marginTop: '0em',
    unicodeBidi: 'isolate',
    textAlign: 'center',
  },
  con_p: {
    twTextOpacity: 1,
    color: 'rgb(75 85 99)',
    marginBottom: '1rem',
    margin: '0',
    display: 'block',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
    textAlign: 'center',
  },
  con_div: {
    display: 'block',
    unicodeBidi: 'isolate',
  },
  con_label: {
    twTextOpacity: 1,
    color: 'rgb(55 65 81)',
    textAlign: 'left',
    display: 'block',
    marginBottom: '0.5rem',
    cursor: 'default',
  },
  con_input: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    borderWidth: '1px',
    borderRadius: '0.5rem',
    width: '100%',
    fontSize: '100%',
    margin: '0',
    marginBottom: '1rem',
  },
  con_textarea: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    borderWidth: '1px',
    borderRadius: '0.5rem',
    width: '100%',
    fontSize: '100%',
    margin: '0',
    resize: 'vertical',
    textRendering: 'auto',
    textTransform: 'none',
    textIndent: '0px',
    textShadow: 'none',
    display: 'inline-block',
    textAlign: 'start',
    appearance: 'auto',
    cursor: 'text',
    overflowWrap: 'break-word',
    backgroundColor: 'field',
    columnCount: 'initial !important',
  },
  con_submit: {
    alignItems: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
    twTextOpacity: 1,
    color: 'rgb(255 255 255)',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    backgroundColor: 'rgb(59 130 246)',
    borderRadius: '0.6rem',
    cursor: 'pointer',
    backgroundImage: 'none',
    textTransform: 'none',
    fontSize: '100%',
    margin: '0',
    textRendering: 'auto',
    wordSpacing: 'normal',
    textIndent: '0px',
    textShadow: 'none',
    display: 'inline-block',
    textAlign: 'center',
    paddingBlock: '1em',
    paddingInline: '4em',
  },
  con_centerDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function StyledApp({ appContext, onAppContextChanged, history }) {
  const classes = useStyles();
  return (
    <Fragment>
      <ContactForm classes={classes} />
    </Fragment>
  );
};
