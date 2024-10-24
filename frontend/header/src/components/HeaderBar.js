import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
}));

export default function HeaderBar() {
  const classes = useStyles();

  return (
    <div className={classes.h1} />
  );
};