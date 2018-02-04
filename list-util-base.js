"use strict";
/**
 * @author Daniel de Oliveira
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.times = function (l) {
    return function (r) { return l * r; };
};
exports.identical = function (v) { return v; };
exports.includedIn = function (as) {
    return function (a) { return as.includes(a); };
};
exports.differentFrom = function (a) {
    return exports.isNot(exports.sameAs(a));
};
exports.sameAs = function (l) {
    return function (r) { return l == r; };
};
exports.smaller = function (l) {
    return function (r) { return l > r; };
};
exports.bigger = function (l) {
    return function (r) { return l < r; };
};
exports.isNot = function (f) {
    return function (a) { return exports.flip(f(a)); };
};
exports.flip = function (v) { return !v; };
exports.uncurry2 = function (f) {
    return function (as1, as2) { return f(as1)(as2); };
};
