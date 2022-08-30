if (!process.env.NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

function getClientEnvironment() {
  const raw = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    UIKIT_THEME: process.env.UIKIT_THEME || 'beaver',
    IS_UIKIT_PACKAGE: true,
  };

  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => ({ ...env, [key]: JSON.stringify(raw[key]) }), {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
