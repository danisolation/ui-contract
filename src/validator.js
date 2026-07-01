const Ajv = require('ajv');
const schema = require('./schema.json');

class ContractValidator {
  constructor() {
    this.ajv = new Ajv({ allErrors: true });
    this.validate = this.ajv.compile(schema);
  }

  /**
   * Validate contract data against schema
   * @param {Object} data - Parsed contract data (frontmatter)
   * @returns {Object} { valid: boolean, errors: string[] }
   */
  validateContract(data) {
    const valid = this.validate(data);
    const errors = valid ? [] : this.formatErrors(this.validate.errors);

    return { valid, errors };
  }

  /**
   * Format validation errors into readable strings
   * @param {Array} errors - AJV error objects
   * @returns {string[]} Formatted error messages
   */
  formatErrors(errors) {
    return errors.map(err => {
      const path = err.instancePath || '';
      const prop = path.replace('/', '') || 'root';

      switch (err.keyword) {
        case 'required':
          return `Missing required field: ${err.params.missingProperty}`;
        case 'type':
          return `${prop} must be of type ${err.params.type}`;
        case 'minLength':
          return `${prop} must be at least ${err.params.limit} characters`;
        case 'pattern':
          return `${prop} does not match required pattern: ${err.params.pattern}`;
        case 'additionalProperties':
          return `Unknown field: ${err.params.additionalProperty}`;
        default:
          return `${prop}: ${err.message}`;
      }
    });
  }
}

module.exports = ContractValidator;