import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

import SocialButtons from "./SocialButtons";
import InputTextField from "./InputTextField";

export default function SignIn({ classes, appContext, onAppContextChanged }) {

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

  //function for handle login with credentials
  const onLoginHandler = async (data) => {
    try {
      setLoading(true);

      const response = await appContext.api.post("/public/auth/signin", data);
      toast.success("Login Successful");
      reset();

      if (response.status === 200 && response.data.jwtToken) {
        const decodedToken = jwtDecode(response.data.jwtToken);
        handleSuccessfulLogin(response.data.jwtToken, decodedToken);
      } else {
        toast.error("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      if (error) {
        toast.error("Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessfulLogin = (token, decodedToken) => {
    const user = {
      username: decodedToken.sub,
      roles: decodedToken.roles ? decodedToken.roles.split(",") : [],
    };

    const newAppContext = {
      user: user,
      token: token,
      isSignedIn: true,
      isAdmin: user.roles.includes("ROLE_ADMIN"),
      isCandidate: user.roles.includes("ROLE_CANDIDATE"),
      isRecruiter: user.roles.includes("ROLE_RECRUITER")
    };

    onAppContextChanged(newAppContext);
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
