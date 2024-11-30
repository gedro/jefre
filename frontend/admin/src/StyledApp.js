import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route } from 'react-router-dom';

import MenuSidebar from 'components/MenuSidebar';

const useStyles = makeStyles((theme) => ({
  xx_yyy: {
  }
}));

export default function StyledApp({ appContext, onAppContextChanged, history }) {
  const classes = useStyles();
  return (
    <MenuSidebar name={"ADMIN"}>
      <Switch>
        <Route path="/admin/users">
          {/*<UserList classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />*/}
        </Route>
        <Route path="/admin/users/:userId">
          {/*<UserDetails classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />*/}
        </Route>
      </Switch>
    </MenuSidebar>
  );
};
