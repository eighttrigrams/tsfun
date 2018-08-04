# Data Structures and Collections

First of all we should begin with a quick clarification on what we mean with the term 
`object` in tsfun. `tsfun` makes a general distinction between 3 classes of data structures,
namely `object`, `map` and `array`. When we talk about arrays it refers to the usual javascript
Arrays. When we talk about `map`, we treat a javascript `Object` or a `Map` as a simple collection.
We talk about about tsfun `object`s in contexts where we care about a composed data structure, like
for example `{a: {b: [1, 2, 4], c: 'e'}`.