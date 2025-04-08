const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [__dirname],
  resolver: {
    nodeModulesPaths: [__dirname + '/node_modules'],
  },
  maxWorkers: 2,
  resetCache: true,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
