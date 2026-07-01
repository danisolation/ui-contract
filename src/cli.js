#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const path = require('path');
const UIContract = require('./index');

const contract = new UIContract();
const program = new Command();

program
  .name('ui-contract')
  .description('UI Contract system for preserving frontend intent')
  .version('1.0.0');

// Init command
program
  .command('init <page>')
  .description('Create a new contract file for a page/component')
  .action((page) => {
    try {
      const filePath = contract.init(page);
      console.log(chalk.green(`✅ Created contract: ${chalk.bold(page)}.md`));
      console.log(chalk.gray(`   Location: ${filePath}`));
      console.log(chalk.gray('\nNext steps:'));
      console.log(chalk.gray('   1. Edit the contract file to fill in details'));
      console.log(chalk.gray('   2. Run `ui-contract validate` to check schema'));
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Validate command
program
  .command('validate [file]')
  .description('Validate contract(s) against schema')
  .action((file) => {
    try {
      let results;

      if (file) {
        const filePath = path.resolve(file);
        results = [contract.validate(filePath)];
      } else {
        results = contract.validateAll();
      }

      console.log(chalk.bold('\n📋 Validation Results\n'));

      let allValid = true;

      results.forEach(result => {
        if (result.valid) {
          console.log(chalk.green(`✅ ${result.file}`));
        } else {
          allValid = false;
          console.log(chalk.red(`❌ ${result.file}`));
          result.errors.forEach(err => {
            console.log(chalk.red(`   • ${err}`));
          });
        }
      });

      console.log('');

      if (allValid) {
        console.log(chalk.green.bold('All contracts are valid! 🎉'));
      } else {
        console.log(chalk.red.bold('Some contracts have errors.'));
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Show command
program
  .command('show <page>')
  .description('Display contract information')
  .action((page) => {
    try {
      const filePath = contract.findContract(page);

      if (!filePath) {
        console.error(chalk.red(`❌ Contract not found: ${page}.md`));
        process.exit(1);
      }

      const info = contract.show(filePath);

      console.log(chalk.bold('\n📄 Contract Information\n'));
      console.log(chalk.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
      console.log(chalk.bold(`Page: ${chalk.white(info.metadata.page)}`));
      console.log(chalk.bold(`Version: ${chalk.white(info.metadata.version)}`));

      if (info.metadata.author) {
        console.log(chalk.bold(`Author: ${chalk.white(info.metadata.author)}`));
      }

      console.log(chalk.bold(`Purpose: ${chalk.white(info.metadata.purpose)}`));

      if (info.metadata.ux_principles && info.metadata.ux_principles.length > 0) {
        console.log(chalk.bold('\nUX Principles:'));
        info.metadata.ux_principles.forEach(principle => {
          console.log(chalk.gray(`  • ${principle}`));
        });
      }

      if (info.metadata.validation) {
        console.log(chalk.bold('\nValidation Rules:'));
        if (info.metadata.validation.accessibility) {
          console.log(chalk.gray(`  • Accessibility: ${info.metadata.validation.accessibility}`));
        }
      }

      console.log(chalk.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));

      if (info.content) {
        console.log(chalk.bold('\n📝 Content Preview:\n'));
        const preview = info.content.substring(0, 500);
        console.log(chalk.gray(preview));
        if (info.content.length > 500) {
          console.log(chalk.gray('\n... (truncated)'));
        }
      }
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// List command (bonus)
program
  .command('list')
  .description('List all contracts')
  .action(() => {
    try {
      const fs = require('fs');
      const contractsDir = path.join(process.cwd(), 'contracts');

      if (!fs.existsSync(contractsDir)) {
        console.log(chalk.yellow('No contracts directory found.'));
        console.log(chalk.gray('Run `ui-contract init <page>` to create your first contract.'));
        return;
      }

      const files = fs.readdirSync(contractsDir).filter(f => f.endsWith('.md'));

      if (files.length === 0) {
        console.log(chalk.yellow('No contracts found.'));
        console.log(chalk.gray('Run `ui-contract init <page>` to create your first contract.'));
        return;
      }

      console.log(chalk.bold('\n📁 Available Contracts\n'));

      files.forEach(file => {
        const pageName = file.replace('.md', '');
        console.log(chalk.cyan(`  • ${pageName}`));
      });

      console.log(chalk.gray(`\nTotal: ${files.length} contract(s)`));
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse();