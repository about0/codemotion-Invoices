module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true
  },
  extends: "react",
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    indent: ["warn", 2],
    "max-len": ["warn", 120]
  }
};
