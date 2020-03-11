// ------------ @author Daniel de Oliveira -----------------


export interface Map<T> {[prop: string]: T}


export type Mapping<A = any, B = A> = (_: A) => B;


export type Singleton<T> = [T];


export type Pair<A = any, B = A> = [A, B];


export type Left<T = any> = [T, undefined];


export type Right<T = any> = [undefined, T];


export type Either<T1 = any, T2 = any> = Left<T1>|Right<T2>;


export type Just<T> = [T];


export type Nothing = [];


export type Maybe<T> = Nothing | Just<T>;


export type Fallible<T> = Either<any, T> | Maybe<T>;


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