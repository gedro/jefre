import React from "react";
import { FaUsers, FaClipboardCheck, FaHandshake } from "react-icons/fa";

import InfoTile from "./InfoTile";

export default function ForEmployers({classes}) {
  return (
    <div className={classes.parts}>
      <h1 className={classes.h1}>For Employers</h1>
      <div className={classes.tiles}>
        <InfoTile
          classes={classes}
          title="Find the Right Talent"
          text="Access a diverse pool of candidates with verified skills and competencies."
          icon={FaUsers}
        />{" "}
        <InfoTile
          classes={classes}
          title="Efficient Recruitment"
          text="Save time and resources with our precise candidate matching based on ESCO standards."
          icon={FaClipboardCheck}
        />{" "}
        <InfoTile
          classes={classes}
          title="Cost-Free Hiring"
          text="Post job vacancies and connect with potential employees at no charge."
          icon={FaHandshake}
        />{" "}
      </div>
    </div>
  );
};