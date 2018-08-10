# tsfun - Data Structures and Collections

First of all we should begin with a quick clarification on some terminology 
used in **tsfun**. tsfun makes a general distinction between 3 classes of 
data structures, namely Object, Map and Array. When we are refering to them in the
docs, it is when they are written like shown, with capital letter and normal font.
Whenever we talk about javascript entities, we highlight the terms as code, like
for instance, `object`, `{}`, `Object`, `Map` and `Array`.  

#### Arrays

When we talk about Arrays it refers to the usual javascript `Array`. 
Our typical method to determine an Array is `as instanceof Array`.

We have different sets of functions to treat Arrays as either 
linear vector or list like collections or as set like collections.

#### Maps

When we talk about Maps, we treat a 
javascript `{}`, `Object` or a `Map` as a simple collection.

TODO check if we can type this explicitely

#### Objects

We talk about about tsfun Objects in contexts where we 
care about a composed data structure, like
for example `{a: {b: [1, 2, 4], c: 'e'}`.

Our method to determine if we have an object is `o.constructor === Object` 
which allows `{}` or `Object` but excludes for example instances of `Map` or `Date`.