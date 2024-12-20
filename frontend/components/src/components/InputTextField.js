import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  com_inputFieldDiv: {
    gap: '0.25rem',
    flexDirection: 'column',
    display: 'flex',
    unicodeBidi: 'isolate',
    width: '100%',
  },
  com_inputField: {
    outline: '2px solid transparent',
    outlineOffset: '2px',
    color: 'rgb(51 65 85)',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    backgroundColor: 'transparent',
    borderColor: 'rgb(51 65 85)',
    borderWidth: '1px',
    borderRadius: '0.375rem',
    fontFamily: 'inherit',
    fontFeatureSettings: 'inherit',
    fontVariationSettings: 'inherit',
    fontSize: '100%',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
    margin: '0',
    paddingBlock: '1px',
    paddingInline: '2px',
    textRendering: 'auto',
    wordSpacing: 'normal',
    textTransform: 'none',
    textIndent: '0px',
    textShadow: 'none',
    display: 'inline-block',
    textAlign: 'start',
    appearance: 'auto',
    cursor: 'text',
    borderImage: 'initial',
  },
  com_inputFieldError: {
    borderColor: 'rgb(239 68 68)',
  },
  com_inputFieldErrorMsg: {
    color: 'rgb(239 68 68)',
    fontWeight: '600',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    marginTop: '0px',
    margin: '0',
    display: 'block',
    marginBlockStart: '0em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
}));

export default function InputTextField({
  label,
  id,
  name,
  errors,
  register,
  message,
  min,
  readOnly,
  autoComplete,
  autoFocus,
  required = true
}) {

  const classes = useStyles();
  const inputName = name ? name : id;

  return (
    <div className={classes.com_inputFieldDiv}>
      <style> {`
        .MuiFormControl-root {
          z-index: 0;
        }
      `} </style>
      <TextField
        className={ classes.com_inputField + (errors[id]?.message ? " " + classes.com_inputFieldError : "") }
        variant="outlined"
        margin="normal"
        required={required}
        fullWidth
        name={inputName}
        id={id}
        label={label}
        type={
          inputName.toLowerCase().includes("password") ? "password" :
          (inputName.toLowerCase().includes("email") ? "email" : "text")
        }
        autoComplete={autoComplete ? autoComplete : id}
        autoFocus={autoFocus ? autoFocus : false}

        InputProps={{
          classes: {
            notchedOutline: classes.com_inputField + (errors[id]?.message ? " " + classes.com_inputFieldError : "")
          },
          name: inputName,
        }}

        {...register(inputName, {
          required: {value: required, message},
          minLength: min
            ? {value: min, message: "Minimum " + min + " character is required"}
            : null,
        })}
        readOnly={readOnly}
      />

      {errors[id]?.message && (
        <p className={classes.com_inputFieldErrorMsg}>
          {errors[id]?.message}*
        </p>
      )}
    </div>
  );
}
