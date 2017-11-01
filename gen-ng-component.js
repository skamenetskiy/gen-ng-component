#!/usr/bin/env node

// App dependencies
const fs = require('fs');
const path = require('path');

// Run the app
main(process.argv);

/**
 * @name main
 * @param {string[]} argv 
 * @private
 */
function main(argv) {
    generate(argv[3], argv[2], argv[3] || '.');
}

/**
 * @name generate
 * @desc Generate files
 * @param {string} componentName 
 * @param {string} moduleName 
 * @param {string} dir 
 * @private
 */
function generate(componentName, moduleName, dir) {
    const controllerName = ucfirst(componentName) + 'Controller';

    if(moduleName.indexOf(componentName) === -1) {
        moduleName += '.' + componentName;
    }

    try {
        fs.mkdirSync(dir);
        fs.writeFileSync(
            path.join(dir, `${componentName}.module.js`),
            getModuleContents(moduleName, componentName)
        );
        fs.writeFileSync(
            path.join(dir, `${componentName}.controller.js`),
            getControllerContents(moduleName, componentName, controllerName)
        );
        fs.writeFileSync(
            path.join(dir, `${componentName}.component.js`),
            getComponentContents(moduleName, componentName, controllerName)
        );
        fs.writeFileSync(
            path.join(dir, `${componentName}.html`),
            getHtmlContents(componentName)
        );
    } catch (err) {
        console.error(err.message);
    }
}

/**
 * @desc Returns module file contents
 * @param {string} moduleName 
 * @param {string} componentName 
 * @returns {string}
 * @private
 */
function getModuleContents(moduleName, componentName) {
    return wrap(`
    angular
        .module('${moduleName}', []);
`, componentName, 'Modules');
}

/**
 * @desc Returns controller file contents
 * @param {string} moduleName 
 * @param {string} componentName 
 * @param {string} controllerName 
 * @returns {string}
 * @private
 */
function getControllerContents(moduleName, componentName, controllerName) {
    return wrap(`
    angular
        .module('${moduleName}')
        .controller('${controllerName}', ${controllerName});

    /**
     * @name ${controllerName}
     * @desc ${componentName} controller
     * @constructor
     * @ngInject
     */
    function ${controllerName}() {
        const vm = this;
    }
`, componentName, 'Controllers');
}

/**
 * @desc Component file contents
 * @param {string} moduleName 
 * @param {string} componentName 
 * @param {string} controllerName 
 * @returns {string} 
 * @private
 */
function getComponentContents(moduleName, componentName, controllerName) {
    return wrap(`
    angular
        .module('${moduleName}')
        .component('${componentName}', {
            bindings: {
            },
            templateUrl: '${componentName}/${componentName}.html',
            controller: '${controllerName} as vm',
        });
`, componentName, 'Components');
}

/**
 * @desc Returns html file contents
 * @param {string} componentName 
 * @returns {string}
 * @private
 */
function getHtmlContents(componentName) {
    const className = snakeCase(componentName);
    return `<!-- ${componentName} component -->
<section class="${className}">
    <!-- ${componentName} contents -->
</section>
<!-- /${componentName} component -->
`
}

/**
 * @desc Wrap text contents with closure
 * @param {string} contents 
 * @param {string} componentName 
 * @param {string} namespace 
 * @returns {string} 
 * @private
 */
function wrap(contents, componentName, namespace) {
    return `/**
 * @desc ${componentName} component
 * @namespace ${namespace}
 */
(function() {

    'use strict';
    ${contents}
})();
`
}

/**
 * @desc Set the first letter to uppercase
 * @param {string} text 
 * @returns {string}
 * @private
 */
function ucfirst(text) {
    return text.substr(0, 1).toUpperCase() + text.substring(1);
}

/**
 * @desc Converts camelCase to snakeCase
 * @param {string} text 
 * @returns {string}
 * @private
 */
function snakeCase(text) {
    return text.replace(/([A-Z]{1})/g, '-$1').toLowerCase();
}