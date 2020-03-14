(function () {
    'use strict';

    const factory = function () {

        const VALIDATOR = {
            [WavesApp.defaultAssets.TN]: /^3P[a-km-zA-HJ-NP-Z1-9]{33}/,
            [WavesApp.defaultAssets.WAVES]: /^3P[a-km-zA-HJ-NP-Z1-9]{33}/,
            [WavesApp.defaultAssets.TUSD]: /^0x[0-9a-f]{40}$/i,
            [WavesApp.defaultAssets.DOGE]: /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}/,
            [WavesApp.defaultAssets.ETHO]: /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}/,
            [WavesApp.defaultAssets.SENT]: /^0x[0-9a-f]{40}$/i
        };

        return Object.keys(VALIDATOR).reduce((result, key) => {
            result[key] = {
                isValidAddress(string) {
                    if (typeof VALIDATOR[key] === 'function') {
                        return VALIDATOR[key](string);
                    } else {
                        return VALIDATOR[key].test(string);
                    }
                }
            };
            return result;
        }, Object.create(null));
    };

    factory.$inject = [
        'waves'
    ];

    angular.module('app.utils').factory('outerBlockchains', factory);
})();

/**
 * @typedef {function} IIsValidAddress
 * @param {string} address
 * @return {boolean}
 */

/**
 * @typedef {Object.<string, IIsValidAddress>} IOuterBlockchains
 */
