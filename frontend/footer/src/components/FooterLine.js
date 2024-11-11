import React from "react";
import { Link } from "react-router-dom";
import {FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter} from "react-icons/fa";

export default function FooterLine({ classes }) {
  return (
    <footer className={classes.fo_footer}>
      <div className={classes.fo_footerDiv}>
        <ul className={classes.fo_ul}>
          <li className={classes.fo_li}>
            <Link to="/about" className={classes.fo_link} >
              <span className="hover:underline">About Us</span>
            </Link>
          </li>
          <li className={classes.fo_li}>
            <Link to="/contact" className={classes.fo_link} >
              <span className="hover:underline">Contact</span>
            </Link>
          </li>
          <li className={classes.fo_li}>
            <Link to="/terms" className={classes.fo_link} >
              <span className="hover:underline">Terms of Service</span>
            </Link>
          </li>
          <li className={classes.fo_li}>
            <Link to="/policy" className={classes.fo_link} >
              <span className="hover:underline">Privacy Policy</span>
            </Link>
          </li>
        </ul>

        <p className={classes.fo_copyright}>
          <span className={classes.fo_copyrightSpan}>
            Copyright&nbsp;&copy;&nbsp;JEFREE&nbsp;{new Date().getFullYear()}<br />All rights reserved.
          </span>
        </p>

        <div className={classes.fo_socialButtons}>
          <Link className={classes.fo_socialButtonLink} to="/" >
            <FaFacebookF width={20} height={20} className={classes.fo_socialButton} />
          </Link>{" "}
          <Link className={classes.fo_socialButtonLink} to="/" >
            <FaLinkedinIn width={20} height={20} className={classes.fo_socialButton} />
          </Link>{" "}
          <Link className={classes.fo_socialButtonLink} to="/" >
            <FaTwitter width={20} height={20} className={classes.fo_socialButton} />
          </Link>{" "}
          <Link className={classes.fo_socialButtonLink} to="/" >
            <FaInstagram width={20} height={20} className={classes.fo_socialButton} />
          </Link>
        </div>
      </div>
    </footer>
  );
};