"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_util_sets_1 = require("./list-util-sets");
/**
 * @author Daniel de Oliveira
 */
exports.removeFrom = function (as) { return function (a) {
    return list_util_sets_1.subtract([a])(as);
}; };
exports.addUniqueTo = function (as) { return function (a) {
    return as.includes(a) ? as : as.concat([a]);
}; };
//# sourceMappingURL=list-util-extras.js.map