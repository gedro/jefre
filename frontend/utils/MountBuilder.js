const MountBuilder = (function () {

  function build(callback, appTitle, createMemoryHistory, createBrowserHistory) {
    const mount = (el, {appConfig, onNavigate, defaultHistory, initialPath}) => {
      const history =
        defaultHistory ||
        createMemoryHistory({
          initialEntries: [initialPath],
        });

      if (onNavigate) {
        history.listen(onNavigate);
      }

      callback(el, appConfig, history);

      return {
        onParentNavigate({pathname: nextPathname}) {
          const {pathname} = history.location;

          if (pathname !== nextPathname) {
            history.push(nextPathname);
          }
        },
      };
    };

    if (process.env.NODE_ENV === 'development') {
      const devRoot = document.querySelector('#_testing-dev-root');

      if (devRoot) {
        document.title = appTitle;
        mount(devRoot, {defaultHistory: createBrowserHistory()});
      }
    }

    return mount;
  }

  return {
    build: build,
  };
})();

export default MountBuilder;
