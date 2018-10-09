const fs = require('fs');
const path = require('path');
const util = require('util');

const BaseCommand = require('./BaseCommand');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const COMMANDS_DIR = path.resolve() + '/server/commands';

/**
 * Command not found error throws when provided management command could not be found.
 */
class CommandNotFoundError extends Error {

}

/**
 * Command type error throws when provided management command is not extend BaseCommand class.
 */
class CommandTypeError extends Error {

}

/**
 * Multiple files found error throws when management command runner
 * found multiple js files with the same provided name.
 */
class MultipleFilesFoundError extends Error {

}

/**
 * Management commands runner class allows to find and run provided management command.
 */
class CommandRunner {
  /**
   * @param app loopback app instance
   * @param argv command line arguments
   */
  constructor(app, argv = {}) {
    this.app = app;
    this.argv = argv;
  }

  /**
   * This method allows to check if command argument was provided.
   * @returns {boolean}
   */
  shouldRunCommand() {
    if (this.argv.command) {
      return true;
    }

    return false;
  }

  /**
   * This method allows to run provided management command.
   * @returns {Promise<void>}
   */
  async runCommand() {
    const command = await this._getCommandInstance();

    await command.handle();

    this._interrupt();
  }

  /**
   * This private method allows to get instance of provided management command.
   * @returns {*} management command instance
   * @private
   */
  async _getCommandInstance() {
    const files = await this._getFiles(COMMANDS_DIR);
    const file = await this._findFile(this.argv.command, files);

    if (!file) {
      throw new CommandNotFoundError('Command is not found');
    }

    const clazz = require(file);
    const command = new clazz(this.app, this.argv);

    if (!command instanceof BaseCommand) {
      throw new CommandTypeError('Command is not extends BaseCommand class');
    }

    return command;
  }

  /**
   * This private method allows to get list of all files
   * from a directory include files from sub-directories.
   * @param dir directory to scan
   * @returns {Promise<Array[string]>} list of files
   * @private
   */
  async _getFiles(dir) {
    const subDirs = await readdir(dir);

    const files = await Promise.all(subDirs.map(async (subDir) => {
      const fullPath = path.resolve(dir, subDir);
      return (await stat(fullPath)).isDirectory() ? this._getFiles(fullPath) : fullPath;
    }));

    return files.reduce((accumulator, file) => accumulator.concat(file), []);
  }

  /**
   * This private method allows to find a file by file name in the files list.
   * Throws error if multiple files with the same name detected in the list of files.
   * @param fileName file name to find
   * @param files list of files
   * @returns {Promise<string>} file path or empty string
   * @private
   */
  async _findFile(fileName, files = []) {
    const foundedFiles = [];

    files.forEach((file) => {
      if (file.search(`${fileName}.js`) !== -1) {
        foundedFiles.push(file);
      }
    });

    if (foundedFiles.length > 1) {
      throw new MultipleFilesFoundError(`Multiple ${fileName} files are found`);
    }

    return foundedFiles.length === 1 ? foundedFiles[0] : '';
  }

  /**
   * This private method allows to interrupt node process.
   * @private
   */
  _interrupt() {
    return process.exit(0);
  }
}

module.exports = CommandRunner;
