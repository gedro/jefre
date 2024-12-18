import React, { Suspense, lazy } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {Switch, Route, Redirect} from 'react-router-dom';
import { FaUser, FaTachometerAlt } from "react-icons/fa";

import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import JobDetails from './components/JobDetails';

import Loader from 'components/Loader';
import MenuSidebar from 'components/MenuSidebar';

const DashboardLazy = lazy(() => import('./components/mfe/connector/DashboardApp'));

const items = [
  {
    label: 'All Users',
    link: '/admin/users',
    icon: <FaUser />
  },
  {
    label: 'Dashboard',
    link: '/admin/dashboard',
    icon: <FaTachometerAlt />
  }
];

const useStyles = makeStyles((theme) => ({
  ad_userlist: {
    padding: '1rem',
    display: 'block',
    unicodeBidi: 'isolate',
  },
  ad_list_title: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
    display: 'block',
    unicodeBidi: 'isolate',
  },
  ad_list_title_h1: {
    textAlign: 'center',
    fontSize: '1.5rem',
    lineHeight: '2rem',
    fontWeight: '700',
    color: 'rgb(30 41 59)',
    textTransform: 'uppercase',
    margin: '0',
  },
  ad_list: {
    overflowX: 'auto',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    unicodeBidi: 'isolate',
  },
  ad_list_table: {
    width: 'fit-content',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ad_table_header: {
    height: '56px',
    borderColor: 'rgba(224, 224, 224, 1)',
    cursor: 'pointer',
    color: 'rgb(0 0 0)',
    fontWeight: '600',
    borderWidth: '1px',
  },
  ad_table_header_last: {
    borderRightWidth: '0px',
  },
  ad_table_cell: {
    color: 'rgb(51 65 85)',
    fontWeight: '400',
    borderWidth: '1px',
  },
  ad_table_cell_last: {
    borderRightWidth: '0px',
  },
  ad_table_cell_div: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '0.25rem',
  },
  ad_table_cell_icon: {
    color: 'rgb(51 65 85)',
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
  },
  ad_table_cell_link: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    textDecoration: 'none',
  },
  ad_table_cell_button: {
    cursor: 'pointer',
    backgroundColor: 'rgb(1 114 244)',
    color: 'rgb(255 255 255)',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '2.25rem',
    borderRadius: '0.375rem',
  },
  ad_userdetails: {
    paddingLeft: '3rem',
    paddingRight: '3rem',
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem',
  },
  ad_details_header: {
    width: '68%',
    marginLeft: 'auto',
    marginRight: 'auto',
    boxShadow: '0 10px 15px -3px #d1d5db, 0 4px 6px -4px #d1d5db',
    padding: '2rem',
    borderRadius: '0.375rem',
    backgroundColor: 'white',
    marginBottom: '1em',
  },
  ad_details_header_h1: {
    color: 'rgb(30 41 59)',
    fontSize: '1.5rem',
    lineHeight: '2rem',
    fontWeight: '700',
    paddingBottom: '0rem',
  },
  ad_hr: {
    border: 'none',
    borderTop: '1px solid #ccc',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  ad_details: {
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: '1rem',
    lineHeight: '1.2rem',
    fontWeight: '600',
    paddingBottom: '0rem',
    margin: '0',
  },
  ad_details_roles: {
    paddingTop: '0rem',
    paddingBottom: '1rem',
    display: 'flex',
    flexDirection: 'row',
    // flexDirection: 'column',
    alignItems: 'center',
    // alignItems: 'flex-start',
    gap: '1rem',
  },
  ad_details_ms_div: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  ad_details_ms_label: {
    color: 'rgb(71 85 105)',
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    fontWeight: '600',
  },
  ad_details_ms: {
    minWidth: '400px',
  },
  ad_details_roles_button: {
    cursor: 'pointer',
    backgroundColor: 'rgb(1 114 244)',
    color: 'rgb(255 255 255)',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '2.25rem',
    borderRadius: '0.375rem',
  },
  ad_details_flags: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  ad_details_checkbox_div: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  ad_details_checkbox_label: {
    color: 'rgb(71 85 105)',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  ad_details_checkbox: {
    width: '1.25rem',
    height: '1.25rem',
  },
  ad_jobdetails: {
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
  ad_jobdetails_h1: {
    color: 'rgb(30 41 59)',
    fontSize: '1.5rem',
    lineHeight: '2rem',
    fontWeight: '700',
    paddingBottom: '0rem',
    margin: '0',
  },
  ad_jobdetails_hr: {
    border: 'none',
    borderTop: '1px solid #ccc',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  ad_jobdetails_h4: {
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: '1.5rem',
    lineHeight: '1.8rem',
    fontWeight: '600',
    paddingBottom: '0rem',
    margin: '0',
  },
  ad_jobdetails_form_line: {
    display: "flex",
    width: "100%",
    justifyContent: "start",
    alignItems: "center",
    marginTop: "0.5em",
    marginBottom: "0.5em",
  },
  ad_jobdetails_dotted_container: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "2.5em",
  },
  ad_jobdetails_dotted: {
    border: '3px dotted #000',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontSize: '1.5rem',
  },
  ad_jobdetails_concept_list: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  ad_jobdetails_concept_list_row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
    padding: "0.5em",
    borderBottom: "2px dashed #ccc",
    fontSize: '1.5rem',
  },
  ad_jobdetails_job_desc_div: {
    height: '18rem',
    marginBottom: '3.5rem',
  },
  ad_jobdetails_contact_list: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  ad_jobdetails_contact_list_row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    width: "100%",
    padding: "0.5em",
    borderBottom: "2px dashed #ccc",
    fontSize: '1.5rem',
  },
}));

export default function StyledApp({ appContext, onAppContextChanged, history }) {
  const classes = useStyles();
  return (
    <Suspense fallback={<Loader />}>
      <MenuSidebar name={"ADMIN"} items={items} >
        <Switch>
          <Route exact path="/admin/users">
            <UserList classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
          </Route>
          <Route path="/admin/users/:userId">
            <UserDetails classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
          </Route>
          <Route path="/admin/jobs/:jobId">
            <JobDetails classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
          </Route>
          <Route exact path="/admin/dashboard">
            <DashboardLazy appContext={appContext} />
          </Route>
          <Route exact path="/admin">
            <Redirect to="/admin/users" />
          </Route>
        </Switch>
      </MenuSidebar>
    </Suspense>
  );
};
