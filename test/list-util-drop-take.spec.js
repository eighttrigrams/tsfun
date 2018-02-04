"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_util_drop_take_1 = require("../src/list-util-drop-take");
var list_util_base_1 = require("../src/list-util-base");
/**
 * @author Daniel de Oliveira
 */
function main() {
    describe('ListUtil/DropTake --', function () {
        it('take - 5', function () {
            return expect(list_util_drop_take_1.take(5)([1, 2, 7, 7, 8, 9, 11])).toEqual([1, 2, 7, 7, 8]);
        });
        it('take - 0', function () {
            return expect(list_util_drop_take_1.take(0)([1, 2, 7, 7, 8, 9, 11])).toEqual([]);
        });
        it('take - more', function () {
            return expect(list_util_drop_take_1.take(3)([1, 2])).toEqual([1, 2]);
        });
        it('take - from empty', function () {
            return expect(list_util_drop_take_1.take(3)([])).toEqual([]);
        });
        it('take - negative n', function () {
            return expect(list_util_drop_take_1.take(-1)([1, 2])).toEqual([]);
        });
        it('takeWhile - take five', function () {
            return expect(list_util_drop_take_1.takeWhile(list_util_base_1.smaller(20))([7, 9, 10, 13, 17, 20])).toEqual([7, 9, 10, 13, 17]);
        });
        it('takeWhile - take none', function () {
            return expect(list_util_drop_take_1.takeWhile(list_util_base_1.bigger(23))([7, 9, 10, 13, 17, 20])).toEqual([]);
        });
        it('takeWhile - take all', function () {
            return expect(list_util_drop_take_1.takeWhile(list_util_base_1.bigger(1))([7, 9])).toEqual([7, 9]);
        });
        it('takeWhile - empty', function () {
            return expect(list_util_drop_take_1.takeWhile(list_util_base_1.bigger(23))([])).toEqual([]);
        });
        it('takeRightWhile - take five', function () {
            return expect(list_util_drop_take_1.takeRightWhile(list_util_base_1.bigger(13))([7, 9, 10, 13, 17, 20])).toEqual([17, 20]);
        });
        it('takeRightWhile - take none', function () {
            return expect(list_util_drop_take_1.takeRightWhile(list_util_base_1.bigger(23))([7, 9, 10, 13, 17, 20])).toEqual([]);
        });
        it('takeRightWhile - take all', function () {
            return expect(list_util_drop_take_1.takeRightWhile(list_util_base_1.bigger(1))([7, 9])).toEqual([7, 9]);
        });
        it('takeRightWhile - empty', function () {
            return expect(list_util_drop_take_1.takeRightWhile(list_util_base_1.bigger(23))([])).toEqual([]);
        });
        it('takeUntil - take two', function () {
            expect(list_util_drop_take_1.takeUntil(list_util_base_1.bigger(7))([7, 9, 11])).toEqual([7, 9]);
        });
        it('takeUntil - take all', function () {
            return expect(list_util_drop_take_1.takeUntil(list_util_base_1.bigger(13))([7, 9, 11])).toEqual([7, 9, 11]);
        });
        it('takeUntil - empty', function () {
            return expect(list_util_drop_take_1.takeUntil(list_util_base_1.bigger(13))([])).toEqual([]);
        });
        it('dropWhile - drop five', function () {
            return expect(list_util_drop_take_1.dropWhile(list_util_base_1.smaller(20))([7, 9, 10, 13, 21, 20])).toEqual([21, 20]);
        });
        it('dropWhile - drop none', function () {
            return expect(list_util_drop_take_1.dropWhile(list_util_base_1.smaller(5))([7, 9, 10, 13, 21, 20])).toEqual([7, 9, 10, 13, 21, 20]);
        });
        it('dropWhile - empty', function () {
            return expect(list_util_drop_take_1.dropWhile(list_util_base_1.smaller(20))([])).toEqual([]);
        });
    });
}
exports.main = main;
//# sourceMappingURL=list-util-drop-take.spec.js.map