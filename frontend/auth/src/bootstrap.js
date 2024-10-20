import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';
import MountBuilder from /*webpackIgnore: true*/ '../../utils/MountBuilder';

const appTitle = 'Authentication';

const callback = (el, appConfig, history) => {
  ReactDOM.render(<App appConfig={appConfig} history={history} />, el);
}

const mount = MountBuilder.build(
  callback, appTitle, createMemoryHistory, createBrowserHistory
);

export { mount };