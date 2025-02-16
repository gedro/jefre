import React, { Fragment, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaExternalLinkAlt } from "react-icons/fa";

import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";

import workTypes from /*webpackIgnore: true*/ '../../../utils/workTypes';
import jobTypes from /*webpackIgnore: true*/ '../../../utils/jobTypes';
import experienceLevels from /*webpackIgnore: true*/ '../../../utils/experienceLevels';

import Loader from 'components/Loader';
import MonthText from 'components/MonthText';

export default function CandidateDetails({ classes, appContext, onAppContextChanged, history }) {
  const { candidateId } = useParams();
  const [loading, setLoading] = useState(false);
  const [candidate, setCandidate] = useState(null);

  const fetchCandidateData = useCallback( async () => {
    try {
      setLoading(true);

      const response = await appContext.api.get(`/recruiter/candidates/${candidateId}`);
      setCandidate(response?.data);
    } finally {
      setLoading(false);
    }
  }, [candidateId]);

  useEffect(() => {
    fetchCandidateData().catch((err) => { toast.error("Error fetching candidate details", err); });
  }, [fetchCandidateData, candidateId]);

  const transformEnum = (enums, value) => {
    return enums.find((item) => item.value === value)?.label;
  };

  return (
    <Fragment>
      {loading ? ( <Loader /> ) : (
        <Fragment>
          <div className={classes.re_recruiter}>
            <div>
              <h1 className={classes.re_new_job_h1}>
                {candidate?.displayName}
                <hr className={classes.re_new_job_hr}/>
              </h1>
              <h4 className={classes.re_details_h4}>
                <span>{candidate?.contactEmail}</span>
                <span>{candidate?.contactPhone}</span>
              </h4>
            </div>
          </div>
          <div className={classes.re_recruiter}>
            <h1 className={classes.re_new_job_h1}>Available for</h1>
            <hr className={classes.re_new_job_hr}/>
            <div className={classes.re_new_job_form_line}>
              <div className={classes.re_recruiter_jobs_dotted_container}>
                {candidate?.workTypes?.map((workType) => (
                  <div key={workType} className={classes.re_details_dotted}>
                    {transformEnum(workTypes, workType)}
                  </div>
                ))}
                {candidate?.jobTypes?.map((jobType) => (
                  <div key={jobType} className={classes.re_details_dotted}>
                    {transformEnum(jobTypes, jobType)}
                  </div>
                ))}
                {candidate?.experienceLevels?.map((experienceLevel) => (
                  <div key={experienceLevel} className={classes.re_details_dotted}>
                    {transformEnum(experienceLevels, experienceLevel)}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={classes.re_recruiter}>
            <h1 className={classes.re_new_job_h1}>Occupations</h1>
            <hr className={classes.re_new_job_hr}/>
            <div className={classes.re_new_job_form_line}>
              <div className={classes.re_details_concept_list}>
                {candidate?.occupations?.map((occupation) => (
                  <div key={occupation?.id} className={classes.re_details_concept_list_row}>
                    <span style={{ paddingRight: "4em" }}>
                      {occupation?.month && <MonthText months={occupation.month}/>}
                    </span>
                    <span>
                      {occupation?.title}{" "}
                      <a style={{marginLeft: "0.5em"}} href={occupation?.url} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt/>
                      </a>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={classes.re_recruiter}>
            <h1 className={classes.re_new_job_h1}>Skills</h1>
            <hr className={classes.re_new_job_hr}/>
            <div className={classes.re_new_job_form_line}>
              <div className={classes.re_details_concept_list}>
                {candidate?.skills?.map((skill) => (
                  <div key={skill?.id} className={classes.re_details_concept_list_row}>
                    <span style={{paddingRight: "4em"}}>
                      {skill?.month && <MonthText months={skill.month}/>}
                    </span>
                    <span>
                      {skill?.title}{" "}
                      <a style={{marginLeft: "0.5em"}} href={skill?.url} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt/>
                      </a>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={classes.re_recruiter}>
            <h1 className={classes.re_new_job_h1}>Resume</h1>
            <hr className={classes.re_new_job_hr}/>
            <div className={classes.re_new_job_desc_div}>
              {candidate?.resume && (
                <ReactQuill value={candidate.resume} readOnly={true} theme={"bubble"}/>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}