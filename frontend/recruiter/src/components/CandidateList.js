import React, { Fragment, useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import toast from "react-hot-toast";

import Loader from 'components/Loader';

export default function CandidateList({ classes, appContext, onAppContextChanged, history }) {
  const { jobId } = useParams();
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates().catch((err) => {
      toast.error("Error fetching " + (jobId ? "suggested" : "favorite") + " candidates", err);
    });
    if(jobId) {
      fetchJobTitle(jobId).catch((err) => {
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

  const fetchJobTitle = async (jobId) => {
    try {
      setLoading(true);
      const response = await appContext.api.get(`/jobs/${jobId}`);
      setJobTitle(response?.data?.title);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {loading ? ( <Loader /> ) : (
        <div className={classes.re_recruiter}>
          <h1>{jobId ? "Suggested Candidates" : "Favorite Candidates"}</h1>
          {jobId && jobTitle && (<h2>({jobTitle})</h2>)}
          <div className={classes.re_recruiter_candidates_container}>
            {candidates.map((candidate) => (
              <div key={candidate.id} className={classes.re_recruiter_candidates_card}>
                {candidate?.displayName && <h2>
                  {candidate?.displayName}
                  <hr className={classes.re_new_job_hr}/>
                </h2>}
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