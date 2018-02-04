"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_util_base_1 = require("./list-util-base");
exports.intersection = function (aas) {
    return aas.length < 1 ? [] :
        aas.reduce(list_util_base_1.uncurry2(exports.intersect));
};
exports.union = function (aas) {
    return aas.length < 1 ? [] :
        aas.reduce(function (acc, val) { return val ? exports.unite(acc)(val) : acc; });
};
exports.intersect = function (as1) {
    return function (as2) { return as1.filter(list_util_base_1.includedIn(as2)); };
};
/**
 * Generate a new list with elements which are contained in l but not in subtrahend
 */
exports.subtract = function (subtrahend) {
    return function (as) {
        return as.filter(list_util_base_1.isNot(list_util_base_1.includedIn(subtrahend)));
    };
};
/**
 * @returns the union of a1 and a2
 */
exports.unite = function (as1) {
    return function (as2) {
        return as1.concat(as2.filter(list_util_base_1.isNot(list_util_base_1.includedIn(as1))));
    };
};
