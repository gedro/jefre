import React from 'react';

import SignUpForm from './SignUpForm';

export default function SignUp({ classes, appContext, onAppContextChanged }) {
  return (
    <div className={classes.au_signup}>
      <SignUpForm
        classes={classes}
        appContext={appContext}
        onAppContextChanged={onAppContextChanged}
        type="candidate"
      />
      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <SignUpForm
        classes={classes}
        appContext={appContext}
        onAppContextChanged={onAppContextChanged}
        type="recruiter"
      />
    </div>
  );
}
