import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  com_month: {
  },
}));

export default function MonthText({ months }) {
  const monthAsNbr = parseInt(months);
  const years = Math.floor(monthAsNbr / 12);
  const remainingMonths = monthAsNbr % 12;

  const classes = useStyles();
  return (
    <div className={classes.com_month}>
      {years ? (
        <span>{years} year{years > 1 && "s"}{" "}</span>
      ) : null}
      {remainingMonths ? (
        <span>{remainingMonths} month{remainingMonths > 1 && "s"}</span>
      ) : null}
    </div>
  );
}
