# OPS.js

OPS.js is a javascript based library for accessing the OpenPHACTS Linked Data API (LDA). It uses jquery to handle the asynchronous nature of the requests. OPS.js can also be used to parse responses from the LDA.

## Dependencies
JQuery 1.9.1  
JQuery-jsonp (https://github.com/jaubourg/jquery-jsonp)  
Get your appID and appKey by registering at dev.openphacts.org

## Using the library
JQuery must be loaded before the OPS.js library.  

The following api calls can be executed:

1. Concept Wiki free text search

```javascript
var searcher = new Openphacts.ConceptWikiSearch("https://beta.openphacts.org");  
var callback=function(success, status, response){  
    searcher.parseResponse(response);
};  
// limit to 20 results, species human (branch 4), with type set to compounds (uuid 07a800....)  
searcher.byTag(appID, appKey, 'Aspirin', '20', '4', '07a84994-e464-4bbf-812a-a4b96fa3d197', callback);
```
2. Compound information

```javascript
var searcher = new Openphacts.CompoundSearch("https://ops2.few.vu.nl");  
var callback=function(success, status, response){  
    var compoundResult = searcher.parseCompoundResponse(response);  
};  
// compound uri is for Aspirin  
searcher.fetchCompound(appID, appKey, 'http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', callback);
```
3. Target information

```javascript
var searcher = new Openphacts.TargetSearch("https://ops2.few.vu.nl");  
searcher.fetchTarget(appID, appKey, 'http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', callback);  
// target uri is for cGMP-specific 3',5'-cyclic phosphodiesterase (Homo sapiens)  
var callback=function(success, status, response){  
    var result = searcher.parseTargetResponse(response);  
};
```
