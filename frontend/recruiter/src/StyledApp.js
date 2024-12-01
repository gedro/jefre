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
  {
    label: 'Search Candidates',
    link: '/recruiter/search',
    icon: <FaSearch />
  },
  {
    label: 'Saved Candidates',
    link: '/recruiter/candidates',
    icon: <FaStar />
  }
];

const useStyles = makeStyles((theme) => ({
  re_recruiter: {
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
