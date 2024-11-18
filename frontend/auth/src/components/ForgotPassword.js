import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Divider } from "@mui/material";
import toast from "react-hot-toast";

import InputTextField from "./InputTextField";

export default function ForgotPassword({ classes, appContext, onAppContextChanged, history }) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onTouched",
  });

  const [loading, setLoading] = useState(false);

  const onPasswordForgotHandler = async (data) => {
    const { email } = data;
    try {
      setLoading(true);

      const formData = new URLSearchParams();
      formData.append("email", email);
      await appContext.api.post("/public/auth/forgot-password", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      reset();
      toast.success("Password reset email sent!\nCheck your inbox.");
    } catch (error) {
      toast.error("Error sending password reset email.\nPlease try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.au_signin}>
      <form onSubmit={handleSubmit(onPasswordForgotHandler)} className={classes.au_form}>
        <div className={classes.au_socialDiv} >
          <h1 className={classes.au_h1}>
            Forgot Password?
          </h1>
          <p className={classes.au_p}>
            Enter your email a Password reset email will sent
          </p>
        </div>
        <Divider className={classes.au_socialDivider}></Divider>

        <div className={classes.au_formDiv}>
          <InputTextField
            classes={classes}
            label="Email"
            id="email"
            message="*Email is required"
            register={register}
            errors={errors}
          />{" "}
        </div>
        <button
          disabled={loading}
          onClick={() => {}}
          className={classes.au_formButton}
          type="text"
        >
          {loading ? <span>Loading...</span> : "Send"}
        </button>
        <p className={classes.au_pForgotPassword}>
          <Link className={classes.au_linkForgotPassword} to="/auth/signin">
            Back To Login
          </Link>
        </p>
      </form>
    </div>
  );
};
