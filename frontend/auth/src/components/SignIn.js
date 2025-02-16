import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";

import SocialButtons from "./SocialButtons";
import InputTextField from "components/InputTextField";
import Button from "components/Button";

import { SuccessfulLoginHandler } from "../services/login-handler";

export default function SignIn({ classes, appContext, onAppContextChanged, history }) {

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

  //function for handle login with credentials
  const onLoginHandler = async (data) => {
    try {

      let response = null;
      try {
        setLoading(true);
        response = await appContext.api.post("/public/auth/signin", data);
        reset();
      } finally {
        setLoading(false);
      }

      if (response && response.status === 200 && response.data.jwtToken) {
        SuccessfulLoginHandler(response.data.jwtToken, appContext, onAppContextChanged, history);
      } else {
        toast.error("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      if (error) {
        toast.error("Invalid credentials");
      }
    }
  };

  return (
    <div className={classes.au_signin}>
      <form onSubmit={handleSubmit(onLoginHandler)} className={classes.au_form}>
        <div className={classes.au_socialDiv} >
          <h1 className={classes.au_h1}>
            Login Here
          </h1>
          <p className={classes.au_p}>
            Please Enter your username and password{" "}
          </p>

          <SocialButtons classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} />
        </div>

        <div className={classes.au_formDiv}>
          <InputTextField
            label="UserName / Email"
            id="username"
            message="*UserName or Email is required"
            register={register}
            errors={errors}
          />{" "}
          <InputTextField
            label="Password"
            id="password"
            message="*Password is required"
            register={register}
            errors={errors}
          />
        </div>

        <Button loading={loading} text="LogIn" />

        <p className={classes.au_pForgotPassword}>
          <Link className={classes.au_linkForgotPassword} to="/auth/forgot-password">
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
