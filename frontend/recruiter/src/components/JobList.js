import React, { Fragment, useState, useEffect } from "react";
import toast from "react-hot-toast";

import Loader from 'components/Loader';

import workTypes from /*webpackIgnore: true*/ '../../../utils/workTypes';
import jobTypes from /*webpackIgnore: true*/ '../../../utils/jobTypes';
import experienceLevels from /*webpackIgnore: true*/ '../../../utils/experienceLevels';
import {Link} from "react-router-dom";

export default function JobList({ classes, appContext, onAppContextChanged, history }) {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs().catch((err) => { toast.error("Error fetching jobs", err); });
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await appContext.api.get("/jobs");
      const jobsData = Array.isArray(response.data) ? response.data : [];
      setJobs(jobsData);
    } finally {
      setLoading(false);
    }
  };

  const transformEnum = (enums, value) => {
    return enums.find((item) => item.value === value)?.label;
  };

  return (
    <Fragment>
      {loading ? ( <Loader /> ) : (
        <div className={classes.re_recruiter}>
          <h1>Posted Jobs</h1>
          <div className={classes.re_recruiter_jobs_container}>
            {jobs.map((job) => (
              <div key={job.id} className={classes.re_recruiter_job_card}>
                {job.title && <h2>
                  {job.title}
                  <hr className={classes.re_new_job_hr}/>
                </h2>}
                <div className={classes.re_recruiter_jobs_dotted_container}>
                  {job.workType && <div className={classes.re_recruiter_jobs_dotted}>{transformEnum(workTypes, job.workType)}</div>}
                  {job.jobType && <div className={classes.re_recruiter_jobs_dotted}>{transformEnum(jobTypes, job.jobType)}</div>}
                  {job.experienceLevel && <div className={classes.re_recruiter_jobs_dotted}>{transformEnum(experienceLevels, job.experienceLevel)}</div>}
                </div>
                {job.vacancyEndDate && <p><u>Ends</u>: {job.vacancyEndDate}</p>}
                {job.country && <p>{job.country}{job.city && `, ${job.city}`}</p>}
                <div className={classes.re_new_job_flex}>
                  <Link to={`/recruiter/jobs/${job.id}`} className={classes.re_recruiter_jobs_link}>
                    <button className={classes.re_recruiter_jobs_button} style={{ backgroundColor: "#f50057" }}>
                      Edit
                    </button>
                  </Link>
                  <Link to={`/recruiter/jobs/${job.id}/candidates`} className={classes.re_recruiter_jobs_link}>
                    <button className={classes.re_recruiter_jobs_button} style={{ backgroundColor: "rgb(1 114 244)" }}>
                      Suggested Candidates
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
}