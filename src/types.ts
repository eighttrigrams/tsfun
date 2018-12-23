export type Comparator = <A, B>(_: A) => Predicate<B>;


export type ComparatorProducer = (_: Comparator) => <A>(_: A) => Predicate<A>;


export type Predicate<A> = (_: A) => boolean;


export type PredicateProducer = <A>(_: Predicate<A>) => Predicate<A>;


export type Mapping<A, B> = (_: A) => B;


export type Transformation<T> = (_: T) => T;


export type ArrayTransformation<T> = Transformation<Array<T>>;


export type NestedArray<A> = Array<Array<A>>;


export interface UntypedObjectCollection {[prop: string]: any|undefined}


export interface ObjectCollection<T> {[prop: string]: T}


export type ObjectSet = UntypedObjectCollection;


export type Pair<A> = [A, A];


export type ArrayList<T> = Array<T>;


export type ArraySet<T> = Array<T>;


export type ObjectStruct = Object;