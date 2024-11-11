import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

import SocialButtons from "./SocialButtons";
import InputTextField from "./InputTextField";

export default function SignUp({ classes, onSignIn }) {

  //react hook form initialization
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      name: "",
    },
    mode: "onTouched",
  });

  const [loading, setLoading] = useState(false);

  return (
    <div className={classes.au_signin}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={classes.au_form}
      >
        <div className={classes.au_socialDiv} >
          <h1 className={classes.au_h1}>
            Register Here
          </h1>
          <p className={classes.au_p}>
            Enter your credentials to create new account{" "}
          </p>

          <SocialButtons classes={classes} />
        </div>

        <div className={classes.au_formDiv}>
          <InputTextField
            classes={classes}
            label="Name"
            id="name"
            message="*Name is required"
            register={register}
            errors={errors}
          />{" "}
          <InputTextField
            classes={classes}
            label="UserName"
            id="username"
            message="*UserName is required"
            register={register}
            errors={errors}
          />{" "}
          <InputTextField
            classes={classes}
            label="Email"
            id="email"
            message="*Email is required"
            register={register}
            errors={errors}
          />{" "}
          <InputTextField
            classes={classes}
            label="Password"
            id="password"
            message="*Password is required"
            register={register}
            errors={errors}
            min={6}
          />
        </div>

        <button
          disabled={loading}
          onClick={() => {}}
          className={classes.au_formButton}
          type="text"
        >
          {loading ? <span>Loading...</span> : "Register"}
        </button>

        <p className={classes.au_belowP}>
          Already have an account?{" "}
          <Link className={classes.au_belowLink} to="/auth/signin">Login</Link>
        </p>
      </form>
    </div>
  );
}
