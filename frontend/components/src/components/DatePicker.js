import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
  com_date: {
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

export default function DatePicker({ label, id, value, handleOnChange, required }) {
  const classes = useStyles();

  return (
    <div className={classes.com_date}>
      <label htmlFor={name}>{" "}{label}</label>
      <ReactDatePicker
        id={id}
        name={id}
        selected={value}
        onChange={(date) => handleOnChange(date)}
        dateFormat="yyyy-MM-dd"
        required={!!required}
      />
    </div>
  );
};
