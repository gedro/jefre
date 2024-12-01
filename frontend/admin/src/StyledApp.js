import React, { Suspense, lazy } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route } from 'react-router-dom';
import { FaUser, FaTachometerAlt } from "react-icons/fa";

import UserList from './components/UserList';
// import UserDetails from './components/UserDetails';

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
  }
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
            {/*<UserDetails classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />*/}
          </Route>
          <Route exact path="/admin/dashboard">
            <DashboardLazy />
          </Route>
        </Switch>
      </MenuSidebar>
    </Suspense>
  );
};
