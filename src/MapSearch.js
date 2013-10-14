Openphacts.MapSearch = function MapSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.MapSearch.prototype.mapURL = function(URI, targetUriPattern, graph, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['Uri'] = URI;
        targetUriPattern ? params['targetUriPattern'] = targetUriPattern : '';
        graph ? params['graph'] = graph : '';
        lens ? params['lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/mapUri',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.MapSearch.prototype.parseMapURLResponse = function(response) {
        var constants = new Openphacts.Constants();
        var items = response.primaryTopic[constants.EXACT_MATCH];
        var urls = [];
        if ($.isArray(items)) {
	        $.each(items, function(i, item) {
              urls.push(item);
	        });
        } else {
            urls.push(item);
        }
	return urls;
}
