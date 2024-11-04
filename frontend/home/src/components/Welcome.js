import React from "react";

export default function Welcome({classes}) {
  return (
    <div className={classes.parts}>
      <h1 className={classes.h1}>Welcome to JEFREE</h1>
      <h2 className={classes.h2}>Find Employees/Jobs Easy and Free</h2>
      <h3 className={classes.h3}>Unlock Your Potential in the Job Market</h3>
      <div className={classes.centerDiv}>
        <p className={classes.p}>
          At JEFREE, we revolutionize the way job seekers and employers connect. Our platform is designed to make finding
          the right job or candidate effortless, efficient, and free. Whether you're searching for your dream job or the
          perfect employee, JEFREE is your go-to solution.
        </p>
      </div>
    </div>
  );
};