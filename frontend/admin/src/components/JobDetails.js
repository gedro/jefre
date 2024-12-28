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

export default function JobDetails({ classes, appContext, onAppContextChanged, history }) {
  const { jobId } = useParams();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState(null);

  const fetchJobData = useCallback( async () => {
    try {
      setLoading(true);

      const response = await appContext.api.get(`/admin/jobs/${jobId}`);
      setJob(response?.data);
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchJobData().catch((err) => { toast.error("Error fetching job details", err); });
  }, [fetchJobData, jobId]);

  const transformEnum = (enums, value) => {
    return enums.find((item) => item.value === value)?.label;
  };

  return (
    <Fragment>
      {loading ? ( <Loader /> ) : (
        <Fragment>
          <div className={classes.ad_jobdetails}>
            <div>
              <h1 className={classes.ad_jobdetails_h1}>
                {job?.title || 'Missing title'}
                <hr className={classes.ad_jobdetails_hr}/>
              </h1>
              <h4 className={classes.ad_jobdetails_h4}>
                <span><u>End date:</u> {job?.vacancyEndDate || ' - '}</span>
                <span>{job?.country}{job?.city && ' - ' + job.city}</span>
              </h4>
            </div>
            <div className={classes.ad_jobdetails_form_line}>
              <div className={classes.ad_jobdetails_dotted_container}>
                <div className={classes.ad_jobdetails_dotted}>
                  {transformEnum(workTypes, job?.workType)}
                </div>
                <div className={classes.ad_jobdetails_dotted}>
                  {transformEnum(jobTypes, job?.jobType)}
                </div>
                <div className={classes.ad_jobdetails_dotted}>
                  {transformEnum(experienceLevels, job?.experienceLevel)}
                </div>
              </div>
            </div>
          </div>
          <div className={classes.ad_jobdetails}>
            <h1 className={classes.ad_jobdetails_h1}>Contact Information</h1>
            <hr className={classes.ad_jobdetails_hr}/>
            <div className={classes.ad_jobdetails_form_line}>
              <div className={classes.ad_jobdetails_contact_list}>
                {job?.companyName && (
                  <div className={classes.ad_jobdetails_contact_list_row}>
                    <span style={{paddingRight: "4em"}}><u>Company Name:</u></span>
                    <span>{job?.companyName}</span>
                  </div>
                )}
                {job?.contactPerson && (
                  <div className={classes.ad_jobdetails_contact_list_row}>
                    <span style={{paddingRight: "4em"}}><u>Contact Person:</u></span>
                    <span>{job?.contactPerson}</span>
                  </div>
                )}
                {job?.contactEmail && (
                  <div className={classes.ad_jobdetails_contact_list_row}>
                    <span style={{paddingRight: "4em"}}><u>Contact Email:</u></span>
                    <span>{job?.contactEmail}</span>
                  </div>
                )}
                {job?.contactPhone && (
                  <div className={classes.ad_jobdetails_contact_list_row}>
                    <span style={{paddingRight: "4em"}}><u>Contact Phone:</u></span>
                    <span>{job?.contactPhone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={classes.ad_jobdetails}>
            <h1 className={classes.ad_jobdetails_h1}>Occupations</h1>
            <hr className={classes.ad_jobdetails_hr}/>
            <div className={classes.ad_jobdetails_form_line}>
              <div className={classes.ad_jobdetails_concept_list}>
                {job?.occupations?.map((occupation) => (
                  <div key={occupation?.id} className={classes.ad_jobdetails_concept_list_row}>
                    <div style={{ paddingRight: "4em", display: 'flex' }}>
                      {occupation?.month && <MonthText months={occupation.month}/>}
                      {occupation?.maxMonth && occupation?.month != occupation.maxMonth && (
                        <Fragment>
                          <span>&nbsp;-&nbsp;</span>
                          <MonthText months={occupation.maxMonth} />
                        </Fragment>
                      )}
                    </div>
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
          <div className={classes.ad_jobdetails}>
            <h1 className={classes.ad_jobdetails_h1}>Skills</h1>
            <hr className={classes.ad_jobdetails_hr}/>
            <div className={classes.ad_jobdetails_form_line}>
              <div className={classes.ad_jobdetails_concept_list}>
                {job?.skills?.map((skill) => (
                  <div key={skill?.id} className={classes.ad_jobdetails_concept_list_row}>
                    <div style={{paddingRight: "4em", display: 'flex'}}>
                      {skill?.month && <MonthText months={skill.month}/>}
                      {skill?.maxMonth && skill?.month != skill.maxMonth && (
                        <Fragment>
                          <span>&nbsp;-&nbsp;</span>
                          <MonthText months={skill.maxMonth}/>
                        </Fragment>
                      )}
                    </div>
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
          <div className={classes.ad_jobdetails}>
            <h1 className={classes.ad_jobdetails_h1}>Job Description</h1>
            <hr className={classes.ad_jobdetails_hr}/>
            <div className={classes.ad_jobdetails_job_desc_div}>
              {job?.description && (
                <ReactQuill value={job.description} readOnly={true} theme={"bubble"}/>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}