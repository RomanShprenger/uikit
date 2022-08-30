const fs = require('fs');
const path = require('path');
const webfontsGenerator = require('webfonts-generator');

const appDirectory = fs.realpathSync(process.cwd());
const fontsPath = path.resolve(appDirectory, './src/components/Icon/styles');
const destinationPath = path.resolve(appDirectory, './dist/components/Icon');

fs.readdirSync(fontsPath).forEach((configFile) => {
  if (configFile.search(/\.js$/) === -1) {
    return;
  }

  const name = configFile.split('.')[0];
  const config = require(path.resolve(fontsPath, configFile));
  const paths = config.files.filter((fileItem) => fileItem.includes('*')).map((fileItem) => fileItem.replace(/\*.+/, ''));
  const files = [];

  paths.forEach((item) =>
    fs.readdirSync(path.resolve(fontsPath, item)).forEach((file) => files.push(path.resolve(fontsPath, item, file))));

  const webfontsGeneratorConfig = {
    fontName: config.fontName,
    files,
    dest: path.resolve(destinationPath, 'fonts', name),
    templateOptions: {
      classPrefix: config.classPrefix,
      baseSelector: config.baseSelector,
    },
    cssDest: path.resolve(destinationPath, 'styles', `${name}.css`),
    cssFontsUrl: `../fonts/${name}`,
    types: config.types,
    fontHeight: 1000, // fix ugly svg problem
    html: config.html,
    htmlTemplate: path.resolve(fontsPath, config.htmlTemplate),
    css: config.css,
    cssTemplate: path.resolve(fontsPath, config.cssTemplate),
  };

  console.log('Files are', files);

  webfontsGenerator(webfontsGeneratorConfig, (error) => (error
    ? console.error(`Webfonts build failed for ${configFile}`, error)
    : console.log(`Done ${configFile}!`)
  ));
});
