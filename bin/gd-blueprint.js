#!/usr/bin/env node

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const packageRoot = path.resolve(__dirname, '..');
const templateEntries = ['.agents', '.gd-blueprint', 'AGENTS.md'];

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log('Usage: gd-blueprint [target-directory]');
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  console.log(require(path.join(packageRoot, 'package.json')).version);
  process.exit(0);
}

if (args.length > 1 || (args[0] && args[0].startsWith('-'))) {
  stop('Usage: gd-blueprint [target-directory]');
}

const requestedTarget = path.resolve(args[0] || process.cwd());
let targetRoot;

try {
  targetRoot = fs.realpathSync(requestedTarget);
  if (!fs.statSync(targetRoot).isDirectory()) {
    stop('Target is not a directory: ' + requestedTarget);
  }
} catch (error) {
  if (error && error.code === 'ENOENT') {
    stop('Target directory not found: ' + requestedTarget);
  }
  stop(`Cannot access target directory: ${requestedTarget} (${error.code || error.message})`);
}

const sourceFiles = [];

try {
  for (const entry of templateEntries) {
    collectFiles(path.join(packageRoot, entry), entry, sourceFiles);
  }
} catch (error) {
  stop(error.message);
}

const filesToCopy = [];
const kept = [];
const conflicts = [];

try {
  for (const file of sourceFiles) {
    const destination = inspectDestination(file.relativePath);

    if (destination === 'keep') {
      kept.push(file.relativePath);
    } else if (destination) {
      conflicts.push({ relativePath: file.relativePath, reason: destination });
    } else {
      filesToCopy.push(file);
    }
  }
} catch (error) {
  stop(error.message);
}

if (conflicts.length > 0) {
  console.error('GD Blueprint found path conflicts; no files were copied:');
  for (const conflict of conflicts) {
    console.error(`- ${displayPath(conflict.relativePath)} (${conflict.reason})`);
  }
  process.exit(1);
}

let copied = 0;
const failed = [];

for (const file of filesToCopy) {
  const destinationPath = path.join(targetRoot, file.relativePath);

  try {
    fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
    fs.copyFileSync(file.sourcePath, destinationPath, fs.constants.COPYFILE_EXCL);
    copied++;
  } catch (error) {
    if (error && error.code === 'EEXIST') {
      kept.push(file.relativePath);
    } else {
      failed.push({
        relativePath: file.relativePath,
        code: error && error.code ? error.code : 'unknown error'
      });
    }
  }
}

console.log('GD Blueprint');
console.log(`Copied: ${copied}`);
console.log(`Kept: ${kept.length}`);
console.log(`Failed: ${failed.length}`);

if (kept.length > 0) {
  console.log('\nExisting files kept:');
  for (const relativePath of kept) {
    console.log('- ' + displayPath(relativePath));
  }
  console.log('\nReview kept files and merge changes if needed.');
}

if (failed.length > 0) {
  console.error('\nFiles not copied:');
  for (const failure of failed) {
    console.error(`- ${displayPath(failure.relativePath)} (${failure.code})`);
  }
  process.exitCode = 1;
} else if (copied > 0) {
  console.log('\nNext: invoke $gd-plan.');
}

function collectFiles(sourcePath, relativePath, files) {
  const source = fs.lstatSync(sourcePath);

  if (source.isSymbolicLink()) {
    throw new Error('Package template contains a symbolic link: ' + displayPath(relativePath));
  }

  if (source.isFile()) {
    files.push({ sourcePath, relativePath });
    return;
  }

  if (!source.isDirectory()) {
    throw new Error('Package template contains an unsupported entry: ' + displayPath(relativePath));
  }

  const children = fs.readdirSync(sourcePath, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name));

  for (const child of children) {
    collectFiles(path.join(sourcePath, child.name), path.join(relativePath, child.name), files);
  }
}

function inspectDestination(relativePath) {
  const parts = relativePath.split(path.sep);
  let currentPath = targetRoot;

  for (const part of parts.slice(0, -1)) {
    currentPath = path.join(currentPath, part);
    const current = lstatIfPresent(currentPath);

    if (!current) {
      continue;
    }
    if (current.isSymbolicLink()) {
      return 'parent path is a symbolic link';
    }
    if (!current.isDirectory()) {
      return 'parent path is not a directory';
    }
  }

  const destination = lstatIfPresent(path.join(targetRoot, relativePath));
  if (!destination) {
    return null;
  }
  if (destination.isFile()) {
    return 'keep';
  }
  if (destination.isSymbolicLink()) {
    return 'destination is a symbolic link';
  }
  return 'destination is not a file';
}

function lstatIfPresent(targetPath) {
  try {
    return fs.lstatSync(targetPath);
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

function displayPath(relativePath) {
  return relativePath.split(path.sep).join('/');
}

function stop(message) {
  console.error(message);
  process.exit(1);
}
