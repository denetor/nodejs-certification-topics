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

Sample nodejs/nest scripts:
```
{
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --watch --debug 0.0.0.0",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest --forceExit --runInBand --detectOpenHandles",
    "test:single": "jest --forceExit --detectOpenHandles $*",
    "test:single:debug": "node --inspect-brk=0.0.0.0:9230 node_modules/.bin/jest --runInBand $*",
    "test:watch": "jest --watch --runInBand",
    "test:watch:single": "jest --watch --runInBand $*",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "typeorm:cli": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli -d src/config/typeorm-migrations.config.ts",
    "migration:generate": "npm run typeorm:cli migration:generate src/migrations/$npm_config_name",
    "_example_migration:generate": "npm run migration:generate --name=attachmentfilename",
    "migration:run": "npm run typeorm:cli migration:run",
    "migration:revert": "npm run typeorm:cli migration:revert"
  }
}
```



