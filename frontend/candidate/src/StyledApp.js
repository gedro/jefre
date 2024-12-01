import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {Switch, Route, Redirect} from 'react-router-dom';
import { FaSearch, FaClipboardList, FaBookmark, FaStar } from "react-icons/fa";

import MenuSidebar from 'components/MenuSidebar';

const items = [
  {
    label: 'Search Job',
    link: '/candidate/search',
    icon: <FaSearch />
  },
  {
    label: 'Applications',
    link: '/candidate/applications',
    icon: <FaClipboardList />
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
        </Route>
        <Route exact path="/candidate/applications">
        </Route>
        <Route exact path="/candidate/jobs">
        </Route>
        <Route path="/candidate/jobs/:jobId">
        </Route>
        <Route exact path="/candidate/searches">
        </Route>
        <Route path="/candidate/searches/:searchId">
        </Route>
        <Route exact path="/candidate">
          <Redirect to="/candidate/search" />
        </Route>
      </Switch>
    </MenuSidebar>
  );
};
