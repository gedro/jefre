import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  com_formButton: {
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
}));

export default function Button({ loading, text }) {
  const classes = useStyles();
  return (
    <button
      disabled={loading}
      onClick={() => {}}
      className={classes.com_formButton}
      type="text"
    >
      {loading ? <span>Loading...</span> : text}
    </button>
  );
}
