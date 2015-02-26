//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

/**
 * @constructor
 * @param {string} elasticSearchURL - URL for the ElasticSearch endpoint
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author Stian Soiland-Reyes
 */
Openphacts.IRS2Search = function(elasticSearchURL) {
	this.baseURL = elasticSearchURL;
}

/**
 * Performs a free text search to resolve the identity of an entity in a certain branch.
 * @param {string} query - Query of at least three characters.
 * @param {string} limit - The maximum number of search results.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 */
Openphacts.IRS2Search.prototype.freeText = function(query, limit, callback) {
	var search = {
			query: {
				query_string: {
					query: query,
					default_operator: "AND"
				},
			},
			size: 25,
			highlight: {
				"pre_tags" : ["<strong>"],
				"post_tags" : ["</strong>"],

				fields: {
					title: {},
					prefLabel: {},
					altLabel: {},
					label: {},
					description: {},
					mnemonic: {},
					oldMnemonic: {},
					shortName: {},
					fullName: {},
					ecName: {},
					altFullName: {},
					antigen: {},
					altEcName: {},gi
					altShortName: {}
				}
			}
	};

	var ajax = {
			type: "POST",
			url: "_search?pretty=true",
			data: JSON.stringify(search),
			contentType: "application/json",
			dataType: "json"
	}

	var IRS2Searcher = $.ajax(ajax).done(
			function(response, status, request){
				callback.call(this, true, request.status, response.result);
		}).fail(
			function(response, status, statusText){
				callback.call(this, false, response.status);
		});

}


Openphacts.IRS2Search.prototype.parseResponse = function(response) {
	function merge_lists(lists) {
		var list = []
		lists.forEach(function(l) {
			if ($.isArray(l)) {
				$.merge(list, l);
			}
		});
		return list
	}

	var uris = [];
	$.each(response.data.hits.hits, function(i, hit) {
					doc = hit._source.doc;
					names = merge_lists([doc.prefLabel, doc.title, doc.label, doc.mnemonic,
						doc.shortName, doc.fullName, hit._id]);
					name = names[0];
			    uris.push({
				   'uri': hit._id,
				   'prefLabel': name,
				   'match': hit._source
			    });
		    });
      }
    }
	return uris;
}
