import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MuiSwitch from "@mui/material/Switch";

const useStyles = makeStyles((theme) => ({
  com_switch: {
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
