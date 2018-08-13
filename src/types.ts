export type Comparator = <A, B>(_: A) => Predicate<B>;


export type ComparatorProducer = (_: Comparator) => <A>(_: A) => Predicate<A>;


export type Predicate<A> = (_: A) => boolean;


export type PredicateProducer = <A>(_: Predicate<A>) => Predicate<A>;


export type Mapping<A, B> = (_: A) => B;


export type Transformation<T> = (_: T) => T;


export type ArrayTransformation<T> = Transformation<Array<T>>;


export type NestedArray<A> = Array<Array<A>>;


export interface UntypedMap {[prop: string]: any|undefined}


export interface TypedMap<T> {[prop: string]: T}