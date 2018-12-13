# Angular components based on Chart.js
[![Build Status](https://travis-ci.org/ztan/ezy-chart.svg?branch=master)](https://travis-ci.org/ztan/ezy-chart)
[![codecov](https://codecov.io/gh/ztan/ezy-chart/branch/master/graph/badge.svg)](https://codecov.io/gh/ztan/ezy-chart)
[![npm version](https://badge.fury.io/js/ezy-chart.svg)](http://badge.fury.io/js/ezy-chart)
[![devDependency Status](https://david-dm.org/ztan/ezy-chart/dev-status.svg)](https://david-dm.org/ztan/ezy-chart?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/ztan/ezy-chart.svg)](https://github.com/ztan/ezy-chart/issues)
[![GitHub stars](https://img.shields.io/github/stars/ztan/ezy-chart.svg)](https://github.com/ztan/ezy-chart/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/ztan/ezy-chart/master/LICENSE)

## Demo
https://ztan.github.io/ezy-chart/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## About

Angular components based on Chart.js and ECharts

## Installation

Install through npm:
```
npm install --save ezy-chart
```

Then include in your apps module:

```typescript
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ezy-chart';

@NgModule({
  imports: [
    ChartsModule
  ]
})
export class MyModule {}
```

Finally use in one of your apps components:
```typescript
import { Component } from '@angular/core';

@Component({
  template: '<ezy-chart type="bar" [datasets]="chartDatasets"></ezy-chart>'
})
export class MyComponent {
	chartDatasets: Chart.ChartDataSets[] = [{ data: [12, 19, 3, 5, 2, 3], label: 'series 1' }];
}
```

You may also find it useful to view the [demo source](https://github.com/ztan/ezy-chart/blob/master/demo/demo.component.ts).

## Documentation
All documentation is auto-generated from the source via [compodoc](https://compodoc.github.io/compodoc/) and can be viewed here:
https://ztan.github.io/ezy-chart/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and [yarn](https://yarnpkg.com/en/docs/install)
* Install local dev dependencies: `yarn` while current directory is this repo

### Development server
Run `yarn start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `yarn test` to run tests once or `yarn run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
yarn run release
```

## License

MIT
