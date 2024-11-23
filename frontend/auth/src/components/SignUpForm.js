import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";

import SocialButtons from "./SocialButtons";
import InputTextField from "components/InputTextField";

export default function SignUpForm({ type, classes, appContext, onAppContextChanged, history }) {

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

  const onSubmitHandler = async (data) => {
    try {
      setLoading(true);
      const response = await appContext.api.post("/public/auth/signup?registrationType=" + type, data);
      toast.success("Register Successful");
      reset();
      if (response.data) {
        history.push("/auth/signin");
      }
    } catch (error) {
      // TODO: error handling does not work properly
      if (error?.status === 409) {
        setError("username", { message: "Username is already taken" });
        setError("email", { message: "Email is already in use" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.au_signin}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={classes.au_form}>
        <div className={classes.au_socialDiv} >
          <h1 className={classes.au_h1}>
            <u>{type === "candidate" ? "Candidate" : "Recruiter"}</u> Registration
          </h1>
          <p className={classes.au_p}>
            Enter your credentials to create new account{" "}
          </p>

          <SocialButtons
            classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} type={type}
          />
        </div>

        <div className={classes.au_formDiv}>
          <InputTextField
            label="Name"
            id={type + "_name"}
            name="name"
            message="*Name is required"
            register={register}
            errors={errors}
          />{" "}
          <InputTextField
            label="UserName"
            id={type + "_username"}
            name="username"
            message="*UserName is required"
            register={register}
            errors={errors}
          />{" "}
          <InputTextField
            label="Email"
            id={type + "_email"}
            name="email"
            message="*Email is required"
            register={register}
            errors={errors}
          />{" "}
          <InputTextField
            label="Password"
            id={type + "_password"}
            name="password"
            message="*Password is required"
            register={register}
            errors={errors}
            min={10}
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
