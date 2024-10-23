const MountBuilder = (function () {

  function build(callback, appTitle, createMemoryHistory, createBrowserHistory) {
    const mount = (el, {appContext, onAppContextChanged, onNavigate, defaultHistory, initialPath}) => {
      const history =
        defaultHistory ||
        createMemoryHistory({
          initialEntries: [initialPath],
        });

      if (onNavigate) {
        history.listen(onNavigate);
      }

      callback(el, appContext, onAppContextChanged, history);

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
      const context = {
        apiUrl: '',
        api: {},
        token: "",
        user: {},
        isSignedIn: false,
        isAdmin: false,
        isCandidate: false,
        isRecruiter: false,
      };

      const devRoot = document.querySelector('#_testing-dev-root');
      if (devRoot) {
        document.title = appTitle;
        mount(devRoot, {
          appContext: context,
          onAppContextChanged: context => context,
          defaultHistory: createBrowserHistory()
        });
      }
    }

    return mount;
  }

  return {
    build: build,
  };
})();

export default MountBuilder;
