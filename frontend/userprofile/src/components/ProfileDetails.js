import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import toast from "react-hot-toast";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import InputTextField from "components/InputTextField";
import Button from "components/Button";
import Switch from "components/Switch";

export default function ProfileDetails({ classes, appContext, onAppContextChanged, history }) {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    mode: "onTouched",
  });

  const [loading, setLoading] = useState(false);

  const [openCredentials, setOpenCredentials] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const onOpenCredentialsHandler = () => {
    setOpenCredentials(!openCredentials);
    setOpenAccount(false);
  };
  const onOpenAccountHandler = () => {
    setOpenAccount(!openAccount);
    setOpenCredentials(false);
  };

  const handleUpdateCredential = async (data) => {
    try {
      //TODO: Add API call to update user password
      //TODO: Check if old password is correct
      //TODO: Check if new password and confirm new password match

      setLoading(true);
      await appContext.api.post("/public/auth/update-credentials", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toast.success("Update Password successful");
    } catch (error) {
      toast.error("Update Password failed");
    } finally {
      setLoading(false);
    }
  };

  const [userDetails, setUserDetails] = useState({
    enabled: false,
    accountNonLocked: false,
    accountNonExpired: false,
    credentialsNonExpired: false,
  });

  useEffect(() => {
    if( userDetails !== {} && appContext?.api?.get ) {
      appContext.api.get(`/user`)
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((error) => {
          toast.error("Error fetching user details");
        });
    }
  }, []);

  const [loginSession, setLoginSession] = useState(null);
  useEffect(() => {
    if (appContext.token) {
      const decodedToken = jwtDecode(appContext.token);

      const lastLoginSession = moment
        .unix(decodedToken.iat)
        .format("dddd, D MMMM YYYY, h:mm A");
      setLoginSession(lastLoginSession);
    }
  }, [appContext.token]);

  return (
    <div className={classes.up_profile_columndiv}>
      <div className={classes.up_logo}>
        <Avatar
          alt={appContext?.user?.name}
          src="/static/images/avatar/1.jpg" //TODO: Add user profile image, initially set from Google / GitHub profile
        />
        <h3 className={classes.up_h3_name}>
          {appContext?.user?.name}
        </h3>
      </div>
      <div className={classes.up_details}>
        <div className={classes.up_user_props}>
          <h1 className={classes.up_user_prop_h1}>
            UserName:{" "}
            <span className={classes.up_user_prop_span}>
              {appContext?.user?.username}
            </span>
          </h1>
          <h1 className={classes.up_user_prop_h1}>
            Email:{" "}
            <span className={classes.up_user_prop_span}>
              {appContext?.user?.email}
            </span>
          </h1>
        </div>
        <div className={classes.up_accordions}>
          <Accordion expanded={openCredentials}>
            <AccordionSummary
              className={classes.up_accordion}
              onClick={onOpenCredentialsHandler}
              expandIcon={<ArrowDropDownIcon/>}
              aria-controls="credentials-panel-content"
              id="credentials-panel-header"
            >
              <h3 className={classes.up_accordion_h3}>
                Update Password
              </h3>
            </AccordionSummary>
            <AccordionDetails className={classes.up_accordion}>
              <form
                className={classes.up_pwd_form}
                onSubmit={handleSubmit(handleUpdateCredential)}
              >
                <InputTextField
                  label="Old Password"
                  id="old_password"
                  message="*Old Password is required"
                  register={register}
                  errors={errors}
                />{" "}
                <InputTextField
                  label="New Password"
                  id="new_password"
                  message="*New Password is required"
                  register={register}
                  errors={errors}
                  min={10}
                />{" "}
                <InputTextField
                  label="Confirm New Password"
                  id="new_password_confirmation"
                  message="*Password confirmation is required"
                  register={register}
                  errors={errors}
                  min={10}
                />
                <Button loading={loading} text="Update"/>
              </form>
            </AccordionDetails>
          </Accordion>

          <div className={classes.up_accordion_div}>
            <Accordion expanded={openAccount}>
              <AccordionSummary
                className={classes.up_accordion}
                onClick={onOpenAccountHandler}
                expandIcon={<ArrowDropDownIcon/>}
                aria-controls="account-panel-content"
                id="account-panel-header"
              >
                <h3 className={classes.up_accordion_h3}>
                  Account status
                </h3>
              </AccordionSummary>
              <AccordionDetails className={classes.up_accordion}>
                <div className={classes.up_account_props}>
                  <div>
                    <Switch label={"Account Enabled"} checked={userDetails?.enabled} readOnly={true}/>
                  </div>
                  {" "}
                  <div>
                    <Switch label={"Account Not Locked"} checked={userDetails?.accountNonLocked} readOnly={true}/>
                  </div>
                  {" "}
                  <div>
                    <Switch label={"Account Active"} checked={userDetails?.accountNonExpired} readOnly={true}/>
                  </div>
                  {" "}
                  <div>
                    <Switch label={"Credential Active"} checked={userDetails?.credentialsNonExpired} readOnly={true}/>
                  </div>

                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className={classes.up_last_login}>
            <h3 className={classes.up_last_login_h3}>
              Last Login Session
            </h3>
            <div className={classes.up_last_login_div}>
              <p className={classes.up_last_login_p}>
                <span>{loginSession}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};