"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_util_base_1 = require("./list-util-base");
/**
 * @author Daniel de Oliveira
 */
exports.take = function (n) {
    return function (as) {
        return n < 0 ? [] :
            as.reduce(function (acc, val, i) {
                return i < n ? acc.concat([val]) : acc;
            }, []);
    };
};
exports.takeWhile = function (predicate) {
    return function (as) {
        var go = true;
        return as.reduce(function (acc, a) {
            return go && predicate(a) ? acc.concat([a]) : (go = false, acc);
        }, []);
    };
};
exports.takeRightWhile = function (predicate) {
    return function (as) {
        var go = true;
        return as.reduceRight(function (acc, a) {
            return go && predicate(a) ? [a].concat(acc) : (go = false, acc);
        }, []);
    };
};
exports.takeUntil = function (predicate) {
    return function (as) {
        var found = as.find(predicate);
        return found ?
            exports.takeWhile(list_util_base_1.isNot(predicate))(as).concat([found])
            : as;
    };
};
exports.dropWhile = function (predicate) {
    return function (as) {
        var go = false;
        return as.reduce(function (acc, a) {
            return go || !predicate(a) ? (go = true, acc.concat([a])) : acc;
        }, []);
    };
};
//# sourceMappingURL=list-util-drop-take.js.map