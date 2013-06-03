Openphacts.StructureSearch = function StructureSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.StructureSearch.prototype.exact = function(smiles, matchType, limit, start, length, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['searchOptions.Molecule'] = smiles;
        matchType != null ? params['searchOptions.MatchType'] = matchType : '';
        limit != null ? params['resultOptions.Limit'] = limit : '';
        start != null ? params['resultOptions.Start'] = start : '';
        length != null ? params['resultOptions.Length'] = length : '';
	var exactQuery = $.ajax({
		url: this.baseURL + '/structure/exact',
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

Openphacts.StructureSearch.prototype.substructure = function(smiles, limit, start, length, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['searchOptions.Molecule'] = smiles;
        limit != null ? params['resultOptions.Limit'] = limit : '';
        start != null ? params['resultOptions.Start'] = start : '';
        length != null ? params['resultOptions.Length'] = length : '';
	var exactQuery = $.ajax({
		url: this.baseURL + '/structure/substructure',
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

Openphacts.StructureSearch.prototype.parseExactResponse = function(response) {
	return {
                type: response.type,
                molecule: response.Molecule,
                csURI: response.result
        };
}

Openphacts.StructureSearch.prototype.parseSubstructureResponse = function(response) {
	return response.result;
}
