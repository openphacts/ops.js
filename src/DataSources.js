/**
 * @constructor
 * @param {string} baseURL - URL for the Open PHACTS API
 * @param {string} appID - Application ID for the application being used. Created by https://dev.openphacts.org
 * @param {string} appKey - Application Key for the application ID.
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author Ian Dunlop
 */
Openphacts.DataSources = function DataSources(baseURL, appID, appKey) {
        this.baseURL = baseURL;
        this.appID = appID;
        this.appKey = appKey;
}

Openphacts.DataSources.prototype.getSources = function(callback) {
        var sourcesQuery = $.ajax({
                url: this.baseURL + '/sources',
                dataType: 'json',
                cache: true,
                data: {
                        _format: "json",
                        app_id: this.appID,
                        app_key: this.appKey
                },
                success: function(response, status, request) {
                        callback.call(this, true, request.status, response.result.primaryTopic);
                },
                error: function(request, status, error) {
                        callback.call(this, false, request.status);
                }
        });
}

