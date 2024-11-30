import React from "react";

export default function MfaHeader({ classes, appContext }) {

  return (
    <div className={classes.up_mfa_header_div}>
      <h1 className={classes.up_mfa_header_h1}>
        <span>Authentication (MFA)</span>
        <span className={ classes.up_mfa_header_h1_state + " " + (
          appContext?.user?.isMfaEnabled ? classes.up_mfa_header_h1_state_green : classes.up_mfa_header_h1_state_red
        ) } >
          {appContext?.user?.isMfaEnabled ? "Activated" : "Deactivated"}
        </span>
      </h1>{" "}
      <h3 className={classes.up_mfa_header_h3}>
        Multi Factor Authentication
      </h3>{" "}
      <p className={classes.up_mfa_header_p}>
        Add a additional layer of security to your account
      </p>
    </div>
  );
};