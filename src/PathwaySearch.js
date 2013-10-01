Openphacts.PathwaySearch = function PathwaySearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.PathwaySearch.prototype.getInformation = function(URI, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        lens ? params['lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathway',
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

Openphacts.PathwaySearch.prototype.parseInformation = function(response) {
        var constants = new Openphacts.Constants();
        var latest_version, identifier, revision, title, description, parts, inDataset, pathwayOntology, organism, organismLabel;
        latest_version = response.primaryTopic.latest_version;
        title = latest_version.title;
        organism = latest_version.organism[constants.ABOUT];
        organismLabel = latest_version.organism.label;
        pathwayOntology = latest_version.pathwayOntology;
        description = latest_version.description ? latest_version.description : null;
        revision = latest_version[constants.ABOUT];
        var partsComplete = latest_version.hasPart ? latest_version.hasPart : null;
        var parts = [];
	$.each(partsComplete, function(i, part) {
            parts.push({about: part["_about"], type: part.type});
	});
	return {
                   'title': title, 
                   'description': description, 
                   'revision': 'revision', 
                   'pathwayOntology': pathwayOntology,
                   'organism': organism, 
                   'organismLabel': organismLabel, 
                   'parts': parts
                };
}
