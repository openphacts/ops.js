//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.
/**
 * @constructor
 * @param {string} baseURL - URL for the Open PHACTS API
 * @param {string} appID - Application ID for the application being used. Created by https://dev.openphacts.org
 * @param {string} appKey - Application Key for the application ID.
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author Ian Dunlop
 */
Openphacts.DiseaseSearch = function DiseaseSearch(baseURL, appID, appKey) {
    this.baseURL = baseURL;
    this.appID = appID;
    this.appKey = appKey;
}

/**
 * Fetch the disease represented by the URI provided.
 * @param {string} URI - The URI for the disease of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new Openphacts.DiseaseSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var diseaseResult = searcher.parseDiseaseResponse(response);
 * };
 * searcher.fetchDisease('http://linkedlifedata.com/resource/umls/id/C0004238', null, callback);
 */
Openphacts.DiseaseSearch.prototype.fetchDisease = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
    var diseaseQuery = $.ajax({
        url: this.baseURL + '/disease',
        dataType: 'json',
        cache: true,
        data: params
    }).done(function(response, status, request) {
        callback.call(this, true, request.status, response.result);
    }).fail(function(response, status, statusText) {
        callback.call(this, false, response.status);
    });
}

/**
 * Count the number of diseases for a target represented by the URI provided.
 * @param {string} URI - The URI for the target of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new Openphacts.DiseaseSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var diseaseResult = searcher.parseDiseasesByTargetCountResponse(response);
 * };
 * searcher.diseasesByTargetCount('http://linkedlifedata.com/resource/umls/id/C0004238', null, callback);
 */
Openphacts.DiseaseSearch.prototype.diseasesByTargetCount = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
    var diseaseQuery = $.ajax({
        url: this.baseURL + '/disease/byTarget/count',
        dataType: 'json',
        cache: true,
        data: params
    }).done(function(response, status, request) {
        callback.call(this, true, request.status, response.result);
    }).fail(function(response, status, statusText) {
        callback.call(this, false, response.status);
    });
}

/**
 * Fetch the diseases for a target represented by the URI provided.
 * @param {string} URI - The URI for the target of interest.
 * @param {string} [page=1] - Which page of records to return.
 * @param {string} [pageSize=10] - How many records to return. Set to 'all' to return all records in a single page
 * @param {string} [orderBy] - Order the records by this field eg ?assay_type or DESC(?assay_type)
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new Openphacts.DiseaseSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var diseases = searcher.parseDiseasesByTargetResponse(response);
 * };
 * searcher.diseasesByTarget('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, null, null, null, callback);
 */
Openphacts.DiseaseSearch.prototype.diseasesByTarget = function(URI, page, pageSize, orderBy, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    orderBy ? params['_orderBy'] = orderBy : '';
    lens ? params['_lens'] = lens : '';
    var diseaseQuery = $.ajax({
        url: this.baseURL + '/disease/byTarget',
        dataType: 'json',
        cache: true,
        data: params
    }).done(function(response, status, request) {
        callback.call(this, true, request.status, response.result);
    }).fail(function(response, status, statusText) {
        callback.call(this, false, response.status);
    });
}

/**
 * Parse the results from {@link Openphacts.DiseaseSearch#fetchDisease}
 * @param {Object} response - the JSON response from {@link Openphacts.DiseaseSearch#fetchDisease}
 * @returns {FetchDiseaseResponse} Containing the flattened response
 * @method
 */
Openphacts.DiseaseSearch.prototype.parseDiseaseResponse = function(response) {
    var constants = new Openphacts.Constants();
    var id = null,
        URI = null,
        name = null,
        diseaseClass = [];
    URI = response.primaryTopic[constants.ABOUT];
    id = URI.split('/').pop();
    name = response.primaryTopic.name;
    if (response.primaryTopic.diseaseClass != null) {
        if ($.isArray(response.primaryTopic.diseaseClass)) {
            $.each(response.primaryTopic.diseaseClass, function(index, item) {
                diseaseClass.push({
                    "name": item.name,
                    "URI": item[constants.ABOUT]
                });
            });
        } else {
            diseaseClass.push({
                "name": response.primaryTopic.diseaseClass.name,
                "URI": response.primaryTopic.diseaseClass[constants.ABOUT]
            });
        }
    }
    return {
        "id": id,
        "URI": URI,
        "name": name,
        "diseaseClass": diseaseClass
    };
}

/**
 * Parse the results from {@link Openphacts.DiseaseSearch#diseasesByTargetCount}
 * @param {Object} response - the JSON response from {@link Openphacts.DiseaseSearch#diseasesByTargetCount}
 * @returns {Number} Count of the number of diseases for the target
 * @method
 */
Openphacts.DiseaseSearch.prototype.parseDiseasesByTargetCountResponse = function(response) {
    return response.primaryTopic.diseaseCount;
}

/**
 * Parse the results from {@link Openphacts.DiseaseSearch#diseasesByTarget}
 * @param {Object} response - the JSON response from {@link Openphacts.DiseaseSearch#diseasesByTarget}
 * @returns {DiseasesByTargetResponse} List of disease items
 * @method
 */
Openphacts.DiseaseSearch.prototype.parseDiseasesByTargetResponse = function(response) {
    var constants = new Openphacts.Constants();
    var diseases = [];
    $.each(response.items, function(index, item) {
        var name = null,
            URI = null,
            gene = null,
            encodes = null,
            encodeURI = null,
            encodeLabel = null;
        name = item.name;
        URI = item[constants.ABOUT];
        gene = item.forGene[constants.ABOUT];
        var thisGene = item.forGene.encodes
        encodes = thisGene[constants.ABOUT];
        if (thisGene.exactMatch != null) {
            encodeURI = thisGene.exactMatch[constants.ABOUT];
            encodeLabel = thisGene.exactMatch.prefLabel;
        }
        diseases.push({
            "name": name,
            "URI": URI,
            "gene": gene,
            "encodes": encodes,
            "encodeURI": encodeURI,
            "encodeLabel": encodeLabel
        });
    });
    return diseases;
}
