function ConceptWikiSearch(baseURL) {
    this.baseURL = baseURL;
}

ConceptWikiSearch.prototype.byTag = function(appID, appKey, query, limit, branch, type, callback) {
    var conceptWikiSearcher = $.ajax({
        dataType: "jsonp",
        url: this.baseURL + "byTag?_callback=?",
        cache: true,
        data: {
            q: query,
            limit: limit,
            branch: branch,
            uuid: type,
            app_id: appID,
            app_key: appKey
        }
    });
    conceptWikiSearcher.success(function (response) {
        callback.call(this, response.result.primaryTopic.result);
    });
}

ConceptWikiSearch.prototype.parseResponse = function(response) {
    var uris = [];

    $.each(response, function (i, match) {
        uris.push(match["_about"]);
    });
    return uris;
}
