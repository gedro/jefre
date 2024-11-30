import React, { Fragment } from 'react';
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";

import MenuSidebar from './components/MenuSidebar';
import InputTextField from './components/InputTextField';
import Switch from './components/Switch';
import Button from './components/Button';

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

  const items = [
    {
      label: 'All Users',
      link: '/admin/users',
      icon: <FaUser />
    }
  ];

  return (
    <Fragment>
      <MenuSidebar name={"SHARED"} items={items} >
        <InputTextField
          label="UserName"
          id="username"
          message="*UserName or Email is required"
          register={register}
          errors={errors}
        />{" "}
        <Switch label={"Enabled"} checked={true} readOnly={false}/>{" "}
        <Button loading={false} text="Test" />
      </MenuSidebar>
    </Fragment>
  );
};
