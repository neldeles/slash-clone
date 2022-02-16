const FLAG = "msw_suppressed";

export function weakStart(worker, defaultOptions = {}) {
  const start = (options) => {
    // Check the current mocking state in the localStorage
    const shouldSuppress = localStorage.getItem(FLAG);

    if (shouldSuppress) {
      return Promise.resolve(null);
    }

    return worker.start(options ?? defaultOptions);
  };

  // Make controller methods globally available to call during runtime.
  // Chain the localStorage update to preserve the state.
  const mocks = {
    start: (options) =>
      start(options ?? defaultOptions).then(() =>
        localStorage.removeItem(FLAG)
      ),
    stop: () => {
      worker.stop();
      localStorage.setItem(FLAG, "true");
    },
  };
  window.mocks = mocks;

  // Enable mocks by default
  return start(defaultOptions);
}
