# OPS.js [![Build Status](https://travis-ci.org/openphacts/ops.js.svg?branch=develop)](https://travis-ci.org/openphacts/ops.js) [![DOI](https://zenodo.org/badge/doi/10.5281/zenodo.21004.svg)](http://dx.doi.org/10.5281/zenodo.21004)

## Open PHACTS API Version

1.5

## About
OPS.js is a javascript NodeJS based library for accessing the Open PHACTS Linked Data API (LDA). It uses [nets](https://www.npmjs.com/package/nets) to handle the asynchronous network calls. OPS.js can also be used to parse responses from the LDA.
Please read the [API documentation](http://openphacts.github.io/ops.js "OPS.js API documentation"). The API documentation is also available locally within the `docs` folder. To view them open the `docs/index.html` file in a browser.
 
## Dependencies & requirements
[NodeJS](https://nodejs.org/), [NPM](https://www.npmjs.com/), [nets](https://www.npmjs.com/package/nets), [JSDoc](https://www.npmjs.com/package/jsdoc) & [browserify](https://www.npmjs.com/package/browserify)
Get your Open PHACTS API application ID and key by registering at https://dev.openphacts.org

## Licence
The OPS.js source code is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

## Contributing  
We love receiving patches for bug fixes and new features. Please follow these simple steps to make our lives easier.  

1. Fork the project.
2. Checkout develop branch.
3. Create a new branch based on develop and change the code.
4. Write some tests.
5. Submit patch.

## Citations  
To cite OPS.js in publications please use:  

>Ian Dunlop. OPS.js. 6.0.1. Javascript library for accessing the Open PHACTS Linked Data API. University of Manchester. http://github.com/openphacts/ops.js

Bibtex:

>@Manual{,  
>title = {OPS.js 6.0.1: Javascript library for accessing the Open PHACTS Linked Data API},  
>author = {{Ian Dunlop}},  
>organization = {School of Computer Science},  
>address = {University of Manchester, United Kingdom},  
>year = 2015,  
>url = {http://github.com/openphacts/ops.js}  
>} 

You can also load OPS.js in to a browser (or Node) and enter the following console command:

`new Version().information()`

## Using the library
If running in a browser based application use `src/combined.js`. With NodeJS use `npm install ops.js`.  
See the [API documentation](http://openphacts.github.io/ops.js "OPS.js API documentation")  

Each API call generally has 1 method to fetch the results using an asynchronous call with a callback and then another method to parse these results.
Look at https://dev.openphacts.org for more information about the source methods that the API calls use.

## Testing the library

[Jasmine](http://pivotal.github.io/jasmine/ "Jasmine javascript testing framework") is used to test the ops.js api. There are various test runners which can be used, they
are contained within the 'test' directory with the specs for the tests in the 'test/spec' directory. To run them us jasmine-node like this:

jasmine-node --config app_id your_app_id --config app_key your_app_key --config app_url https://beta.openphacts.org/1.4 test/spec/integration/

## API call examples:

More examples can be found in the integration tests and in the [API docs](http://openphacts.github.io/ops.js "OPS.js API documentation").

### Concept Wiki free text search

```javascript
var searcher = new ConceptWikiSearch("https://beta.openphacts.org/1.5", appID, appKey);  
var callback=function(success, status, response){  
    searcher.parseResponse(response);
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// limit to 20 results, species human (branch 4), with type set to compounds (uuid 07a800....)  
searcher.byTag('Aspirin', '20', '4', '07a84994-e464-4bbf-812a-a4b96fa3d197', callback);
```
```
### Compound information

```javascript
var searcher = new CompoundSearch("https://beta.openphacts.org/1.5", appID, appKey);  
var callback=function(success, status, response){  
    var compoundResult = searcher.parseCompoundResponse(response);  
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// compound uri is for Aspirin  
searcher.fetchCompound('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, callback);
```

## Core Developers
[Ian Dunlop](https://github.com/ianwdunlop "Ian Dunlop - original developer")

## Contributors
[Rishi Ramgolam](https://github.com/rishiramgolam "rishiramgolam")  
[Elblood](https://github.com/Elblood "Elblood")  
[Andra Waagmeester](https://github.com/andrawaag "andraawag")  
[Egon Willighagen](https://github.com/egonw "egonw")  
[PANDORINO](https://github.com/PANDORINO "PANDORINO")  
[Stian Soiland-Reyes](https://github.com/stain "stain")
