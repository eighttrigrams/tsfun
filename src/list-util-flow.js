"use strict";
/**
 * @author Daniel de Oliveira
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.flow = function () {
    var fs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fs[_i] = arguments[_i];
    }
    return function (collection) {
        return fs.reduce(function (acc, f) { return f(acc); }, collection);
    };
};
exports.map = function (f) {
    return function (as) { return as.map(f); };
};
exports.filter = function (predicate) {
    return function (as) { return as.filter(predicate); };
};
exports.reverse = function (as) { return as.reverse(); };
//# sourceMappingURL=list-util-flow.js.map