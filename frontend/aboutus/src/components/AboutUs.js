import React from "react";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter} from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    a: {
      textDecoration: 'none',
    },
    p: {
      marginBottom: '1rem',
      margin: '0px',
      display: 'block',
      marginBlockStart: '1em',
      marginBlockEnd: '1em',
      marginInlineStart: '0px',
      marginInlineEnd: '0px',
      unicodeBidi: 'isolate',
    }
  },
  aboutus: {
    width: '100%',
    minWidth: '768px',
    padding: '2rem',
    minHeight: '100vh',
    display: 'block',
    unicodeBidi: 'isolate',
    twBgOpacity: 1,
    backgroundColor: 'rgb(255 255 255)',
    borderRadius: '0.5rem',
    maxWidth: '28rem',
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  h1: {
    fontSize: '2.25rem',
    lineHeight: '2.5rem',
    marginBottom: '1rem',
    display: 'block',
    marginBlockStart: '0.67em',
    marginBlockEnd: '0.67em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    fontWeight: 'bold',
    unicodeBidi: 'isolate',
  },
  socialButtons: {
    display: 'flex',
    marginTop: '2.5rem',
    unicodeBidi: 'isolate',
  },
  socialButton: {
    twTextOpacity: 1,
    color: 'white',
    padding: '0.5rem',
    backgroundColor: 'rgba(172, 30, 35, 1)',
    borderRadius: '9999px',
    cursor: 'pointer',
    display: 'block',
    verticalAlign: 'middle',
    marginLeft: '1rem',
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: 'white',
  }
}));

export default function AboutUs() {
  const classes = useStyles();

  return (
    <div className={classes.aboutus}>
      <h1 className={classes.h1}>About Us</h1>
      <p>
        Welcome to <strong>JEFREE - Find Employees/Jobs Easy and Free</strong>,
        where we simplify the job market by matching job vacancies with candidates
        based on national standards for skills and occupations, such as ESCO.
      </p>

      <h2 className={classes.h2}>Our Story</h2>
      <p>
        JEFREE was founded with a clear mission: to bridge the gap between job seekers and employers by leveraging the
        power of standardized skill and occupation classifications. Recognizing the complexities and inefficiencies in
        the traditional job market, we set out to create a platform that streamlines the process of finding the right
        job or candidate, making it accessible and free for everyone.
      </p>

      <h2 className={classes.h2}>Who We Serve</h2>
      <p>
        Our platform is designed for both job seekers and employers.
        For job seekers, JEFREE offers a user-friendly interface to explore opportunities
        that best match their skills and qualifications.
        Employers benefit from our precise matching system, which ensures they find candidates
        who meet their specific needs.
        By aligning with ESCO standards, we provide a comprehensive database that supports effective
        recruitment and career development across various industries.
      </p>

      <h2 className={classes.h2}>How We Operate</h2>
      <p>
        At JEFREE, we utilize the European Skills, Competences, Qualifications, and Occupations (ESCO) framework
        to classify and match jobs and skills. This approach allows us to offer a multilingual platform that caters
        to diverse markets, ensuring that both local and international users can navigate our services with ease.
        Our commitment to transparency and efficiency helps us stand out as a reliable resource in the employment sector.
      </p>

      <h2 className={classes.h2}>Our Mission</h2>
      <p>
        Our mission is to make the job search process as seamless as possible while promoting
        fair access to employment opportunities.
        By using standardized classifications, we aim to enhance communication between the worlds of work and education,
        ultimately contributing to a more integrated labor market.
      </p>

      <h2 className={classes.h2}>Join Us</h2>
      <p>
        Whether you're looking for your next career move or seeking the perfect candidate for your team,
        JEFREE is here to help.
        Explore our platform today and discover how easy it can be to find the right match in the job market.
      </p>

      <div className={classes.socialButtons}>
        <Link className={classes.socialButton} to="/">
          <FaFacebookF size={24}/>
        </Link>
        <Link className={classes.socialButton} to="/">
          <FaTwitter size={24}/>
        </Link>
        <Link className={classes.socialButton} to="/">
          <FaLinkedinIn size={24}/>
        </Link>
        <Link className={classes.socialButton} to="/">
          <FaInstagram size={24}/>
        </Link>
      </div>
    </div>
  );
};