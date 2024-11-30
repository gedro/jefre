import { mount } from 'dashboard/DashboardApp';
import React, { useRef, useEffect } from 'react';

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} style={{
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }}/>;
};
