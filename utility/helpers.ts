////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * An isomorphic routine to safely determine if the current execution context is being
 * ran on the client's or server's execution context.
 * @returns {boolean} A flag to indicate if code is being executed on the client or not.
 */
export const isClient = () => {
  // process.browser is deprecated so don't use it. also, if TypeScript says "window" is
  // undefined then ensure you have the "dom" library loaded or manually create one via
  // globals and set it to undefined since the client code will create a valid object
  return typeof window !== 'undefined';
};

////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * An isomorphic routine to safely retreive the application's base URL and port if non-standard.
 * @returns {string} The base URL without the trailing slash.
 */
export const getBaseUrl = () => {
  // keep in mind that isClient is not hoisted
  if (isClient()) {
    // consider window.top.location.origin if being cloaked by an iframe
    return window.location.origin;
  } else {
    // if load-balancing is used then HTTP may not give us the original public URL,
    // as such we rely on stored values when querying the URL on the server side
    if (process.env.NEXT_PUBLIC_APP_URL) {
      return process.env.NEXT_PUBLIC_APP_URL;
    } else if (
        process.env.VERCEL_ENV === 'production'
        && process.env.VERCEL_PROJECT_PRODUCTION_URL
      ) {
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    } else if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    } else
      // TODO: eventually pull the port from an environment config and only default if not found
      return 'http://localhost:3000';
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
