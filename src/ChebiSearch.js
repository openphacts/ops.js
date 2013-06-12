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

Openphacts.ChebiSearch.prototype.getOntologyClass = function(chebiURI, callback) {
	var chebiQuery = $.ajax({
		url: this.baseURL + '/compound/chebi/node',
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

Openphacts.ChebiSearch.prototype.getClassPharmacologyCount = function(chebiURI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = chebiURI;
        assayOrganism != null ? params['assay_organism'] = assayOrganism : '';
        targetOrganism != null ? params['target_organism'] = targetOrganism : '';
        activityType != null ? params['activity_type'] = activityType : '';
        activityValue != null ? params['activity_value'] = activityValue : '';
        minActivityValue != null ? params['min-activity_value'] = minActivityValue : '';
        minExActivityValue != null ? params['minEx-activity_value'] = minExActivityValue : '';
        maxActivityValue != null ? params['max-activity_value'] = maxActivityValue : '';
        maxExActivityValue != null ? params['maxEx-activity_value'] = maxExActivityValue : '';
        activityUnit != null ? params['activity_unit'] = activityUnit : '';
	var chebiQuery = $.ajax({
		url: this.baseURL + '/compound/chebi/pharmacology/count',
                dataType: 'json',
		cache: true,
		data: params,
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

Openphacts.ChebiSearch.prototype.parseOntologyClass = function(response) {
        var chebiOntologyRootMembers = [];
	$.each(response.sibling, function(i, member) {
            chebiOntologyRootMembers.push({uri: member["_about"], label: member.label});
	});
	return chebiOntologyRootMembers;
}

Openphacts.ChebiSearch.prototype.parseClassPharmacologyCount = function(response) {
	return response.chebiPharmacologyTotalResults;
}
