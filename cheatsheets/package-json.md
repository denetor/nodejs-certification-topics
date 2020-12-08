# Package.json
Contains information about the application.

## Useful fields

### name
Application name.
214 lowercase chars, url-safe (only detters, numbers, hyphen and unsderscore).
If published on NPM must be unique

### version
Application version

### main
The main file to launch to start application

### scripts
Scripts to be launched with `npm run <scriptname>`
See [NPM Scripts sections](#npm-scripts)

### dependencies
Libraries needed by the application, stored in `node_modules` directory.

### devDependencies
Libraries needed only during development

## Npm scripts
Scripts launchable via `npm run` command:
```json
{
  "scripts": {
    "start": "node src/main.ts --debug=false",
    "start:dev": "NODE_ENV=development npm run lint && npm start",
    "lint": "eslint ./src/*.js"
  }
}
```
