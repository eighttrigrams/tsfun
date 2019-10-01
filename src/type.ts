// ------------ @author Daniel de Oliveira -----------------


export type SimpleTransformation<T> = (_: T) => T;


export type NestedArray<A> = Array<Array<A>>;


export interface UntypedObjectCollection {[prop: string]: any|undefined}


export interface ObjectCollection<T> {[prop: string]: T}


export interface ObjectMap<T> {[prop: string]: T} // same as ObjectCollection


export type ObjectStruct = Object;