# OPS.js [![Build Status](https://travis-ci.org/openphacts/ops.js.svg?branch=develop)](https://travis-ci.org/openphacts/ops.js) [![DOI](https://zenodo.org/badge/doi/10.5281/zenodo.21396.svg)](http://dx.doi.org/10.5281/zenodo.29418)

## Open PHACTS API Version

2.1

## About
OPS.js is a javascript NodeJS based library, available via [NPM](https://www.npmjs.com/package/ops.js "OPs.js on Node Package Manager"), for accessing the Open PHACTS Linked Data API (LDA). It uses [nets](https://www.npmjs.com/package/nets) to handle the asynchronous network calls. OPS.js can also be used to parse responses from the LDA.
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
To cite OPS.js in publications please see [the zenodo record](https://zenodo.org/record/29418#.VdxqH_lVhBc "OPS.js zenodo record").

>Ian Dunlop et al. (2015). ops.js: OPS.js 6.1.3 for Open PHACTS 1.5 API. Zenodo. 10.5281/zenodo.29418

For Bibtex use:

```latex
@misc{ian_dunlop_2015_29418,
  author       = {Ian Dunlop and
                  Egon Willighagen and
                  Elblood and
                  andrawaag and
                  Stian Soiland-Reyes and
                  PANDORINO},
  title        = {ops.js: OPS.js 6.1.3 for Open PHACTS 1.5 API},
  month        = aug,
  year         = 2015,
  doi          = {10.5281/zenodo.29418},  
  url          = {http://dx.doi.org/10.5281/zenodo.29418}
}
```

You can get version information by using an OPS.js method in a browser or Node:

```javascript
    new Version().information()
```

## Using the library
If running in a browser based application use `src/combined.js`. With NodeJS use `npm install ops.js`.  
See the [API documentation](http://openphacts.github.io/ops.js "OPS.js API documentation")  

Each API call generally has 1 method to fetch the results using an asynchronous call with a callback and then another method to parse these results.
Look at https://dev.openphacts.org for more information about the source methods that the API calls use.

## Testing the library

[Jasmine](https://jasmine.github.io/ "Jasmine javascript testing framework") is used to test the ops.js api. The specs for the tests are in the 'test/spec' directory. To run them use jasmine-node like this:

```bash
jasmine-node --config app_id your_app_id --config app_key your_app_key --config app_url https://beta.openphacts.org/2.1 test/spec/integration/
```

In case the test run does not finish with some statistics on the number of tests run, assertions made, and skipped and failed tests,
then it like failed on one of the tests. To see the exception that was thrown, run Jasmine with the --captureExceptions option:

```bash
jasmine-node --captureExceptions --config app_id your_app_id --config app_key your_app_key --config app_url https://beta.openphacts.org/1.5 test/spec/integration/
```

To enable console logging of URIs tested, add the parameter `--config debug true`

### Testing with Docker

If you use Docker, you can run the [openphacts/ops-api-test](https://hub.docker.com/r/openphacts/ops-api-test/) image
to run the tests, without needing to install NodeJS.

Run with the `-it` parameter to get colour output.
You might want to override environment variables like `app_url`, `app_id` and `app_key`.
Example:

```bash
docker run -it -e app_url=http://heater.cs.man.ac.uk:3002 openphacts/ops-api-test
```


## API call examples:

More examples can be found in the integration tests and in the [API docs](http://openphacts.github.io/ops.js "OPS.js API documentation").

### Concept Wiki free text search

```javascript
var searcher = new ConceptWikiSearch("https://beta.openphacts.org/2.1", appID, appKey);  
var callback=function(success, status, response){  
    searcher.parseResponse(response);
};  
// success is 'true' or 'false', status is the http status code, response is the raw result which the parser function accepts  
// response will be null in the case of errors  
// limit to 20 results, species human (branch 4), with type set to compounds (uuid 07a800....)  
searcher.byTag('Aspirin', '20', '4', '07a84994-e464-4bbf-812a-a4b96fa3d197', callback);
```

### Compound information

```javascript
var searcher = new CompoundSearch("https://beta.openphacts.org/2.1", appID, appKey);  
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
[Morton Fox](https://github.com/mortonfox "mortonfox")
