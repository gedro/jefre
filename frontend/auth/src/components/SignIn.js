import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

import SocialButtons from "./SocialButtons";
import InputTextField from "./InputTextField";

export default function SignIn({ classes, onSignIn }) {

  //react hook form initialization
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      code: "",
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
            Login Here
          </h1>
          <p className={classes.au_p}>
            Please Enter your username and password{" "}
          </p>

          <SocialButtons classes={classes} />
        </div>

        <div className={classes.au_formDiv}>
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
            label="Password"
            id="password"
            message="*Password is required"
            register={register}
            errors={errors}
          />
        </div>

        <button
          disabled={loading}
          onClick={() => {}}
          className={classes.au_formButton}
          type="text"
        >
          {loading ? <span>Loading...</span> : "LogIn"}
        </button>

        <p className={classes.au_pForgotPassword}>
          <Link className={classes.au_linkForgotPassword} to="/forgot-password">
            Forgot Password?
          </Link>
        </p>

        <p className={classes.au_belowP}>
          Don't have an account?{" "}
          <Link className={classes.au_belowLink} to="/auth/signup">SignUp</Link>
        </p>
      </form>
    </div>
  );
}
