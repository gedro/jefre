import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    a: {
      textDecoration: 'none',
    },
    p: {
      marginBottom: '1rem',
      margin: '0px',
      display: 'block',
      marginBlockStart: '1em',
      marginBlockEnd: '1em',
      marginInlineStart: '0px',
      marginInlineEnd: '0px',
      unicodeBidi: 'isolate',
    }
  },
  policy: {
    width: '100%',
    minWidth: '768px',
    padding: '2rem',
    minHeight: '100vh',
    display: 'block',
    unicodeBidi: 'isolate',
    twBgOpacity: 1,
    backgroundColor: 'rgb(255 255 255)',
    borderRadius: '0.5rem',
    maxWidth: '28rem',
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  h1: {
    fontSize: '2.25rem',
    lineHeight: '2.5rem',
    marginBottom: '1rem',
    display: 'block',
    marginBlockStart: '0.67em',
    marginBlockEnd: '0.67em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    fontWeight: 'bold',
    unicodeBidi: 'isolate',
  },
}));

export default function AboutUs() {
  const classes = useStyles();

  return (
    <div className={classes.policy}>
      <h1 className={classes.h1}>Privacy Policy</h1>
      <p>
      </p>

      <h2 className={classes.h2}></h2>
      <p>
      </p>
    </div>
  );
};