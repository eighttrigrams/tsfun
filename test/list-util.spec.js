"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_util_sets_1 = require("../src/list-util-sets");
var list_util_base_1 = require("../src/list-util-base");
var list_util_extras_1 = require("../src/list-util-extras");
/**
 * @author Daniel de Oliveira
 */
function main() {
    describe('ListUtil', function () {
        it('intersectWith', function () {
            return expect(list_util_sets_1.intersect([1, 2])([2, 4])).toEqual([2]);
        });
        it('intersect', function () {
            return expect(list_util_sets_1.intersection([[1, 2], [2, 3], [2, 4]])).toEqual([2]);
        });
        it('intersect - no intersection', function () {
            return expect(list_util_sets_1.intersection([[1, 2], [3, 4], [5, 6]])).toEqual([]);
        });
        it('intersect - no intersection where only partial intersection', function () {
            return expect(list_util_sets_1.intersection([[1, 2], [2, 3], [3, 4]])).toEqual([]);
        });
        it('intersect - empty array', function () {
            return expect(list_util_sets_1.intersection([])).toEqual([]);
        });
        it('uniteWith', function () {
            return expect(list_util_sets_1.unite([1, 2])([2, 4])).toEqual([1, 2, 4]);
        });
        it('unite ', function () {
            return expect(list_util_sets_1.union([[1, 2], [3, 4], [2, 4]])).toEqual([1, 2, 3, 4]);
        });
        it('subtract', function () {
            return expect(list_util_sets_1.subtract([3, 4, 5])([1, 2, 3])).toEqual([1, 2]);
        });
        it('subtract - from empty list', function () {
            return expect(list_util_sets_1.subtract([3, 4, 5])([])).toEqual([]);
        });
        it('subtract - empty list', function () {
            expect(list_util_sets_1.subtract([])([1, 2, 3])).toEqual([1, 2, 3]);
        });
        it('subtract - no intersection', function () {
            return expect(list_util_sets_1.subtract([4, 5, 6])([1, 2, 3])).toEqual([1, 2, 3]);
        });
        it('removeFrom', function () {
            return expect(list_util_extras_1.removeFrom([1, 2, 13, 13, 4])(13)).toEqual([1, 2, 4]);
        });
        it('removeFrom - nothing', function () {
            return expect(list_util_extras_1.removeFrom([1, 2, 7, 4])(13)).toEqual([1, 2, 7, 4]);
        });
        it('removeFrom - everything', function () {
            return expect(list_util_extras_1.removeFrom([1, 1])(1)).toEqual([]);
        });
        it('times', function () {
            return expect(list_util_base_1.times(2)(2)).toEqual(4);
        });
    });
}
exports.main = main;
//# sourceMappingURL=list-util.spec.js.map