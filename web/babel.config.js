module.exports = {
  presets: ["next/babel"],
  plugins: [
    "inline-react-svg",
    ["react-native-web", { commonjs: true }],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    "babel-plugin-parameter-decorator",
  ],
};
