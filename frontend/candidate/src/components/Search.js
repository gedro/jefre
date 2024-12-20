import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import workTypes from /*webpackIgnore: true*/ '../../../utils/workTypes';
import jobTypes from /*webpackIgnore: true*/ '../../../utils/jobTypes';
import experienceLevels from /*webpackIgnore: true*/ '../../../utils/experienceLevels';

import Loader from 'components/Loader';

export default function Search({ classes, appContext, onAppContextChanged, history }) {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs().catch((err) => { toast.error("Error fetching jobs", err); });
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await appContext.api.get("/candidate/jobs");
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
        <div className={classes.ca_candidate}>
          <h1>Posted Jobs</h1>
          <div className={classes.ca_search_jobs_container}>
            {jobs.map((job) => (
              <div key={job.id} className={classes.ca_search_job_card}>
                {job.title && <h2>
                  {job.title}
                  <hr className={classes.ca_search_hr}/>
                </h2>}
                <div className={classes.ca_search_jobs_dotted_container}>
                  {job.workType && <div className={classes.ca_search_jobs_dotted}>{transformEnum(workTypes, job.workType)}</div>}
                  {job.jobType && <div className={classes.ca_search_jobs_dotted}>{transformEnum(jobTypes, job.jobType)}</div>}
                  {job.experienceLevel && <div className={classes.ca_search_jobs_dotted}>{transformEnum(experienceLevels, job.experienceLevel)}</div>}
                </div>
                {job.vacancyEndDate && <p><u>Ends</u>: {job.vacancyEndDate}</p>}
                {job.country && <p>{job.country}{job.city && `, ${job.city}`}</p>}
                <div className={classes.ca_search_flex}>
                  <Link to={`/candidate/jobs/${job.id}`} className={classes.ca_search_jobs_link}>
                    <button className={classes.ca_search_jobs_button} style={{ backgroundColor: "rgb(1 114 244)" }}>
                      View
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