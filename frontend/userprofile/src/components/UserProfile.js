import React from "react";

import ProfileDetails from './ProfileDetails';
import Mfa from './mfa/Mfa';

export default function UserProfile({ classes, appContext, onAppContextChanged, history }) {
  return (
    <div className={classes.up_userprofile}>
      <ProfileDetails classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
      <Mfa classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
    </div>
  );
};