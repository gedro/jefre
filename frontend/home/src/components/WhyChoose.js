import React from "react";
import { FaPuzzlePiece, FaSmile, FaLanguage } from "react-icons/fa";

import InfoTile from "./InfoTile";

export default function WhyChoose({classes}) {
  return (
    <div className={classes.parts}>
      <h1 className={classes.h1}>Why Choose JEFREE?</h1>
      <div className={classes.tiles}>
        <InfoTile
          classes={classes}
          title="Standardized Matching"
          text="We use the European Skills, Competences, Qualifications, and Occupations (ESCO) framework to ensure accurate and reliable matches between jobs and candidates."
          icon={FaPuzzlePiece}
        />{" "}
        <InfoTile
          classes={classes}
          title="User-Friendly Interface"
          text="Navigate our platform with ease, whether you're posting a job or applying for one."
          icon={FaSmile}
        />{" "}
        <InfoTile
          classes={classes}
          title="Multilingual Support"
          text="Our services are available in multiple languages, making it easy for users across different regions to connect."
          icon={FaLanguage}
        />{" "}
      </div>
    </div>
  );
};