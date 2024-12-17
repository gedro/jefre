import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {Switch, Route, Redirect} from 'react-router-dom';
import { FaPlus, FaBriefcase, FaStar } from "react-icons/fa";

import MenuSidebar from 'components/MenuSidebar';

import NewJob from './components/NewJob';
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import CandidateList from "./components/CandidateList";
import CandidateDetails from "./components/CandidateDetails";

const items = [
  {
    label: 'Post New Job',
    link: '/recruiter/newjob',
    icon: <FaPlus />
  },
  {
    label: 'Jobs',
    link: '/recruiter/jobs',
    icon: <FaBriefcase />
  },
  {
    label: 'Saved Candidates',
    link: '/recruiter/candidates',
    icon: <FaStar />
  }
];

const useStyles = makeStyles((theme) => ({
  re_recruiter: {
    width: '100%',
    minWidth: '976px',
    maxWidth: '65rem',
    backgroundColor: 'rgb(255 255 255)',
    boxShadow: '0 10px 15px -3px #d1d5db, 0 4px 6px -4px #d1d5db',
    borderRadius: '0.5rem',
    padding: '2rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '1em',
    marginBottom: '2em',
    display: 'block',
    unicodeBidi: 'isolate',
  },
  re_new_job_h1: {
    color: 'rgb(30 41 59)',
    fontSize: '1.5rem',
    lineHeight: '2rem',
    fontWeight: '700',
    paddingBottom: '0rem',
    margin: '0',
  },
  re_new_job_hr: {
    border: 'none',
    borderTop: '1px solid #ccc',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  re_new_job_flex: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  re_new_job_form_line: {
    display: "flex",
    width: "100%",
    justifyContent: "start",
    alignItems: "center",
    marginTop: "0.5em",
    marginBottom: "0.5em",
  },
  re_new_job_form_labeled_input: {
    display: "flex",
    width: "100%",
    justifyContent: "start",
    alignItems: "center",
    flex: "2"
  },
  re_new_job_form_label: {
    marginRight: "1em",
  },
  re_new_job_form_select: {
    minWidth: "15em",
  },
  re_new_job_desc_div: {
    height: '18rem',
    marginBottom: '3.5rem',
  },
  re_recruiter_jobs_container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  re_recruiter_job_card: {
    width: '100%',
    maxWidth: '17rem',
    // backgroundColor: 'rgb(255 255 255)',
    backgroundColor: '#E6E6FA',
    // Lavender: #E6E6FA
    // Light Pink: #FFB6C1
    // Pale Turquoise: #AFEEEE
    // Mint Cream: #F5FFFA
    // Misty Rose: #FFE4E1
    boxShadow: '0 10px 15px -3px #d1d5db, 0 4px 6px -4px #d1d5db',
    borderRadius: '0.5rem',
    padding: '1rem',
    margin: '1rem',
    display: 'block',
    unicodeBidi: 'isolate',
  },
  re_recruiter_jobs_link: {
    textDecoration: 'none',
  },
  re_recruiter_jobs_button: {
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    padding: '0.5rem',
    cursor: 'pointer',
    width: '100%',
    marginTop: '1rem',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  re_recruiter_jobs_dotted: {
    border: '1px dotted #000',
    borderRadius: '0.5rem',
    padding: '0.35rem',
    marginBottom: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }
}));

export default function StyledApp({ appContext, onAppContextChanged, history }) {
  const classes = useStyles();
  return (
    <MenuSidebar name={"RECRUITER"} items={items} >
      <Switch>
        <Route exact path="/recruiter/newjob">
          <NewJob classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Route>
        <Route exact path="/recruiter/jobs">
          <JobList classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Route>
        <Route path="/recruiter/jobs/:jobId/candidates">
          <CandidateList classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Route>
        <Route path="/recruiter/jobs/:jobId">
          <JobDetails classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Route>
        <Route exact path="/recruiter/candidates">
          <CandidateList classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Route>
        <Route path="/recruiter/candidates/:candidateId">
          <CandidateDetails classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Route>
        <Route exact path="/recruiter">
          <Redirect to="/recruiter/jobs" />
        </Route>
      </Switch>
    </MenuSidebar>
  );
};
