import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {Switch, Route, Redirect} from 'react-router-dom';
import { FaPlus, FaBriefcase, FaSearch, FaStar } from "react-icons/fa";

import MenuSidebar from 'components/MenuSidebar';

import NewJob from './components/NewJob';
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import Search from "./components/Search";
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
  // {
  //   label: 'Search Candidates',
  //   link: '/recruiter/search',
  //   icon: <FaSearch />
  // },
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
        <Route path="/recruiter/jobs/:jobId">
          <JobDetails classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Route>
        <Route exact path="/recruiter/search">
          <Search classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Route>
        <Route exact path="/recruiter/candidates">
          <CandidateList classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Route>
        <Route path="/recruiter/candidates/:candidateId">
          <CandidateDetails classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Route>
        <Route exact path="/recruiter">
          <Redirect to="/recruiter/search" />
        </Route>
      </Switch>
    </MenuSidebar>
  );
};
