import execa from 'execa';
import fs from 'fs';
import { blue, green, red } from 'kolorist';
import ora from 'ora';
import path from 'path';
import get_files from 'rec-get-files';
import tsConfig from './template/tsconfig';

/**
 * Check wether the path is available or not
 * @param paths path to be checked relative to cwd
 * @returns boolean
 */
const isPathsExists = (paths: string): boolean => {
  return fs.existsSync(path.join(cwd + paths));
};
/** process.cwd() or full path from the root to current directory */
const cwd = process.cwd();

/**
 * Convert all the JavaScript files to TypeScript
 */
export const init = async () => {
  const root = path.basename(cwd);

  if (isPathsExists("/package.json'")) {
    console.log(red(`\n${root} is not a next.js project`));
    process.exit(1);
  }

  console.log(blue(`\nMigrating ${root} to typescript`));

  if (!isPathsExists('/pages') && !isPathsExists('/src/pages')) {
    console.log(red(`\n${root} is not a next.js project`));
    process.exit(1);
  }

  let projectSource = isPathsExists('/pages')
    ? path.join(cwd + '/pages')
    : path.join(cwd + '/src/pages');

  let componentSource = isPathsExists('/components');
  let libComponentSource = isPathsExists('/lib');

  renameProjectFiles(projectSource);

  if (componentSource) renameComponentFiles(path.join(cwd + '/components'));
  if (libComponentSource) renameLibFiles(path.join(cwd + '/lib'));

  const allDependancies = ['typescript', '@types/react', '@types/node'];
  console.log(green('\nInstalling required packages\n'));
  allDependancies.map((dep) => console.log(`- ${dep}`));
  console.log('\n');

  await install(allDependancies);

  await tsInit();

  console.log(green('Wrote to tsconfig.json'));

  console.log(blue('\nYou are ready to go 🚀'));
};

/**
 * Initialize typescript in the project
 */
const tsInit = async () => {
  fs.writeFileSync(cwd + '/tsconfig.json', tsConfig);
};

/**
 * Rename all the files in the project
 * @param source path to the pages directory
 * @returns void
 */
const renameProjectFiles = (source: string) => {
  let files = getJsFiles(source);

  return files.forEach((file) => {
    if (file.indexOf('/pages/api/') > -1) {
      const newFilename = file.split('.');
      const transformed = newFilename[0] + '.ts';
      fs.renameSync(file, transformed);
    } else {
      const newFilename = file.split('.');
      const transformed = newFilename[0] + '.tsx';
      fs.renameSync(file, transformed);
    }
  });
};

/**
 * Rename all the files in the components directory
 * @param componentsSource path to the components directory
 * @returns void
 */
const renameComponentFiles = (componentsSource: string) => {
  let files = getJsFiles(componentsSource);
  return files.forEach((file) => {
    const newFilename = file.split('.');
    const transformed = newFilename[0] + '.tsx';
    fs.renameSync(file, transformed);
  });
};

/**
 * Rename all the files in the lib directory
 * @param libSource path to the lib directory
 * @returns void
 */
const renameLibFiles = (libSource: string) => {
  let files = getJsFiles(libSource);
  return files.forEach((file) => {
    const newFilename = file.split('.');
    const transformed = newFilename[0] + '.ts';
    fs.renameSync(file, transformed);
  });
};

/**
 * Get all the JavaScript files in the project
 * @param path path to the directory
 * @returns array of files
 */
const getJsFiles = (path: string): string[] => {
  const match = RegExp('^[^.]+.js$');
  return get_files(path).filter((file) => file.match(match));
};

/**
 * Install all the required packages
 * @param dependancies array of dependancies to be installed
 */
const install = async (dependancies: string[]) => {
  let spinner = ora('Installing...');
  try {
    spinner.start();
    await execa.command(`npm i -D ${dependancies.join(' ')}`, { shell: true });
    spinner.succeed();
  } catch (error) {
    spinner.fail();
    console.log({ error });
  }
};
