const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const ContractValidator = require('./validator');

class UIContract {
  constructor() {
    this.validator = new ContractValidator();
    this.contractsDir = path.join(process.cwd(), 'contracts');
  }

  /**
   * Initialize contracts directory
   */
  ensureContractsDir() {
    if (!fs.existsSync(this.contractsDir)) {
      fs.mkdirSync(this.contractsDir, { recursive: true });
    }
  }

  /**
   * Create a new contract file
   * @param {string} pageName - Name of the page/component
   * @returns {string} Path to created file
   */
  init(pageName) {
    this.ensureContractsDir();

    const filePath = path.join(this.contractsDir, `${pageName}.md`);

    if (fs.existsSync(filePath)) {
      throw new Error(`Contract already exists: ${pageName}.md`);
    }

    const template = this.generateTemplate(pageName);
    fs.writeFileSync(filePath, template, 'utf8');

    return filePath;
  }

  /**
   * Generate contract template
   * @param {string} pageName - Page name
   * @returns {string} Template content
   */
  generateTemplate(pageName) {
    return `---
page: "${pageName}"
version: "1.0.0"
purpose: "TODO: Describe the business purpose of ${pageName}"
author: "TODO: Add author or team"
ux_principles:
  - "TODO: Add UX principle 1"
  - "TODO: Add UX principle 2"
validation:
  accessibility: "WCAG-2.1-AA"
---

# ${pageName.charAt(0).toUpperCase() + pageName.slice(1)} Contract

## Business Purpose

TODO: Describe why this page exists and what user problem it solves.

## User Journey

TODO: Describe how users interact with this page.

1. Step 1
2. Step 2
3. Step 3

## Visual Reference

TODO: Add reference image or link

![${pageName} Reference](./references/${pageName}-v1.png)

## Acceptance Criteria

- [ ] TODO: Add acceptance criteria 1
- [ ] TODO: Add acceptance criteria 2
- [ ] TODO: Add acceptance criteria 3

## Regression Rules

TODO: Define what changes are NOT acceptable

- KHÔNG được TODO
- KHÔNG được TODO
`;
  }

  /**
   * Validate a contract file
   * @param {string} filePath - Path to contract file
   * @returns {Object} Validation result
   */
  validate(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);

    const result = this.validator.validateContract(data);

    return {
      file: path.basename(filePath),
      ...result
    };
  }

  /**
   * Validate all contracts in contracts directory
   * @returns {Object[]} Array of validation results
   */
  validateAll() {
    this.ensureContractsDir();

    const files = fs.readdirSync(this.contractsDir)
      .filter(f => f.endsWith('.md'));

    if (files.length === 0) {
      return [{ file: 'none', valid: false, errors: ['No contract files found'] }];
    }

    return files.map(file => {
      const filePath = path.join(this.contractsDir, file);
      return this.validate(filePath);
    });
  }

  /**
   * Show contract info
   * @param {string} filePath - Path to contract file
   * @returns {Object} Parsed contract data
   */
  show(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: markdown } = matter(content);

    return {
      file: path.basename(filePath),
      metadata: data,
      content: markdown.trim()
    };
  }

  /**
   * Find contract file by page name
   * @param {string} pageName - Page name to find
   * @returns {string|null} File path or null
   */
  findContract(pageName) {
    const filePath = path.join(this.contractsDir, `${pageName}.md`);

    if (fs.existsSync(filePath)) {
      return filePath;
    }

    return null;
  }
}

module.exports = UIContract;