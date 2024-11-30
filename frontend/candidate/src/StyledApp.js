import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

import MenuSidebar from 'components/MenuSidebar';

const useStyles = makeStyles((theme) => ({
  xx_yyy: {
  }
}));

export default function StyledApp({ appContext, onAppContextChanged, history }) {
  const classes = useStyles();

  const items = [
    {
      label: 'All Users',
      link: '/admin/users',
      icon: <FaUser />
    }
  ];

  return (
    <MenuSidebar name={"CANDIDATE"} items={items} >
      <Switch>
        <Route path="/candidate/users">
          {/*<UserList classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />*/}
        </Route>
        <Route path="/candidate/users/:userId">
          {/*<UserDetails classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />*/}
        </Route>
      </Switch>
    </MenuSidebar>
  );
};
