module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true
  },
  plugins: ["prettier"],
  extends: ["plugin:prettier/recommended"],
  rules: {
    indent: ["warn", 2],
    "max-len": ["warn", 120],
    "prettier/prettier": "error"
  }
};
