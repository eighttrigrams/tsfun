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


export type Singleton<T> = [T];


export type Pair<A,B> = [A, B];


export type Either<T1, T2> = [T1, undefined]|[undefined, T2];


export type Maybe<T> = [] | [T];


// see https://stackoverflow.com/questions/49910889/typescript-array-with-minimum-length
// for a discussion
// TODO remove
type ArrayMinLength1<T> = {
    0: T
} & Array<T>


export type ObjectSet = UntypedObjectCollection;


export type ArrayList<T> = Array<T>;


export type ArraySet<T> = Array<T>;


export type ObjectStruct = Object;


export type AsyncPredicate<A> = (_: A) => Promise<boolean>;