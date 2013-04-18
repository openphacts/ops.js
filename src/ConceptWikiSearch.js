Openphacts.ConceptWikiSearch = function (baseURL) {
    this.baseURL = baseURL;
}

Openphacts.ConceptWikiSearch.prototype.byTag = function(appID, appKey, query, limit, branch, type, callback) {
    var conceptWikiSearcher = $.ajax({
        url: this.baseURL + "byTag",
        cache: true,
        data: {
            q: query,
            limit: limit,
            branch: branch,
            uuid: type,
            app_id: appID,
            app_key: appKey
        },
        statusCode: {
            200: function(response, status, request) {
                callback.call(this, true, 200, response.result.primaryTopic.result);   
            },
            404: function(request, status, error) {
                callback.call(this, false, 404);
            },
            500: function(request, status, error) {
                callback.call(this, false, 500);
            }
        }
    });
}

Openphacts.ConceptWikiSearch.prototype.parseResponse = function(response) {
    var uris = [];

    $.each(response, function (i, match) {
        uris.push(match["_about"]);
    });
    return uris;
}
