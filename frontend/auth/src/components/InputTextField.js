import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function InputTextField({
  classes,
  label,
  id,
  name,
  errors,
  register,
  message,
  min,
  readOnly,
  autoComplete,
  autoFocus
}) {

  const inputName = name ? name : id;

  return (
    <div className={classes.au_inputFieldDiv}>
      <TextField
        className={ classes.au_inputField + (errors[id]?.message ? " " + classes.au_inputFieldError : "") }
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name={inputName}
        id={id}
        label={label}
        type={inputName === "password" ? "password" : (inputName === "email" ? "email" : "text")}
        autoComplete={autoComplete ? autoComplete : id}
        autoFocus={autoFocus ? autoFocus : false}

        InputProps={{
          classes: {
            notchedOutline: classes.au_inputField + (errors[id]?.message ? " " + classes.au_inputFieldError : "")
          },
          name: inputName,
        }}

        {...register(inputName, {
          required: {value: true, message},
          minLength: min
            ? {value: min, message: "Minimum " + min + " character is required"}
            : null,
        })}
        readOnly={readOnly}
      />

      {errors[id]?.message && (
        <p className={classes.au_inputFieldErrorMsg}>
          {errors[id]?.message}*
        </p>
      )}
    </div>
  );
}
