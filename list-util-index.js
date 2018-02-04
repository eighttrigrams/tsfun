"use strict";
/**
 * @author Thomas Kleinke
 * @author Daniel de Oliveira
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAtIndex = function (as, i) { return exports.getAtIndexOr(as, i); };
exports.getAtIndexOr = function (as, i, defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    return as.length < i ? defaultValue : as[i];
};
exports.removeAtIndex = function (as) { return function (i) { return as.splice(i, 1); }; };
