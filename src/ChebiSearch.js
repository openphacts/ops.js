Openphacts.ChebiSearch = function ChebiSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.ChebiSearch.prototype.getOntologyClassMembers = function(chebiURI, callback) {
	var chebiQuery = $.ajax({
		url: this.baseURL + '/compound/chebi/members',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			uri: chebiURI,
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

Openphacts.ChebiSearch.prototype.getOntologyRootClassMembers = function(callback) {
	var chebiQuery = $.ajax({
		url: this.baseURL + '/compound/chebi/root',
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

Openphacts.ChebiSearch.prototype.parseOntologyClassMembers = function(response) {
        var chebiOntologyClassMembers = [];
	$.each(response.has_member, function(i, member) {
            chebiOntologyClassMembers.push({uri: member["_about"], label: member.label});
	});
	return chebiOntologyClassMembers;
}

Openphacts.ChebiSearch.prototype.parseOntologyRootClassMembers = function(response) {
        var chebiOntologyRootMembers = [];
	$.each(response.rootNode, function(i, member) {
            chebiOntologyRootMembers.push({uri: member["_about"], label: member.label});
	});
	return chebiOntologyRootMembers;
}
