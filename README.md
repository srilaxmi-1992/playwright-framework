# Playwright Automation Framework

A Playwright + TypeScript test automation framework covering UI tests for an OpenCart e-commerce application and API tests against the Restful-Booker REST API.

---

## Overview

**UI Tests** — Login, product search, product display, shopping cart, and checkout flows on a locally hosted OpenCart store. Tests follow the Page Object Model pattern with custom fixtures for clean test setup and teardown.

**API Tests** — Full CRUD coverage (Create, Get, Update, Delete) against the public Restful-Booker API, with token-based authentication handled in a shared `beforeEach`.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Playwright ^1.60.0 | Browser automation & test runner |
| TypeScript | Typed test code |
| Allure Playwright ^3.9.0 | Rich test reporting |
| Faker.js ^10.4.0 | Test data generation |
| csv-parse / xlsx | CSV & Excel test data reading |

---

## Project Structure

```
playwright-framework/
├── config/           # Environment config (URLs, credentials)
├── fixtures/         # Custom Playwright fixtures
├── pages/            # Page Object Model classes
├── tests/            # Test specs
│   └── api/          # API test specs
├── testdata/         # JSON test data files
├── utils/            # Helper & utility classes
├── reports/          # Generated HTML and Allure reports
├── .github/workflows # CI/CD pipeline
└── playwright.config.ts
```

---

## Prerequisites

- Node.js LTS (v18+)
- OpenCart running locally at `http://localhost/opencart/upload/index.php`
- Allure CLI for Allure reports — `npm install -g allure-commandline`

---

## Installation

```bash
git clone https://github.com/srilaxmi-1992/playwright-framework.git
cd playwright-framework
npm install
npx playwright install
```

---

## Configuration

Update `config/config.ts` to match your environment:

```typescript
export const config = {
    baseURL: 'http://localhost/opencart/upload/index.php',
    email: 'yuvikarao@abc.com',
    password: 'test@123',
    apiBaseURL: 'https://restful-booker.herokuapp.com'
};
```

---

## Running Tests

```bash
npm test                # Run all tests
npm run smoke           # @smoke tests
npm run regression      # @regression tests
npm run sanity          # @sanity tests
npm run api             # @api tests
```

---

## Reporting

**HTML Report** (built-in Playwright):
```bash
npx playwright show-report reports/html-report
```

**Allure Report:**
```bash
npm run allure:generate   # Build report from results
npm run allure:open       # Open in browser
npm run allure:serve      # Serve directly from results
```

---

## CI/CD

GitHub Actions workflow runs on push/PR to `main` or `master`:

1. Installs Node.js LTS and dependencies
2. Installs Playwright browsers
3. Runs all tests
4. Uploads the HTML report as an artifact (retained 30 days)