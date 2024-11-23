import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';
import MountBuilder from /*webpackIgnore: true*/ '../../utils/MountBuilder';

const appTitle = 'React Components';

const callback = (el, appContext, onAppContextChanged, history) => {
  ReactDOM.render(<App appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />, el);
}

const mount = MountBuilder.build(callback, appTitle, createMemoryHistory, createBrowserHistory);

export { mount };