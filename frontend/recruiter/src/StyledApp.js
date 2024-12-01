import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {Switch, Route, Redirect} from 'react-router-dom';
import { FaPlus, FaBriefcase, FaSearch, FaStar } from "react-icons/fa";

import MenuSidebar from 'components/MenuSidebar';

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
        </Route>
        <Route exact path="/recruiter/jobs">
        </Route>
        <Route path="/recruiter/jobs/:jobId">
        </Route>
        <Route exact path="/recruiter/search">
        </Route>
        <Route exact path="/recruiter/candidates">
        </Route>
        <Route path="/recruiter/candidates/:candidateId">
        </Route>
        <Route exact path="/recruiter">
          <Redirect to="/recruiter/search" />
        </Route>
      </Switch>
    </MenuSidebar>
  );
};
