import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Divider } from "@mui/material";
import toast from "react-hot-toast";

import InputTextField from "components/InputTextField";

export default function ResetPassword({ classes, appContext, onAppContextChanged, history }) {

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

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if(!token) {
    toast.error("Invalid reset token.\nPlease try again.");
    history.push("/auth/signin");
  }

  const handleResetPassword = async (data) => {
    const { password } = data;

    try {
      setLoading(true);

      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("newPassword", password);
      await appContext.api.post("/public/auth/reset-password", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toast.success("Password reset successful!\nYou can now log in.");
      reset();
    } catch (error) {
      toast.error("Error resetting password.\nPlease try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.au_signin}>
      <form onSubmit={handleSubmit(handleResetPassword)} className={classes.au_form}>
        <div className={classes.au_socialDiv}>
          <h1 className={classes.au_h1}>
            Update Your Password
          </h1>
          <p className={classes.au_p}>
            Enter your new Password to Update it
          </p>
        </div>
        <Divider className={classes.au_socialDivider}></Divider>

        <div className={classes.au_formDiv}>
          <InputTextField
            label="Password"
            id="password"
            message="*Password is required"
            register={register}
            errors={errors}
            min={10}
          />{" "}
        </div>
        <button
          disabled={loading}
          onClick={() => {}}
          className={classes.au_formButton}
          type="text"
        >
          {loading ? <span>Loading...</span> : "Submit"}
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
