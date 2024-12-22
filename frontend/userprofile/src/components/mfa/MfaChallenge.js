import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccordionDetails from "@mui/material/AccordionDetails";

import InputTextField from "components/InputTextField";
import Button from "components/Button";

export default function MfaChallenge({ classes, appContext, onAppContextChanged, qrCodeUrl }) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
    },
    mode: "onTouched",
  });

  const [loading, setLoading] = useState(false);

  const verifyMfa = async (data) => {
    if (!data.code || data.code.trim().length === 0) {
      return toast.error("Please Enter The Code To Verify");
    }

    try {
      setLoading(true);

      const formData = new URLSearchParams();
      formData.append("code", data.code);

      await appContext.api.post(`/auth/mfa/verify`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success("MFA verified successful");

      onAppContextChanged({ toLogout: true });
    } catch (error) {
      toast.error("Invalid MFA Code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-3">
      <Accordion>
        <AccordionSummary
          className={classes.up_accordion}
          expandIcon={<ArrowDropDownIcon/>}
          aria-controls="qrcode-panel-content"
          id="qrcode-panel-header"
        >
          <h3 className={classes.up_accordion_h3}>
            QR Code To Scan
          </h3>
        </AccordionSummary>
        <AccordionDetails className={classes.up_accordion}>
          <form className={classes.up_pwd_form} onSubmit={handleSubmit(verifyMfa)} >
            <img src={qrCodeUrl} className={classes.up_mfa_img} alt="QR Code"/>
            <InputTextField
              label="MFA Code"
              id="code"
              message="*MFA code is required"
              register={register}
              errors={errors}
            />{" "}
            <Button loading={loading} text="Verify MFA"/>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
);
};