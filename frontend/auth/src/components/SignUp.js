import React from 'react';

import SignUpForm from './SignUpForm';

export default function SignUp({ classes, appContext, onAppContextChanged, history }) {
  return (
    <div className={classes.au_signup}>
      <SignUpForm
        type="candidate" classes={classes} history={history}
        appContext={appContext} onAppContextChanged={onAppContextChanged}
      />
      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <SignUpForm
        type="recruiter" classes={classes} history={history}
        appContext={appContext} onAppContextChanged={onAppContextChanged}
      />
    </div>
  );
}
