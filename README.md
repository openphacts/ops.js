# OPS.js [![Build Status](https://travis-ci.org/openphacts/ops.js.svg?branch=develop)](https://travis-ci.org/openphacts/ops.js) [![DOI](https://zenodo.org/badge/doi/10.5281/zenodo.13044.svg)](http://dx.doi.org/10.5281/zenodo.13044)

## Open PHACTS API Version

1.4

## About
OPS.js is a javascript based library for accessing the Open PHACTS Linked Data API (LDA). It uses jquery to handle the asynchronous nature of the requests. OPS.js can also be used to parse responses from the LDA.
Please read the [API documentation](http://openphacts.github.io/ops.js "OPS.js API documentation").
 
## Dependencies
JQuery 1.9.1  
[Purl 2.2.1 (Used during testing only)](https://github.com/allmarkedup/jQuery-URL-Parser "Purl URL library")  
Get your openphacts api appID and appKey by registering at https://dev.openphacts.org

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

>Ian Dunlop. OPS.js. 4.0.0. Javascript library for accessing the Open PHACTS Linked Data API. University of Manchester. http://github.com/openphacts/ops.js

Bibtex:

>@Manual{,  
>title = {OPS.js 4.0.0: Javascript library for accessing the Open PHACTS Linked Data API},  
>author = {{Ian Dunlop}},  
>organization = {School of Computer Science},  
>address = {University of Manchester, United Kingdom},  
>year = 2014,  
>url = {http://github.com/openphacts/ops.js}  
>} 

Or load OPS.js in to a browser (or Node) and enter the following console command:

`new Openphacts.Version().information()`

## Using the library
See the [API documentation](http://openphacts.github.io/ops.js "OPS.js API documentation")  

JQuery must be loaded before the OPS.js library.  

Most API calls follow the pattern of request results with one asynchronous call with a callback and then parse the results with another.
Look at https://dev.openphacts.org for more information about the source methods that the API calls use.

## Testing the library

[Jasmine](http://pivotal.github.io/jasmine/ "Jasmine javascript testing framework") is used to test the ops.js api. There are various test runners which can be used, they
are contained within the 'test' directory with the specs for the tests in the 'test/spec' directory. FunctionalTests.html and IntegrationTests.html should be run within a browser.

`file:///path_to_ops.js/test/FunctionalTests.html?app_id=sdfsdf&app_key=sdfsdfsdf&app_url=https://beta.openphacts.org/1.4`

Use the appropriate values for `app_id`, `app_key` & `app_url`

PhantomIntegrationTests.html and PhantomFunctionalTests.html use [phantomjs](http://phantomjs.org "PhanotmJS headless web browser"), a headless web browser, and
can be run from the command line with  

`phantomjs test/spec/phantomjs_jasminexml_runner.js test/PhantomFunctionalTests.html app_id app_key api_url test_results_output_dir`

substitute `app_id`, `app_key`, `app_url` and `test_results_output_dir` for the appropriate values. You may also need to install phantomjs on your machine.

## API call examples:

More examples can be found in the integration tests.

### Concept Wiki free text search

```javascript
var searcher = new Openphacts.ConceptWikiSearch("https://beta.openphacts.org/1.4", appID, appKey);  
var callback=function(success, status, response){  
    searcher.parseResponse(response);
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// limit to 20 results, species human (branch 4), with type set to compounds (uuid 07a800....)  
searcher.byTag('Aspirin', '20', '4', '07a84994-e464-4bbf-812a-a4b96fa3d197', callback);
```
### Concept Wiki compound search

```javascript
var searcher = new Openphacts.ConceptWikiSearch("https://beta.openphacts.org/1.4", appID, appKey);  
var callback=function(success, status, response){  
    searcher.parseResponse(response);
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// limit to 20 results, species human (branch 4), no uri for the type is required  
searcher.findCompounds('Aspirin', '20', '4', callback);
```
### Compound information

```javascript
var searcher = new Openphacts.CompoundSearch("https://beta.openphacts.org/1.4", appID, appKey);  
var callback=function(success, status, response){  
    var compoundResult = searcher.parseCompoundResponse(response);  
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// compound uri is for Aspirin  
searcher.fetchCompound('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, callback);
```
### Compound Pharmacology

```javascript
var searcher = new Openphacts.CompoundSearch("https://beta.openphacts.org/1.4", appID, appKey);  
var callback=function(success, status, response){  
    var compoundResult = searcher.parseCompoundPharmacologyResponse(response);  
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// compound uri is for Aspirin, page 1, 20 results per page  
searcher.compoundPharmacology('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, 20, null, null, callback);
```
### Compound Pharmacology Count

```javascript
var searcher = new Openphacts.CompoundSearch("https://beta.openphacts.org/1.4", appID, appKey);  
var callback=function(success, status, response){  
    var result = searcher.parseCompoundPharmacologyCountResponse(response);  
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// compound uri is for Aspirin  
searcher.compoundPharmacologyCount('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, callback);
```

### Exact Structure Search

```javascript
var searcher = new Openphacts.StructureSearch("https://beta.openphacts.org/1.4", appID, appKey);  
var callback=function(success, status, response){  
    var result = searcher.parseExactResponse(response);  
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// only a SMILES and match type has been provided, no limit, start or length  
searcher.exact('CNC(=O)c1cc(ccn1)Oc2ccc(cc2)NC(=O)Nc3ccc(c(c3)C(F)(F)F)Cl', 0, callback);
```

## Core Developers
[Ian Dunlop](https://github.com/ianwdunlop "Ian Dunlop - original developer")

## Contributors
[Rishi Ramgolam](https://github.com/rishiramgolam "rishiramgolam")  
[Elblood](https://github.com/Elblood "Elblood")  
[Andra Waagmeester](https://github.com/andrawaag "andraawag")
