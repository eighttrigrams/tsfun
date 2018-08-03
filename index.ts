export {isNot, sameAs, biggerThan,
    smallerThan, includedIn, differentFrom, even, odd, equalTo,
    onBy, on} from './src/comparators';
export {take, takeRightWhile, takeUntil, takeWhile, takeNth} from './src/arrays/take';
export {dropWhile, drop, dropRight, dropRightWhile} from './src/arrays/drop';
export {flow, flowP} from './src/flow';
export {reverse, flatMap, mapTo} from './src/arrays/coll';
export {
    NestedArray,
    intersection,
    intersectionBy,
    union,
    unionBy,
    intersect,
    intersectBy,
    subtract,
    subtractBy,
    unite,
    uniteBy,
    unique,
    uniqueBy,
    equals
} from './src/arrays/sets';

export {
    subtract as subtractMap,
    intersect as intersectMap,
    unite as uniteMap,
} from './src/maps/sets'


export {copy, isEmpty} from './src/coll';
export {doWhen, isDefined, isUndefined} from './src/core';
export {map, filter} from './src/maps/coll';

export {
    getElForPathIn,
    takeOrMake,
    clone,
    to
} from './src/objects/objects';

/**
 * @author Daniel de Oliveira
 */




