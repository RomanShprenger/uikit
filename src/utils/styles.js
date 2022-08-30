export const resolveStyles = (path, ext = 'scss') => {
  const theme = process.env.UIKIT_THEME || 'beaver';
  const importPath = `${path}/${theme}.${ext}`;

  return importPath;
};
