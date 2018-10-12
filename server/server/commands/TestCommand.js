const BaseCommand = require('../utils/managment/BaseCommand');

class TestCommand extends BaseCommand {

  async handle() {
    this.app.log.info('Test command called');
  }
}

module.exports = TestCommand;
