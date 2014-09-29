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
