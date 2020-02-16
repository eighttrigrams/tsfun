// ------------ @author Daniel de Oliveira -----------------


export type SimpleTransformation<T> = (_: T) => T;


export type NestedArray<A> = Array<Array<A>>;


export interface UntypedObjectCollection {[prop: string]: any|undefined}


export interface ObjectCollection<T> {[prop: string]: T}


export interface ObjectMap<T> {[prop: string]: T} // same as ObjectCollection


export type Associative<T> = ObjectCollection<T> | Array<T>;


export type Comparator = <A, B>(_: A) => Predicate<B>;


export type ComparatorProducer = (_: Comparator) => Comparator;


export type Predicate<A> = (_: A) => boolean;


export type PredicateProducer = <A>(_: Predicate<A>) => Predicate<A>;


export type ObjectSet = UntypedObjectCollection;


export type Pair<A,B> = [A, B];


// see https://stackoverflow.com/questions/49910889/typescript-array-with-minimum-length
// for a discussion
export type ArrayMinLength1<T> = {
    0: T
} & Array<T>


export type Either<T1, T2> = [T1, undefined]|[undefined, T2];


export type ArrayList<T> = Array<T>;


export type ArraySet<T> = Array<T>;


export type ObjectStruct = Object;