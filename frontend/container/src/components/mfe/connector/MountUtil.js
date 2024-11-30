import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const doMount = (mount, { appContext, onAppContextChanged }) => {
  const ref = useRef(null);
  const history = useHistory();
  const refreshRef = useRef(null);

  useEffect(() => {
    const { onParentNavigate, refresh } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      appContext: appContext,
      onAppContextChanged: onAppContextChanged
    });

    refreshRef.current = refresh;
    history.listen(onParentNavigate);
  }, []);

  // Refresh the MFE app when the Container appContext changes
  useEffect(() => {
    if (refreshRef.current) {
      refreshRef.current(appContext, onAppContextChanged);
    }
  }, [appContext, onAppContextChanged]);

  return <div ref={ref} style={{
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }}/>;
};

export default doMount;