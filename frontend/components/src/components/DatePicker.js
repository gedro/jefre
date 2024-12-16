import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
  com_date: {
    gap: '0.25rem',
    margin: '0',
    marginBlockStart: '0.3em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
  com_date_label: {
    marginRight: "1.5em",
  },
  com_date_picker: {
    fontSize: '1rem',
  }
}));

export default function DatePicker({ label, id, value, handleOnChange, required }) {
  const classes = useStyles();

  return (
    <div className={classes.com_date}>
      <label htmlFor={id} className={classes.com_date_label}>{" "}{label}</label>
      <ReactDatePicker
        id={id}
        name={id}
        selected={value}
        onChange={(date) => handleOnChange(date)}
        dateFormat="yyyy-MM-dd"
        required={!!required}
        className={classes.com_date_picker}
      />
    </div>
  );
};
