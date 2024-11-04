import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  contact: {
    padding: '2rem',
    twBgOpacity: 1,
    backgroundColor: 'rgb(255 255 255)',
    borderRadius: '0.5rem',
    maxWidth: '65rem',
    width: '100%',
    marginLeft: '1rem',
    marginRight: '1rem',
    display: 'block',
    unicodeBidi: 'isolate',
  },
  h1: {
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
  form: {
    display: 'block',
    marginTop: '0em',
    unicodeBidi: 'isolate',
    textAlign: 'center',
  },
  p: {
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
  div: {
    display: 'block',
    unicodeBidi: 'isolate',
  },
  label: {
    twTextOpacity: 1,
    color: 'rgb(55 65 81)',
    textAlign: 'left',
    display: 'block',
    marginBottom: '0.5rem',
    cursor: 'default',
  },
  input: {
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
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
  },
  textarea: {
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
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
  },
  submit: {
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
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
  }
}));

export default function AboutUs() {
  const classes = useStyles();

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.contact}>
      <h1 className={classes.h1}>Contact Us</h1>
      <p className={classes.p}>
        We'd love to hear from you! If you have any questions or feedback,
        feel free to reach out to us.
      </p>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <div className={classes.div}>
          <label className={classes.label} htmlFor="name" >
            Name
          </label>
          <input type="text" id="name" className={classes.input} />
        </div>
        <div className={classes.div}>
          <label className={classes.label} htmlFor="email" >
            Email
          </label>
          <input type="email" id="email" className={classes.input} />
        </div>
        <div className={classes.div}>
          <label className={classes.label} htmlFor="message" >
            Message
          </label>
          <textarea id="message" className={classes.textarea}></textarea>
        </div>
        <button type="submit" className={classes.submit}>
          Send Message
        </button>
      </form>
    </div>
  );
};