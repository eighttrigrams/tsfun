// ------------ @author Daniel de Oliveira -----------------


export type Comparator = <A, B>(_: A) => Predicate<B>;


export type ComparatorProducer = (_: Comparator) => Comparator;


export type Predicate<A> = (_: A) => boolean;


export type PredicateProducer = <A>(_: Predicate<A>) => Predicate<A>;


export type AsyncPredicate<A> = (_: A) => Promise<boolean>;


export type Mapping<A, B> = (_: A) => B;


export type SimpleTransformation<T> = (_: T) => T;


export type Transformation<T1, T2> = (_: T1) => T2;


export type ArrayTransformation<T1, T2> = Transformation<Array<T1>, Array<T2>>;


export type NestedArray<A> = Array<Array<A>>;


export interface UntypedObjectCollection {[prop: string]: any|undefined}


export interface ObjectCollection<T> {[prop: string]: T}


export type ObjectSet = UntypedObjectCollection;


export type Pair<A> = [A, A];


export type Either<T1, T2> = [T1, undefined]|[undefined, T2];


export type ArrayList<T> = Array<T>;


export type ArraySet<T> = Array<T>;


export type ObjectStruct = Object;