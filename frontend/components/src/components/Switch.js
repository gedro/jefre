import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MuiSwitch from "@mui/material/Switch";

const useStyles = makeStyles((theme) => ({
  com_switch: {
    color: 'rgb(51 65 85)',
    fontWeight: '500',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    margin: '0',
    display: 'inline',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
}));

export default function Switch({ label, checked, readOnly }) {
  const classes = useStyles();
  return (
    <Fragment>
      <h3 className={classes.com_switch}>
        {label}
      </h3>
      <MuiSwitch checked={checked} readOnly={readOnly} inputProps={{"aria-label": "controlled"}}/>
    </Fragment>
  );
}
