import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {Switch, Route, Redirect} from 'react-router-dom';
import { FaEdit, FaSearch, FaBookmark, FaStar } from "react-icons/fa";

import MenuSidebar from 'components/MenuSidebar';

import CandidateDetails from "./components/CandidateDetails";
import Search from "./components/Search";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import SavedSearchList from "./components/SavedSearchList";
import SavedSearchDetails from "./components/SavedSearchDetails";

const items = [
  {
    label: 'Candidate details',
    link: '/candidate/details',
    icon: <FaEdit />
  },
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
  ca_details_h1: {
    color: 'rgb(30 41 59)',
    fontSize: '1.5rem',
    lineHeight: '2rem',
    fontWeight: '700',
    paddingBottom: '0rem',
    margin: '0',
  },
  ca_details_hr: {
    border: 'none',
    borderTop: '1px solid #ccc',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  ca_details_flex: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  ca_details_form_line: {
    display: "flex",
    width: "100%",
    justifyContent: "start",
    alignItems: "center",
    marginTop: "0.5em",
    marginBottom: "0.5em",
  },
  ca_details_form_label: {
    marginRight: "1em",
  },
  ca_details_form_select: {
    minWidth: "45em",
  },
  ca_details_desc_div: {
    height: '18rem',
    marginBottom: '3.5rem',
  },
  ca_search_jobs_container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ca_search_job_card: {
    width: '100%',
    maxWidth: '17rem',
    // backgroundColor: 'rgb(255 255 255)',
    backgroundColor: '#F5FFFA',
    // Lavender: #E6E6FA
    // Light Pink: #FFB6C1
    // Pale Turquoise: #AFEEEE
    // Mint Cream: #F5FFFA
    // Misty Rose: #FFE4E1
    boxShadow: '0 10px 15px -3px #d1d5db, 0 4px 6px -4px #d1d5db',
    borderRadius: '0.5rem',
    padding: '0.8rem',
    margin: '1rem',
    display: 'block',
    unicodeBidi: 'isolate',
  },
  ca_search_hr: {
    border: 'none',
    borderTop: '1px solid #ccc',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  ca_search_jobs_dotted_container: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center"
  },
  ca_search_jobs_dotted: {
    border: '1px dotted #000',
    borderRadius: '0.5rem',
    padding: '0.38rem',
    marginBottom: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontSize: '0.75rem',
  },
  ca_search_flex: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  ca_search_jobs_link: {
    textDecoration: 'none',
  },
  ca_search_jobs_button: {
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
}));

export default function StyledApp({ appContext, onAppContextChanged, history }) {
  const classes = useStyles();
  return (
    <MenuSidebar name={"CANDIDATE"} items={items} >
      <Switch>
        <Route exact path="/candidate/details">
          <CandidateDetails classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Route>
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
