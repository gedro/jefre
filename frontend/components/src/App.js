import React, { Fragment } from 'react';
import { useForm } from "react-hook-form";

import InputTextField from './components/InputTextField';

export default () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
    },
    mode: "onTouched",
  });

  return (
    <Fragment>
      <InputTextField
        label="UserName"
        id="username"
        message="*UserName or Email is required"
        register={register}
        errors={errors}
      />{" "}
    </Fragment>
  );
};
