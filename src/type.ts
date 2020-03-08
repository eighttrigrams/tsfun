// ------------ @author Daniel de Oliveira -----------------


export interface Map<T> {[prop: string]: T} // same as ObjectCollection


export type Singleton<T> = [T];


export type Pair<A,B> = [A, B];


export type Either<T1, T2> = [T1, undefined]|[undefined, T2];


export type Maybe<T> = [] | [T];


export type Associative<T = any> = Map<T> | Array<T>;


export type List<T = any> = Array<T> | string;


export type Collection<T = any> = Associative<T> | List<T>;


export type Predicate<A> = (_: A) => boolean;


export type Comparator = <A, B>(_: A) => Predicate<B>;





export type ComparatorProducer = (_: Comparator) => Comparator;


export type PredicateProducer = <A>(_: Predicate<A>) => Predicate<A>;


// see https://stackoverflow.com/questions/49910889/typescript-array-with-minimum-length
// for a discussion
// TODO remove
type ArrayMinLength1<T> = {
    0: T
} & Array<T>