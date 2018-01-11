//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

/**
 * @constructor
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author [Ian Dunlop]{@link https://github.com/ianwdunlop}
 */
Version = function Version() {
 
};

/**
 * Provides metadata and version information about this release of OPS.js.
 * @method
 * @example
 * new Version().information();
 */
Version.prototype.information = function() {
	return {
               "version": "7.1.0", 
               "author": "Ian Dunlop",
	             "ORCID": "http://orcid.org/0000-0001-7066-3350",
               "title": "OPS.js",
               "description": "Javascript library for accessing the Open PHACTS Linked Data API",
               "project": "Open PHACTS",
               "organization": "Data2Discovery",
               "year": "2018",
               "month": "January",
               "url": "http://github.com/openphacts/ops.js",
               "LDA-version": "2.2"
           }; 
};

exports.Version = Version;
