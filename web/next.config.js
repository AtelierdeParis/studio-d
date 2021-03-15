const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
  "@studio-d/core",
  "react-native",
]);
const path = require("path");

module.exports = withPlugins([withTM], {
  webpack: (config, { defaultLoaders }) => {
    // Alias all `react-native` imports to `react-native-web`
    config.resolve.alias["react-native"] = path.resolve(
      __dirname,
      "node_modules/react-native-web"
    );

    config.resolve.extensions = [
      ".web.ts",
      ".web.tsx",
      ".ts",
      ".tsx",
      ".web.js",
      ".web.jsx",
      ".js",
      ".jsx",
      ...config.resolve.extensions,
    ];

    return config;
  },

  target: "serverless",
});
