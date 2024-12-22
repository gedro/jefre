import React, { useState } from "react";
import toast from "react-hot-toast";

import MfaChallenge from "./MfaChallenge";
import MfaHeader from "./MfaHeader";

export default function Mfa({ classes, appContext, onAppContextChanged, history }) {
  const [loading, setLoading] = useState(false);
  const [mfaUnderConfiguration, setMfaUnderConfiguration] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const enable2FA = async () => {
    setLoading(true);
    try {
      const response = await appContext.api.post(`/auth/mfa/start`);
      setQrCodeUrl(response.data);
      setMfaUnderConfiguration(true);
    } catch (error) {
      toast.error("Error enabling MFA");
    } finally {
      setLoading(false);
    }
  };

  const disable2FA = async () => {
    setLoading(true);
    try {
      await appContext.api.post(`/auth/mfa/disable`);
      setQrCodeUrl("");
      onAppContextChanged({ toLogout: true });
    } catch (error) {
      toast.error("Error disabling MFA");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.up_profile_columndiv}>
      <MfaHeader classes={classes} appContext={appContext} />

      <div>
        <button
          disabled={loading}
          onClick={appContext?.user?.isMfaEnabled ? disable2FA : enable2FA}
          className={classes.up_mfa_header_button + " " + (
            appContext?.user?.isMfaEnabled ? classes.up_mfa_header_button_red : classes.up_mfa_header_button_blue
          )}
          type="text"
        >
          {loading ? <span>Loading...</span> :
            ( appContext?.user?.isMfaEnabled ? "Disable" : "Enable" ) + " Two Factor Authentication"
          }
        </button>
      </div>

      {mfaUnderConfiguration && (
        <MfaChallenge
          classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} qrCodeUrl={qrCodeUrl}
        />
      )}
    </div>
  );
};