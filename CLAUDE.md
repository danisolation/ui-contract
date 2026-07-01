# CLAUDE.md

## UI Contract System

Project này là CLI tool để **preserve frontend intent** thông qua living contracts.

## Mục đích

Giải quyết vấn đề: Khi phát triển với AI assistance, ý định gốc của frontend bị mất dần. UI Contract giúp lưu trữ:
- Business purpose
- UX principles
- User journey
- Regression rules

## Cài đặt

```bash
# Local development
npm install

# Global (để dùng ở mọi project)
npm link
```

## Sử dụng

```bash
# Tạo contract mới
ui-contract init <page-name>

# Validate contracts
ui-contract validate

# Xem contract info
ui-contract show <page-name>

# Liệt kê tất cả contracts
ui-contract list
```

## Contract Format

Files `.md` với YAML frontmatter:

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
```

## Quy tắc khi làm việc

1. **Mỗi page quan trọng** cần có contract file
2. **Validate TRƯỚC khi commit/deploy**
3. **Contract files** đặt trong thư mục `contracts/`
4. **Version contract** phải theo semver format
5. **Regression rules** phải rõ ràng và cụ thể

## Project Structure

```
ui-contract/
├── src/
│   ├── cli.js          # CLI commands
│   ├── index.js        # Core logic
│   ├── validator.js    # Schema validation
│   └── schema.json     # Contract schema
├── contracts/          # Contract files
├── package.json
├── README.md
└── CLAUDE.md           # File này
```

## Commands reference

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| `init <page>` | Tạo contract mới | `ui-contract init login` |
| `validate [file]` | Validate contracts | `ui-contract validate` |
| `show <page>` | Hiển thị contract | `ui-contract show dashboard` |
| `list` | Liệt kê contracts | `ui-contract list` |

## Dependencies

- `commander`: CLI framework
- `gray-matter`: Parse YAML frontmatter
- `ajv`: JSON Schema validation
- `chalk`: Colorful terminal output

## Integration

### Với AI assistants
- Đọc `CLAUDE.md` để hiểu context
- Sử dụng `ui-contract validate` trước khi suggest thay đổi
- Respect regression rules trong contracts

### Với CI/CD
```yaml
# GitHub Actions
- run: npm run contract:validate
```

### Với VS Code
- Contracts co-located với source code
- Dễ tìm và maintain