# gen-ng-component
[![Build Status](https://travis-ci.org/skamenetskiy/gen-ng-component.svg?branch=master)](https://travis-ci.org/skamenetskiy/gen-ng-component)

This micro-app generates an angularjs component according to John Papa's [styleguide](https://github.com/johnpapa/angular-styleguide).

## Installation
```
npm -g install gen-ng-component
```

## Usage
```
gen-ng-component {moduleName} {componentName} {path}
```

## Example
```
gen-ng-component app.main detailsList
```
^^ This line will generate the following files:
```
detailsList
    ├── detailsList.component.js
    ├── detailsList.controller.js
    ├── detailsList.html
    └── detailsList.module.js
```
detailsList.component.js
```javascript
/**
 * @desc detailsList component
 * @namespace Components
 */
(function() {

    'use strict';
    
    angular
        .module('app.main.detailsList')
        .component('detailsList', {
            bindings: {
            },
            templateUrl: 'detailsList/detailsList.html',
            controller: 'DetailsListController as vm',
        });

})();
```
detailsList.controller.js
```javascript
/**
 * @desc detailsList component
 * @namespace Controllers
 */
(function() {

    'use strict';
    
    angular
        .module('app.main.detailsList')
        .controller('DetailsListController', DetailsListController);

    /**
     * @name DetailsListController
     * @desc detailsList controller
     * @constructor
     * @ngInject
     */
    function DetailsListController() {
        const vm = this;
    }

})();
```
detailsList.html
```html
<!-- detailsList component -->
<section class="details-list">
    <!-- detailsList contents -->
</section>
<!-- /detailsList component -->
```
detailsList.module.js
```javascript
/**
 * @desc detailsList component
 * @namespace Modules
 */
(function() {

    'use strict';
    
    angular
        .module('app.main.detailsList', []);

})();
```