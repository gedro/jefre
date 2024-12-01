import React, { Suspense, lazy } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route } from 'react-router-dom';
import { FaUser, FaTachometerAlt } from "react-icons/fa";

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
  xx_yyy: {
  }
}));

export default function StyledApp({ appContext, onAppContextChanged, history }) {
  const classes = useStyles();
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <MenuSidebar name={"ADMIN"} items={items} >
        <Switch>
          <Route exact path="/admin/users">
            {/*<UserList classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />*/}
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
