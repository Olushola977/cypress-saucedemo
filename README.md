# Sauce Demo Cypress Projects

## Clone the project from GitHub

```bash
git clone https://github.com/<your-username>/cypress-saucedemo.git
cd cypress-saucedemo
```

## Install dependencies for both projects

Run the following commands from the project root:

```bash
cd project-1-plain-tests
npm install

cd ../project-2-pom
npm install
```

## Run Project 1: Plain Cypress tests

```bash
cd project-1-plain-tests
npm run cy:open
```

To run the tests in headless mode:

```bash
cd project-1-plain-tests
npm test
```

## Run Project 2: Page Object Model tests

```bash
cd project-2-pom
npm run cy:open
```

To run the tests in headless mode:

```bash
cd project-2-pom
npm test
```
