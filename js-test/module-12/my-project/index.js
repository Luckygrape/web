// index.js
const chalk = require('chalk');

const name = 'Студент';

console.log(chalk.green('='.repeat(30)));
console.log(chalk.blue.bold(`Привет, ${name}!`));
console.log(chalk.yellow('Ты освоил npm!'));
console.log(chalk.green('='.repeat(30)));