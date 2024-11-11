import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Divider from "@mui/material/Divider";

export default function SocialButtons({ classes }) {

  return (
    <Fragment>
      <div className={classes.au_socialButtonsDiv}>
            <Link
              // to={`${apiUrl}/api/public/auth/oauth2/authorization/google`}
              to="/"
              className={classes.au_socialButtonLink}
            >
              <span className={classes.au_socialButtonLogoSpan}>
                <FcGoogle className={classes.au_socialButtonLogo} />
              </span>
              <span className={classes.au_socialButtonText}>
                Login with Google
              </span>
            </Link>
            <Link
              // to={`${apiUrl}/api/public/auth/oauth2/authorization/github`}
              to="/"
              className={classes.au_socialButtonLink}
            >
              <span className={classes.au_socialButtonLogoSpan}>
                <FaGithub className={classes.au_socialButtonLogo} />
              </span>
              <span className={classes.au_socialButtonText}>
                Login with Github
              </span>
            </Link>
          </div>

      <Divider className={classes.au_socialDivider}>OR</Divider>
    </Fragment>
  );
}
