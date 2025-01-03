/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  printWidth: 84,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  arrowParens: 'avoid',
  parser: 'typescript',
  importOrderSeparation: true,
  jsxSingleQuote: false,
};

export default config;
