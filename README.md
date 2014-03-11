# OPS.js
## Coded against OPS Linked Data API Version 1.3

OPS.js is a javascript based library for accessing the Open PHACTS Linked Data API (LDA). It uses jquery to handle the asynchronous nature of the requests. OPS.js can also be used to parse responses from the LDA.

## Dependencies
JQuery 1.9.1  
[Purl 2.2.1](https://github.com/allmarkedup/jQuery-URL-Parser "Purl URL library")  
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

>Ian Dunlop. OPS.js. 2.0.1. Javascript library for accessing the Open PHACTS Linked Data API. University of Manchester. http://github.com/openphacts/ops.js

Bibtex:

>@Manual{,  
>title = {OPS.js 2.0.1: Javascript library for accessing the Open PHACTS Linked Data API},  
>author = {{Ian Dunlop}},  
>organization = {School of Computer Science},  
>address = {University of Manchester, United Kingdom},  
>year = 2013,  
>url = {http://github.com/openphacts/ops.js}  
>} 

Or load OPS.js in to a browser (or Node) and enter the following console command:

`new Openphacts.Version().information()`

## Using the library
JQuery must be loaded before the OPS.js library.  

Most API calls follow the pattern of request results with one asynchronous call with a callback and then parse the results with another.
Look at https://dev.openphacts.org for more information about the source methods that the API calls use.

## Testing the library

[Jasmine](http://pivotal.github.io/jasmine/ "Jasmine javascript testing framework") is used to test the ops.js api. There are various test runners which can be used, they
are contained within the 'test' directory with the specs for the tests in the 'test/spec' directory. FunctionalTests.html and IntegrationTests.html should be run within a browser.

`file:///path_to_ops.js/test/FunctionalTests.html?app_id=sdfsdf&app_key=sdfsdfsdf&app_url=https://beta.openphacts.org/1.3`

Use the appropriate values for `app_id`, `app_key` & `app_url`

PhantomIntegrationTests.html and PhantomFunctionalTests.html use [phantomjs](http://phantomjs.org "PhanotmJS headless web browser"), a headless web browser, and
can be run from the command line with  

`phantomjs test/spec/phantomjs_jasminexml_runner.js test/PhantomFunctionalTests.html app_id app_key api_url test_results_output_dir`

substitute `app_id`, `app_key`, `app_url` and `test_results_output_dir` for the appropriate values. You may also need to install phantomjs on your machine.

## API call examples:

### Concept Wiki free text search

```javascript
var searcher = new Openphacts.ConceptWikiSearch("https://beta.openphacts.org/1.3", appID, appKey);  
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
var searcher = new Openphacts.ConceptWikiSearch("https://beta.openphacts.org/1.3", appID, appKey);  
var callback=function(success, status, response){  
    searcher.parseResponse(response);
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// limit to 20 results, species human (branch 4), no uri for the type is required  
searcher.findCompounds('Aspirin', '20', '4', callback);
```
### Concept Wiki target search

```javascript
var searcher = new Openphacts.ConceptWikiSearch("https://beta.openphacts.org/1.3", appID, appKey);  
var callback=function(success, status, response){  
    searcher.parseResponse(response);
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// limit to 20 results, swissprot results (branch 3), no uri for the type is required  
searcher.findTargets('PDE5', '20', '3', callback);
```
### Concept Wiki find single concept

```javascript
var searcher = new Openphacts.ConceptWikiSearch("https://beta.openphacts.org/1.3", appID, appKey);  
var callback=function(success, status, response){  
    searcher.parseFindConceptResponse(response);
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// search with uuid for Malaria  
searcher.findConcept('8e3a87ae-345d-4c25-bd7a-5b3221c6e3fa', callback);
```
### Compound information

```javascript
var searcher = new Openphacts.CompoundSearch("https://beta.openphacts.org/1.3", appID, appKey);  
var callback=function(success, status, response){  
    var compoundResult = searcher.parseCompoundResponse(response);  
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// compound uri is for Aspirin  
searcher.fetchCompound('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', callback);
```
### Compound Pharmacology

```javascript
var searcher = new Openphacts.CompoundSearch("https://beta.openphacts.org/1.3", appID, appKey);  
var callback=function(success, status, response){  
    var compoundResult = searcher.parseCompoundPharmacologyResponse(response);  
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// compound uri is for Aspirin, page 1, 20 results per page  
searcher.compoundPharmacology('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', 1, 20, callback);
```
### Compound Pharmacology Count

```javascript
var searcher = new Openphacts.CompoundSearch("https://beta.openphacts.org/1.3", appID, appKey);  
var callback=function(success, status, response){  
    var result = searcher.parseCompoundPharmacologyCountResponse(response);  
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// compound uri is for Aspirin  
searcher.compoundPharmacologyCount('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', callback);
```

### Target information

```javascript
var searcher = new Openphacts.TargetSearch("https://beta.openphacts.org/1.3", appID, appKey);
var callback=function(success, status, response){  
    var result = searcher.parseTargetResponse(response);  
};
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// target uri is for cGMP-specific 3',5'-cyclic phosphodiesterase (Homo sapiens)  
searcher.fetchTarget('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', callback);  
```
### Target Pharmacology

```javascript
var searcher = new Openphacts.TargetSearch("https://beta.openphacts.org/1.3", appID, appKey);  
var callback=function(success, status, response){  
    var result = searcher.parseTargetPharmacologyResponse(response);  
};
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// target uri is for cGMP-specific 3',5'-cyclic phosphodiesterase (Homo sapiens), page 1, 20 results per page  
searcher.targetPharmacology('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', 1, 20, callback);  
```
### Target Pharmacology Count

```javascript
var searcher = new Openphacts.TargetSearch("https://beta.openphacts.org/1.3", appID, appKey);  
var callback=function(success, status, response){  
    var result = searcher.parseTargetPharmacologyCountResponse(response);  
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// target uri is for cGMP-specific 3',5'-cyclic phosphodiesterase (Homo sapiens)  
searcher.targetPharmacologyCount('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', callback);
```
### Exact Structure Search

```javascript
var searcher = new Openphacts.StructureSearch("https://beta.openphacts.org/1.3", appID, appKey);  
var callback=function(success, status, response){  
    var result = searcher.parseExactResponse(response);  
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// only a SMILES and match type has been provided, no limit, start or length  
searcher.exact('CNC(=O)c1cc(ccn1)Oc2ccc(cc2)NC(=O)Nc3ccc(c(c3)C(F)(F)F)Cl', 0, null, null, null, callback);
```
### Sub-structure Search

```javascript
var searcher = new Openphacts.StructureSearch("https://beta.openphacts.org/1.3", appID, appKey);  
var callback=function(success, status, response){  
    var result = searcher.parseSubstructureResponse(response);  
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// only a SMILES has been provided, no limit, start or length  
searcher.substructure('CNC(=O)c1cc(ccn1)Oc2ccc(cc2)NC(=O)Nc3ccc(c(c3)C(F)(F)F)Cl', null, null, null, callback);
```
### InChI Key to URL structure Search

```javascript
var searcher = new Openphacts.StructureSearch("https://beta.openphacts.org/1.3", appID, appKey);  
var callback=function(success, status, response){  
    var result = searcher.parseInchiKeyToURLResponse(response);  
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response is a chemspider url with id of the compound, response will be null in the case of errors  
// Inchi Key is for Aspirin  
searcher.inchiKeyToURL('BSYNRYMUTXBXSQ-UHFFFAOYSA-N', callback);
```
### InChI to URL structure Search

```javascript
var searcher = new Openphacts.StructureSearch("https://beta.openphacts.org/1.3", appID, appKey);  
var callback=function(success, status, response){  
    var result = searcher.parseInchiToURLResponse(response);  
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response is a chemspider url with id of the compound, response will be null in the case of errors  
// Inchi is for Aspirin  
searcher.inchiToURL('InChI=1S/C9H8O4/c1-6(10)13-8-5-3-2-4-7(8)9(11)12/h2-5H,1H3,(H,11,12)', callback);
```
### Similarity structure Search

```javascript
var searcher = new Openphacts.StructureSearch("https://beta.openphacts.org/1.3", appID, appKey);  
var callback=function(success, status, response){  
    var result = searcher.parseSimilarityResponse(response);  
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response is an array of chemspider URLs with the id of the compounds, response will be null in the case of errors  
// SMILES is for Aspirin with similarity type 0 for tanimoto and threshold 0.99, no limit, start or length  
searcher.similarity('CC(=O)Oc1ccccc1C(=O)O', 0, 0.99, null, null, null, callback);
```
## Other API calls available:

### Concept Wiki  
freeText

### Compounds  
compoundClassifications

### Targets
compoundsForTarget

### Trees

TreeSearch - base class  
getRootNodes & parseRootNodes  
getChildNodes & parseChildNodes 
```javascript
var searcher = new Openphacts.StructureSearch("https://beta.openphacts.org/1.3", appID, appKey);  
var callback=function(success, status, response){  
    var result = searcher.parseSimilarityResponse(response);  
};  
searcher.getChildNodes("http://purl.org/obo/owl/GO#GO_0010980", callback);;
```
getParentNodes & parseParentNodes  
getTargetClassPharmacologyCount & parseTargetClassPharmacologyCount  
getTargetClassPharmacologyPaginated & parseTargetClassPharmacologyPaginated  
getCompoundClassPharmacologyCount  
getCompoundClassPharmacologyPaginated

### Activities

ActivitySearch - base class  
getTypes & parseTypes  
getUnits & parseUnits  

### Chebi

ChebiSearch - base class  
getOntologyClassMembers & parseOntologyClassMembers  
getOntologyRootClassMembers & parseOntologyRootClassMembers  
getOntologyClass & parseOntologyClass  
getClassPharmacologyCount & parseClassPharmacologyCount  
getClassPharmacologyPaginated & parseClassPharmacologyPaginated

### Wiki Pathways
PathwaySearch - base class  
information & parseInformation  
pathwaysByCompound & parsePathwaysByCompoundResponse  
countPathwaysByCompound & parseCountPathwaysByCompoundResponse  
pathwaysByTarget & parsePathwaysByTargetResponse  
countPathwaysByTarget & parseCountPathwaysByTargetResponse  
pathwaysByReference & parsePathwaysByReferenceResponse  
countPathwaysByReference & parseCountPathwaysByReferenceResponse  
getCompounds & parseGetCompoundsResponse  
getTargets & parseGetTargetsResponse  
getReferences & parseGetReferencesResponse
countPathways & parseCountPathwaysResponse
list & parseListResponse
organisms & parseOrganismsResponse

### Map URL
MapSearch - base class  
mapURL && parseMapURLResponse

### Data Sources
DataSources - base class  
getSources

## Core Developers
[Ian Dunlop](https://github.com/ianwdunlop "Ian Dunlop - original developer")

## Contributors
[Rishi Ramgolam](https://github.com/rishiramgolam "rishiramgolam")  
[Elblood](https://github.com/Elblood "Elblood")  
[Andra Waagmeester](https://github.com/andrawaag "andraawag")
