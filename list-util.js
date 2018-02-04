"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_util_base_1 = require("./list-util-base");
exports.isNot = list_util_base_1.isNot;
exports.sameAs = list_util_base_1.sameAs;
exports.bigger = list_util_base_1.bigger;
exports.smaller = list_util_base_1.smaller;
exports.includedIn = list_util_base_1.includedIn;
exports.differentFrom = list_util_base_1.differentFrom;
exports.times = list_util_base_1.times;
var list_util_drop_take_1 = require("./list-util-drop-take");
exports.takeRightWhile = list_util_drop_take_1.takeRightWhile;
exports.dropWhile = list_util_drop_take_1.dropWhile;
exports.takeUntil = list_util_drop_take_1.takeUntil;
exports.takeWhile = list_util_drop_take_1.takeWhile;
var list_util_flow_1 = require("./list-util-flow");
exports.flow = list_util_flow_1.flow;
exports.reverse = list_util_flow_1.reverse;
exports.map = list_util_flow_1.map;
exports.filter = list_util_flow_1.filter;
var list_util_index_1 = require("./list-util-index");
exports.getAtIndex = list_util_index_1.getAtIndex;
exports.getAtIndexOr = list_util_index_1.getAtIndexOr;
exports.removeAtIndex = list_util_index_1.removeAtIndex;
var list_util_sets_1 = require("./list-util-sets");
exports.intersection = list_util_sets_1.intersection;
exports.union = list_util_sets_1.union;
exports.intersect = list_util_sets_1.intersect;
exports.subtract = list_util_sets_1.subtract;
exports.unite = list_util_sets_1.unite;
/**
 * @author Daniel de Oliveira
 */
exports.removeFrom = function (as) { return function (a) {
    return list_util_sets_1.subtract([a])(as);
}; };
exports.addUniqueTo = function (as) { return function (a) {
    return as.includes(a) ? as : as.concat([a]);
}; };
