import chalk from 'chalk';

import {Command} from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${chalk.bold.magenta('Программа для подготовки данных для REST API сервера.')}
        ${chalk.magenta('Пример:')}
        ${chalk.blueBright('cli.js --<command> [--arguments]')}
        ${chalk.bold.magenta('Команды:')}
            ${chalk.magentaBright('--version: ')}                  ${chalk.blueBright('# выводит номер версии')}
            ${chalk.magentaBright('--help:    ')}                  ${chalk.blueBright('# печатает этот текст')}
            ${chalk.magentaBright('--import <filepath>:     ')}    ${chalk.blueBright('# импортирует данные из TSV')}
    `);
  }
}
