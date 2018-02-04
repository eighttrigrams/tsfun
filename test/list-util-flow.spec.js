"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_util_flow_1 = require("../src/list-util-flow");
var list_util_drop_take_1 = require("../src/list-util-drop-take");
var list_util_base_1 = require("../src/list-util-base");
var list_util_sets_1 = require("../src/list-util-sets");
/**
 * @author Daniel de Oliveira
 */
function main() {
    describe('ListUtil/Flow -- ', function () {
        it('flow', function () {
            return expect(list_util_flow_1.flow(list_util_drop_take_1.takeWhile(list_util_base_1.bigger(4)), list_util_flow_1.map(list_util_base_1.times(2)), list_util_flow_1.filter(list_util_base_1.smaller(16)), list_util_flow_1.filter(list_util_base_1.differentFrom(12)), list_util_flow_1.filter(list_util_base_1.includedIn([14])))([5, 6, 7, 8, 4, 16, 5])).toEqual([14]);
        });
        it('map', function () {
            return expect(list_util_flow_1.map(list_util_base_1.times(2))([2, 4])).toEqual(([4, 8]));
        });
        it('filter', function () {
            return expect(list_util_flow_1.filter(list_util_base_1.smaller(4))([2, 4, 1, 5, 7, 8, 2, 1, 0])).toEqual(([2, 1, 2, 1, 0]));
        });
        it('reverse ', function () {
            return expect(list_util_flow_1.reverse([1, 3])).toEqual(([3, 1]));
        });
        it('intersect', function () {
            return expect(list_util_flow_1.flow(list_util_sets_1.intersection, list_util_flow_1.map(list_util_base_1.times(2)))([[1, 2], [2, 3]])).toEqual([4]);
        });
        it('uniteWith', function () {
            return expect(list_util_flow_1.flow(list_util_sets_1.unite([1, 2]), list_util_flow_1.map(list_util_base_1.times(2)))([2, 4])).toEqual([2, 4, 8]);
        });
        it('unite', function () {
            return expect(list_util_flow_1.flow(list_util_sets_1.union, list_util_flow_1.map(list_util_base_1.times(2)))([[1, 2], [3, 4], [2, 4]])).toEqual([2, 4, 6, 8]);
        });
        it('subtract', function () {
            return expect(list_util_flow_1.flow(list_util_sets_1.subtract([3, 4, 5]), list_util_flow_1.filter(list_util_base_1.smaller(2)))([1, 2, 3])).toEqual([1]);
        });
        it('reverse', function () {
            return expect(list_util_flow_1.flow(list_util_flow_1.reverse)([1, 3])).toEqual(([3, 1]));
        });
        it('takeWhile', function () {
            return expect(list_util_flow_1.flow(list_util_drop_take_1.takeWhile(list_util_base_1.smaller(20)), list_util_flow_1.filter(list_util_base_1.bigger(13)))([13, 17, 20])).toEqual([17]);
        });
        it('takeRightWhile', function () {
            return expect(list_util_flow_1.flow(list_util_drop_take_1.takeRightWhile(list_util_base_1.bigger(20)), list_util_flow_1.filter(list_util_base_1.bigger(21)))([13, 22, 21])).toEqual([22]);
        });
        it('dropWhile', function () {
            return expect(list_util_flow_1.flow(list_util_drop_take_1.dropWhile(list_util_base_1.smaller(20)), list_util_flow_1.reverse)([7, 9, 10, 13, 21, 20])).toEqual([20, 21]);
        });
    });
}
exports.main = main;
//# sourceMappingURL=list-util-flow.spec.js.map