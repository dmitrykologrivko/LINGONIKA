/**
 * Base abstract management command class describes
 * general interface for implementing management commands.
 */
class BaseCommand {
  /**
   * @param app loopback app instance
   * @param argv command line arguments
   */
  constructor(app, argv) {
    this.app = app;
    this.argv = argv;
  }

  /**
   * This method is required to override and implement in parent classes.
   * This method should describe actions what you want to implement in a management command.
   * @returns {Promise<void>}
   */
  async handle() {
    throw new Error('Handle method is not implemented');
  }

  /**
   * This method allows to interrupt node process.
   */
  interrupt() {
    return process.exit(0);
  }
}

module.exports = BaseCommand;
