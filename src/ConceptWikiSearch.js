Openphacts.ConceptWikiSearch = function (baseURL) {
    this.baseURL = baseURL;
}

Openphacts.ConceptWikiSearch.prototype.byTag = function(appID, appKey, query, limit, branch, type, callback) {
    var conceptWikiSearcher = $.ajax({
        url: this.baseURL + "/search/byTag",
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
            callback.call(this, true, request.status, response.result.primaryTopic.result);   
        },
        error: function(request, status, error) {
            callback.call(this, false, request.status);
        }
    });
}

Openphacts.ConceptWikiSearch.prototype.parseResponse = function(response) {
    var uris = [];
    //response can be either array or singleton.
    if (response instanceof Array) {
        $.each(response, function (i, match) {
            uris.push(match["_about"]);
        });
    } else {
        uris.push(response["_about"]);
    }
    return uris;
}
