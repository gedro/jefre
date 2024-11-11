import React from "react";
import { Link } from "react-router-dom";
import {FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter} from "react-icons/fa";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*, ::before, ::after': {
      boxSizing: 'border-box',
      borderWidth: '0',
      borderStyle: 'solid',
      borderColor: '#e5e7eb',
    }
  },
  fo_footer: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    backgroundColor: 'rgb(36 37 48)',
    minHeight: '7rem',
    zIndex: '50',
    position: 'relative',
    display: 'block',
    unicodeBidi: 'isolate',
    lineHeight: 'inherit',
  },
  fo_footerDiv: {
    paddingLeft: '2.5rem',
    paddingRight: '2.5rem',
    gap: '0px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '7rem',
    display: 'flex',
    unicodeBidi: 'isolate',
    lineHeight: 'inherit',
  },
  fo_ul: {
    gap: '1.5rem',
    color: 'rgb(255 255 255)',
    alignItems: 'center',
    flexDirection: 'row',
    flex: '1 1',
    display: 'flex',
    listStyle: 'none',
    margin: '0',
    padding: '0',
    unicodeBidi: 'isolate',
    lineHeight: 'inherit',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    paddingInlineStart: '40px',
  },
  fo_copyright: {
    unicodeBidi: 'isolate',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    color: 'rgb(255 255 255)',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    alignItems: 'center',
    width: 'fit-content',
    display: 'flex',
    margin: '0',
    textAlign: 'center',
  },
  fo_copyrightSpan: {
    color: 'rgb(255 255 255)',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
  fo_socialButtons: {
    unicodeBidi: 'isolate',
    justifyContent: 'flex-end',
    gap: '1.5rem',
    alignItems: 'center',
    flexDirection: 'row',
    flex: '1 1',
    display: 'flex',
    lineHeight: 'inherit',
  },
  fo_socialButtonLink: {
    transitionDuration: '300ms',
    transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    color: 'rgb(255 255 255)',
    padding: '0.5rem',
    borderColor: 'rgb(255 255 255)',
    borderWidth: '1px',
    borderRadius: '9999px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '2.5rem',
    height: '2.5rem',
    display: 'flex',
    textDecoration: 'inherit',
    boxSizing: 'border-box',
    borderStyle: 'solid',
    cursor: 'pointer',
    lineHeight: 'inherit',
  },
  fo_socialButton: {
    display: 'block',
    verticalAlign: 'middle',
    transformOrigin: '0px 0px',
    color: 'rgb(255 255 255)',
    cursor: 'pointer',
    lineHeight: 'inherit',
    stroke: 'currentcolor',
    fill: 'currentcolor',
    strokeWidth: '0',
    width: '1em',
    height: '1em',
    overflowClipMargin: 'content-box',
    overflow: 'hidden',
  },
  fo_li: {
    unicodeBidi: 'isolate',
    color: 'rgb(255 255 255)',
    display: 'list-item',
    listStyle: 'none',
    margin: '0',
    padding: '0',
    lineHeight: 'inherit',
  },
  fo_link: {
    color: 'inherit',
    textDecoration: 'inherit',
    cursor: 'pointer',
    lineHeight: 'inherit',
  }
}));

export default function FooterLine() {
  const classes = useStyles();

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