import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';
import MountBuilder from /*webpackIgnore: true*/ '../../utils/MountBuilder';

const appTitle = 'Marketing';

const callback = (el, appContext, history) => {
  ReactDOM.render(<App history={history} />, el);
}

const mount = MountBuilder.build(
  callback, appTitle, createMemoryHistory, createBrowserHistory
);

export { mount };