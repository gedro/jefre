import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
}));

export default function FooterLine() {
  const classes = useStyles();

  return (
    <div className={classes.h1} />
  );
};