import React from "react";
import { FaSearch, FaUserCheck, FaUnlock } from "react-icons/fa";

// 65rem
// 768px
import InfoTile from './InfoTile';

export default function ForJobSeekers({classes}) {
  return (
    <div className={classes.parts}>
      <h1 className={classes.h1}>For Job Seekers</h1>
      <div className={classes.tiles}>
        <InfoTile
          classes={classes}
          title="Discover Opportunities"
          text="Explore a wide range of job listings tailored to your skills and qualifications."
          icon={FaSearch}
        />{" "}
        <InfoTile
          classes={classes}
          title="Personalized Matches"
          text="Benefit from our advanced matching system that aligns your profile with the best-suited vacancies."
          icon={FaUserCheck}
        />{" "}
        <InfoTile
          classes={classes}
          title="Free and Easy Access"
          text="Enjoy a seamless job search experience without any costs."
          icon={FaUnlock}
        />{" "}
      </div>
    </div>
  );
};