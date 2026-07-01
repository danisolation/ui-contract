# UI Contract Demo

A simple CLI tool for preserving frontend intent through living contracts.

## What is UI Contract?

UI Contract is a system that documents and maintains:
- Business purpose
- UX principles
- User journey
- Visual reference
- Accessibility expectations
- Validation rules

Instead of just documenting implementation, UI Contract captures the **intent** behind the code.

## Quick Start

### Installation

```bash
npm install
```

### Usage

#### 1. Create a new contract

```bash
ui-contract init dashboard
```

This creates a `contracts/dashboard.md` file with a template.

#### 2. Edit the contract

Open `contracts/dashboard.md` and fill in:
- Business purpose
- UX principles
- User journey
- Acceptance criteria
- Regression rules

#### 3. Validate contracts

```bash
# Validate all contracts
ui-contract validate

# Validate specific contract
ui-contract validate contracts/dashboard.md
```

#### 4. View contract info

```bash
ui-contract show dashboard
```

#### 5. List all contracts

```bash
ui-contract list
```

## Contract Format

Contracts use YAML frontmatter + Markdown body:

```markdown
---
page: "dashboard"
version: "1.0.0"
purpose: "Business purpose here"
author: "team-name"
ux_principles:
  - "Principle 1"
  - "Principle 2"
validation:
  accessibility: "WCAG-2.1-AA"
---

# Dashboard Contract

## Business Purpose
...

## User Journey
...
```

## Commands

| Command | Description |
|---------|-------------|
| `ui-contract init <page>` | Create new contract |
| `ui-contract validate [file]` | Validate contract(s) |
| `ui-contract show <page>` | Display contract info |
| `ui-contract list` | List all contracts |

## Project Structure

```
ui-contract-demo/
├── package.json
├── README.md
├── src/
│   ├── index.js          # Core logic
│   ├── cli.js            # CLI commands
│   ├── validator.js      # Schema validation
│   └── schema.json       # Contract schema
└── contracts/
    └── dashboard.md      # Sample contract
```

## Development

```bash
# Run CLI directly
node src/cli.js --help

# Or use npm script
npm start -- --help
```

## License

MIT