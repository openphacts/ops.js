Openphacts.EnzymeSearch = function EnzymeSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.EnzymeSearch.prototype.getClassificationRootClasses = function(callback) {
	var enzymeQuery = $.ajax({
		url: this.baseURL + '/target/enzyme/root',
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

Openphacts.EnzymeSearch.prototype.getClassificationClass = function(enzymeURI, callback) {
	var enzymeQuery = $.ajax({
		url: this.baseURL + '/target/enzyme/node',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
                        uri: enzymeURI,
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

Openphacts.EnzymeSearch.prototype.getClassificationClassMembers = function(enzymeURI, callback) {
	var enzymeQuery = $.ajax({
		url: this.baseURL + '/target/enzyme/members',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
                        uri: enzymeURI,
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

Openphacts.EnzymeSearch.prototype.getPharmacologyCount = function(enzymeURI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = enzymeURI;
        assayOrganism != null ? params['assay_organism'] = assayOrganism : '';
        targetOrganism != null ? params['target_organism'] = targetOrganism : '';
        activityType != null ? params['activity_type'] = activityType : '';
        activityValue != null ? params['activity_value'] = activityValue : '';
        minActivityValue != null ? params['min-activity_value'] = minActivityValue : '';
        minExActivityValue != null ? params['minEx-activity_value'] = minExActivityValue : '';
        maxActivityValue != null ? params['max-activity_value'] = maxActivityValue : '';
        maxExActivityValue != null ? params['maxEx-activity_value'] = maxExActivityValue : '';
        activityUnit != null ? params['activity_unit'] = activityUnit : '';
	var enzymeQuery = $.ajax({
		url: this.baseURL + '/target/enzyme/pharmacology/count',
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

Openphacts.EnzymeSearch.prototype.parseClassificationRootClasses = function(response) {
        var enzymeRootClasses = [];
	$.each(response.rootNode, function(i, member) {
            enzymeRootClasses.push({uri: member["_about"], name: member.name});
	});
	return enzymeRootClasses;
}

Openphacts.EnzymeSearch.prototype.parseClassificationClass = function(response) {
        var enzymeClasses = [];
	$.each(response.sibling, function(i, member) {
            enzymeClasses.push({uri: member["_about"], name: member.name});
	});
	return enzymeClasses;
}

Openphacts.EnzymeSearch.prototype.parseClassificationClassMembers = function(response) {
        var enzymeClasses = [];
	$.each(response.has_member, function(i, member) {
            var about = member["_about"];
            var names = [];
            if ($.isArray(member.name)) {
                $.each(member.name, function(j, label) {
                    names.push(label);
                });
            } else {
                names.push(member.name);
            }
            enzymeClasses.push({uri: about, names: names});
	});
	return enzymeClasses;
}

Openphacts.EnzymeSearch.prototype.parseEnzymePharmacologyCount = function(response) {
	return response.enzymePharmacologyTotalResults;
}
