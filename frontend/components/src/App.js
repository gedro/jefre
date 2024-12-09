import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";

import MenuSidebar from './components/MenuSidebar';
import InputTextField from './components/InputTextField';
import Switch from './components/Switch';
import Button from './components/Button';
import Editor from './components/Editor';
import DatePicker from './components/DatePicker';

const items = [
  {
    label: 'All Users',
    link: '/admin/users',
    icon: <FaUser />
  }
];

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
    <BrowserRouter>
      <MenuSidebar name={"SHARED"} items={items} >
        <InputTextField
          label="UserName"
          id="username"
          message="*UserName or Email is required"
          register={register}
          errors={errors}
        />{" "}
        <Switch label={"Enabled"} checked={true} readOnly={false} />{" "} <br />
        <DatePicker label="Vacancy End Date" id="vacancyEndDate" />{" "}
        <Button loading={false} text="Test" />{" "}
        <Editor id="briefDescription" />
      </MenuSidebar>
    </BrowserRouter>
  );
};
