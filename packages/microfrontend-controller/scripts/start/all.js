
const { microfrontendFolderName, getPackagesFromConfig } = require('../utils/config');
const { writeJson } = require('../utils/fs');
const { escapePackageName } = require('../utils/paths');
const startSingleApp = require('./single');


const startMultipleLocations = async (configurationFilePath, opts = {}) => {
  const {
    microfrontends,
    app,
  } = await getPackagesFromConfig(configurationFilePath, opts);

  const INITIAL_PORT = 3001;

  const metaJson = Object.keys(microfrontends).reduce((agg, packageName, i) => Object.assign(agg, {
    [escapePackageName(packageName)]: {
      host: `http://localhost:${INITIAL_PORT + i}`,
    },
  }), {});

  const pathToAppPackage = Object.values(app)[0];

  await writeJson(`${pathToAppPackage}/public/${microfrontendFolderName}/meta.json`, metaJson);

  Object.values(microfrontends)
    .forEach((packagePath, i) => startSingleApp({
      pathToPackage: packagePath,
      port: INITIAL_PORT + i,
      isMicro: true,
      isRunningAll: true,
    }));

  startSingleApp({
    pathToPackage: pathToAppPackage,
    port: 3000,
    isRunningAll: true,
  });
};

module.exports = startMultipleLocations;
