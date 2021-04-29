module.exports = {
  load: {
    before: ["bugsnag"],
  },
  settings: {
    bugsnag: {
      enabled: process.env.NODE_ENV !== "development" && !process.env.CI,
    },
  },
};
