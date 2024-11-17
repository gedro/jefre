import React, { Fragment } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Divider from "@mui/material/Divider";

export default function SocialButtons({ classes, appContext, onAppContextChanged }) {

  const ouathBaseUrl = `${appContext.apiUrl}/api/public/auth/oauth2/authorization`;
  const googleLink = `${ouathBaseUrl}/google`;
  const githubLink = `${ouathBaseUrl}/github`;

  return (
    <Fragment>
      <div className={classes.au_socialButtonsDiv}>
        <a href={googleLink} rel='noopener noreferrer' className={classes.au_socialButtonLink}>
          <span className={classes.au_socialButtonLogoSpan}>
            <FcGoogle className={classes.au_socialButtonLogo}/>
          </span>
          <span className={classes.au_socialButtonText}>
            Login with Google
          </span>
        </a>
        <a href={githubLink} rel='noopener noreferrer' className={classes.au_socialButtonLink}>
          <span className={classes.au_socialButtonLogoSpan}>
            <FaGithub className={classes.au_socialButtonLogo}/>
          </span>
          <span className={classes.au_socialButtonText}>
            Login with Github
          </span>
        </a>
      </div>

      <Divider className={classes.au_socialDivider}>OR</Divider>
    </Fragment>
  );
}
