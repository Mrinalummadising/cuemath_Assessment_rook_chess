 <h1> A Rooks Move Game with Socket.IO </h1>
  <p> </p>This is a simple chess game built using Node.js and Socket.IO for real-time communication between players. Players can join the game, move pieces on the board, and a timer is implemented to enforce time limits for each player's turn. </p>

 <h2> Features </h2>
   <ul> 
       <li> Real-time multiplayer chess game </li>
 <li>Player can join the game </li>
<li> Move pieces on the chessboard </li>
<li> Timer for each player's turn </li>
<li> Winner detection when a player reaches the bottom-left corner of the board </li>
   </ul>
 <h2> Requirements </h2>
 <li> Node.js installed on your machine </li>
 <hr/>
<h2> Installation </h2>
 <p> 1. Clone this repository to your local machine: </p>
<ul>
<li> git clone <repository_url> </li>
 <li> Navigate to the project directory: cd node-rook-move </li>
<li> Install dependencies: npm install </li>
<li> Start the server: npm atart </li>
</ul>
<hr/>
About
cuemath-assignment-kk.vercel.app
Resources
 Readme
 Activity
Stars
 0 stars
Watchers
 1 watching
Forks
 0 forks
Report repository
Releases
No releases published
Packages
No packages published
Deployments
2
 Production 14 minutes ago
Languages
JavaScript
92.6%
 
HTML
7.4%
Footer
© 2024 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Cont

# json-ext

[![NPM version](https://img.shields.io/npm/v/@discoveryjs/json-ext.svg)](https://www.npmjs.com/package/@discoveryjs/json-ext)
[![Build Status](https://github.com/discoveryjs/json-ext/actions/workflows/ci.yml/badge.svg)](https://github.com/discoveryjs/json-ext/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/discoveryjs/json-ext/badge.svg?branch=master)](https://coveralls.io/github/discoveryjs/json-ext?)
[![NPM Downloads](https://img.shields.io/npm/dm/@discoveryjs/json-ext.svg)](https://www.npmjs.com/package/@discoveryjs/json-ext)

A set of utilities that extend the use of JSON. Designed to be fast and memory efficient

Features:

- [x] `parseChunked()` – Parse JSON that comes by chunks (e.g. FS readable stream or fetch response stream)
- [x] `stringifyStream()` – Stringify stream (Node.js)
- [x] `stringifyInfo()` – Get estimated size and other facts of JSON.stringify() without converting a value to string
- [ ] **TBD** Support for circular references
- [ ] **TBD** Binary representation [branch](https://github.com/discoveryjs/json-ext/tree/binary)
- [ ] **TBD** WHATWG [Streams](https://streams.spec.whatwg.org/) support

## Install

```bash
npm install @discoveryjs/json-ext
```

## API

- [parseChunked(chunkEmitter)](#parsechunkedchunkemitter)
- [stringifyStream(value[, replacer[, space]])](#stringifystreamvalue-replacer-space)
- [stringifyInfo(value[, replacer[, space[, options]]])](#stringifyinfovalue-replacer-space-options)
    - [Options](#options)
        - [async](#async)
        - [continueOnCircular](#continueoncircular)
- [version](#version)

> NOTE: `reviver` parameter is not supported yet, but will be added in next releases.
> NOTE: WHATWG streams aren't supported yet

When to use:
- It's required to avoid freezing the main thread during big JSON parsing, since this process can be distributed in time
- Huge JSON needs to be parsed (e.g. >500MB on Node.js)
- Needed to reduce memory pressure. `JSON.parse()` needs to receive the entire JSON before parsing it. With `parseChunked()` you may parse JSON as first bytes of it comes. This approach helps to avoid storing a huge string in the memory at a single time point and following GC.


### stringifyStream(value[, replacer[, space]])

Works the same as [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify), but returns an instance of [`ReadableStream`](https://nodejs.org/dist/latest-v14.x/docs/api/stream.html#stream_readable_streams) instead of string.

> NOTE: WHATWG Streams aren't supported yet, so function available for Node.js only for now

Departs from JSON.stringify():
- Outputs `null` when `JSON.stringify()` returns `undefined` (since streams may not emit `undefined`)
- A promise is resolving and the resulting value is stringifying as a regular one
- A stream in non-object mode is piping to output as is
- A stream in object mode is piping to output as an array of objects

When to use:
- Huge JSON needs to be generated (e.g. >500MB on Node.js)
- Needed to reduce memory pressure. `JSON.stringify()` needs to generate the entire JSON before send or write it to somewhere. With `stringifyStream()` you may send a result to somewhere as first bytes of the result appears. This approach helps to avoid storing a huge string in the memory at a single time point.
- The object being serialized contains Promises or Streams (see Usage for examples)

[Benchmark](https://github.com/discoveryjs/json-ext/tree/master/benchmarks#stream-stringifying)


#### Options

##### async

Type: `Boolean`  
Default: `false`

Collect async values (promises and streams) or not.

##### continueOnCircular

Type: `Boolean`  
Default: `false`

Stop collecting info for a value or not whenever circular reference is found. Setting option to `true` allows to find all circular references.

### version

The version of library, e.g. `"0.3.1"`.
