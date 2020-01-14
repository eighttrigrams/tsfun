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


export type Pair<A> = [A, A];


export type Either<T1, T2> = [T1, undefined]|[undefined, T2];


export type ArrayList<T> = Array<T>;


export type ArraySet<T> = Array<T>;


export type ObjectStruct = Object;