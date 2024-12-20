import React, { Fragment, useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import toast from "react-hot-toast";

import workTypes from /*webpackIgnore: true*/ '../../../utils/workTypes';
import jobTypes from /*webpackIgnore: true*/ '../../../utils/jobTypes';
import experienceLevels from /*webpackIgnore: true*/ '../../../utils/experienceLevels';

import Loader from 'components/Loader';

export default function CandidateList({ classes, appContext, onAppContextChanged, history }) {
  const { jobId } = useParams();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState("");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates().catch((err) => {
      toast.error("Error fetching " + (jobId ? "suggested" : "favorite") + " candidates", err);
    });
    if(jobId) {
      fetchJob(jobId).catch((err) => {
        toast.error("Error fetching job title", err);
      });
    }
  }, [jobId]);

  const fetchCandidates = async () => {
    try {
      setLoading(true);

      const apiPath = jobId ? `/jobs/${jobId}/candidates` : "/recruiter/favorite-candidates";
      const response = await appContext.api.get(apiPath);
      const candidatesData = Array.isArray(response.data) ? response.data : [];

      setCandidates(candidatesData);
    } finally {
      setLoading(false);
    }
  };

  const fetchJob = async (jobId) => {
    try {
      setLoading(true);
      const response = await appContext.api.get(`/jobs/${jobId}`);
      setJob(response?.data);
    } finally {
      setLoading(false);
    }
  };

  const transformEnum = (enums, value) => {
    return enums.find((item) => item.value === value)?.label;
  };

  const getTags = (job, candidate) => {
    if(!job || !candidate) return [];

    const tags = [];
    candidate?.workTypes?.forEach((workType) => {
      if(job?.workType === workType) tags.push(transformEnum(workTypes, workType));
    });
    candidate?.jobTypes?.forEach((jobType) => {
      if(job?.jobType === jobType) tags.push(transformEnum(jobTypes, jobType));
    });
    candidate?.experienceLevels?.forEach((experienceLevel) => {
      if(job?.experienceLevel === experienceLevel) tags.push(transformEnum(experienceLevels, experienceLevel));
    });

    return tags;
  };

  return (
    <Fragment>
      {loading ? ( <Loader /> ) : (
        <div className={classes.re_recruiter}>
          <h1>{jobId ? "Suggested Candidates" : "Favorite Candidates"}</h1>
          {jobId && job?.title && (<h2>({job?.title})</h2>)}
          <div className={classes.re_recruiter_candidates_container}>
            {candidates.map((candidate) => (
              <div key={candidate.id} className={classes.re_recruiter_candidates_card}>
                {candidate?.displayName && <h2>
                  {candidate?.displayName}
                  <hr className={classes.re_new_job_hr}/>
                </h2>}
                <div className={classes.re_recruiter_jobs_dotted_container}>
                  {getTags(job, candidate).map((tag) => (
                    <div key={tag} className={classes.re_recruiter_jobs_dotted}>{tag}</div>
                  ))}
                </div>
                <p><strong>Match: </strong>{Math.floor(Math.random() * 100)}%</p>
                <div className={classes.re_recruiter_candidates_button_div}>
                  <Link to={`/recruiter/candidates/${candidate.id}`} className={classes.re_recruiter_jobs_link}>
                    <button className={classes.re_recruiter_candidates_button} style={{ backgroundColor: "rgb(1 114 244)" }}>
                      View Profile
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