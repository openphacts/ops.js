Openphacts.ConceptWikiSearch = function (baseURL) {
    this.baseURL = baseURL;
}

Openphacts.ConceptWikiSearch.prototype.byTag = function(appID, appKey, query, limit, branch, type, callback) {
    var conceptWikiSearcher = $.jsonp({
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
        success: function(response, status, request) {
            callback.call(this, true, 200, response.result.primaryTopic.result);
        },
        // no status codes due to the nature of jsonp, just a failure message
        error: function(options, status) {
            callback.call(this, false);
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
