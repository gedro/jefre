import React from "react";

export default function Welcome({ classes }) {
  return (
    <div className={classes.ho_parts}>
      <h1 className={classes.ho_h1}>Welcome to JEFREE</h1>
      <h2 className={classes.ho_h2}>Find Employees/Jobs Easy and Free</h2>
      <h3 className={classes.ho_h3}>Unlock Your Potential in the Job Market</h3>
      <div className={classes.ho_centerDiv}>
        <p className={classes.ho_p}>
          At JEFREE, we revolutionize the way job seekers and employers connect. Our platform is designed to make finding
          the right job or candidate effortless, efficient, and free. Whether you're searching for your dream job or the
          perfect employee, JEFREE is your go-to solution.
        </p>
      </div>
    </div>
  );
};