import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

import SocialButtons from "./SocialButtons";
import InputTextField from "./InputTextField";

export default function SignUpForm({ type, classes, appContext, onAppContextChanged }) {

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
            <u>{type === "candidate" ? "Candidate" : "Recruiter"}</u> Registration
          </h1>
          <p className={classes.au_p}>
            Enter your credentials to create new account{" "}
          </p>

          <SocialButtons classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} />
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
          {loading ? <span>Loading...</span> : "Register as " + (type === "candidate" ? "Candidate" : "Recruiter")}
        </button>

        <p className={classes.au_belowP}>
          Already have an account?{" "}
          <Link className={classes.au_belowLink} to="/auth/signin">Login</Link>
        </p>
      </form>
    </div>
  );
}
