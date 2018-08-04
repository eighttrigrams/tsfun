export {sameAs, includedIn, differentFrom, differentFromBy, equalTo,
    onBy, on, biggerThan, smallerThan} from './src/comparators';
export {isNot, even, odd, isDefined, isUndefined} from './src/predicates'
export {take, takeRightWhile, takeUntil, takeWhile, takeNth} from './src/arrays/list_like_take';
export {dropWhile, drop, dropRight, dropRightWhile} from './src/arrays/list_like_drop';
export {flow, flowP} from './src/flow';
export {reverse, flatMap, mapTo} from './src/arrays/list_like';
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
} from './src/arrays/set_like';

export {
    subtract as subtractMap,
    intersect as intersectMap,
    unite as uniteMap,
} from './src/maps/set_like'


export {copy, isEmpty} from './src/coll';
export {doWhen} from './src/core';
export {map, filter} from './src/maps/coll';

export {
    getElForPathIn,
    takeOrMake,
    clone,
    to
} from './src/objects/core';

/**
 * @author Daniel de Oliveira
 */




