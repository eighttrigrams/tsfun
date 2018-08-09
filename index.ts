export {
    arrayEquivalent,
    arrayEquivalentBy,
    objectEquivalent,
    tripleEqual,
    includedIn,
    differentFrom,
    differentFromBy,
    jsonEqual,
    onBy,
    on,
    biggerThan,
    smallerThan,
    sameOn
} from './src/comparators';
export {isNot, even, odd, isDefined, isUndefined} from './src/predicates';
export {take, takeRightWhile, takeUntil, takeWhile, takeNth} from './src/arrays/list_like_take';
export {dropWhile, drop, dropRight, dropRightWhile} from './src/arrays/list_like_drop';
export {flow, flowP} from './src/flow';
export {reverse, flatMap, mapTo, filter, map} from './src/arrays/list_like';
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
    duplicates
} from './src/arrays/set_like';

export {
    subtractMap,
    intersectMap,
    uniteMap,
    unionMap
    // intersectionMap TODO implement
} from './src/maps/set_like'
export {
    mapMap,
    filterMap,
} from './src/maps/list_like'


export {copy, isUndefinedOrEmpty, isEmpty} from './src/coll';
export {doWhen} from './src/core';

export {
    getElForPathIn,
    takeOrMake,
    clone,
    to,
    option
} from './src/objects/core';

// TODO add pipe method
// TODO add more powerful object comparison
// TODO add filter(or(on('name:'))('a', 'b'))
//       or filter(on('name')(or('a','b'))

/**
 * @author Daniel de Oliveira
 */




// const docsToCorrect = (await this.findAllLiesWithinDocs(document.resource.id))
// .filter(on('resource.relations.isRecordedIn')(isDefined))
//     .filter(doc => {
//         return doc.resource.relations['isRecordedIn'].length > 0
//     })
//     .filter(isNot(on('resource.relations.isRecordedIn')(document)));

// TODO make version of flow which works on a certain path
// using 'on' on every transformation


