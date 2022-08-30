module.exports = {
  files: [
    '../../../assets/icons/beaver/*.svg',
  ],
  fontName: 'beaver-icons',
  classPrefix: 'yui-icon--',
  baseSelector: '.yui-icon',
  types: ['eot', 'woff', 'woff2', 'ttf', 'svg'],
  fileName: '[fontname].[ext]',
  writeFiles: true,
  css: true,
  cssTemplate: 'tpl/css.hbs',
  html: true,
  htmlTemplate: 'tpl/html.hbs',
  dest: '../../../../build-storybook/beaver',
};
