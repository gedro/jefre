import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {Switch, Route, Redirect} from 'react-router-dom';
import { FaSearch, FaClipboardList, FaBookmark, FaStar } from "react-icons/fa";

import MenuSidebar from 'components/MenuSidebar';

import Search from "./components/Search";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import SavedSearchList from "./components/SavedSearchList";
import SavedSearchDetails from "./components/SavedSearchDetails";

const items = [
  {
    label: 'Search Job',
    link: '/candidate/search',
    icon: <FaSearch />
  },
  {
    label: 'Saved Jobs',
    link: '/candidate/jobs',
    icon: <FaBookmark />
  },
  {
    label: 'Saved Searches',
    link: '/candidate/searches',
    icon: <FaStar />
  }
];

const useStyles = makeStyles((theme) => ({
  ca_candidate: {
  }
}));

export default function StyledApp({ appContext, onAppContextChanged, history }) {
  const classes = useStyles();
  return (
    <MenuSidebar name={"CANDIDATE"} items={items} >
      <Switch>
        <Route exact path="/candidate/search">
          <Search classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Route>
        <Route exact path="/candidate/jobs">
          <JobList classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Route>
        <Route path="/candidate/jobs/:jobId">
          <JobDetails classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Route>
        <Route exact path="/candidate/searches">
          <SavedSearchList classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Route>
        <Route path="/candidate/searches/:searchId">
          <SavedSearchDetails classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Route>
        <Route exact path="/candidate">
          <Redirect to="/candidate/search" />
        </Route>
      </Switch>
    </MenuSidebar>
  );
};
