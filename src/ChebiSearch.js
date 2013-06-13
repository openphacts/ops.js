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

Openphacts.ChebiSearch.prototype.getClassPharmacologyPaginated = function(chebiURI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, page, pageSize, orderBy, callback) {
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
        page != null ? params['_page'] = page : '';
        pageSize != null ? params['_pageSize'] = pageSize : '';
        orderBy != null ? params['_orderBy'] = orderBy : '';
	var chebiQuery = $.ajax({
		url: this.baseURL + '/compound/chebi/pharmacology/pages',
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

Openphacts.ChebiSearch.prototype.parseClassPharmacologyPaginated = function(response) {
        var records = [];
        var chemblActivityURL, chemblURL, pmid, fullMWT, inDataset, cwURL, prefLabel, csURL, inchi, inchiKey, smiles, ro5Violations, assayURL, assayDescription, assayTarget, assayOrganism, assayDataset, purlURL;
        $.each(response.items, function(i, item) {
            chemblActivityURL = item["_about"];
            pmid = item.pmid;
            chemblURL = item.forMolecule["_about"];
            fullMWT = item.forMolecule.full_mwt;
            inDataset = item.forMolecule.inDataset;
            $.each(item.forMolecule.exactMatch, function(j, match) {
		if (match["_about"] && match["_about"].indexOf("http://www.conceptwiki.org") !== -1) {
                    cwURL = match["_about"];
                    prefLabel = match["prefLabel"];
		} else if (match["_about"] && match["_about"].indexOf("chemspider.com") !== -1) {
                    csURL = match["_about"];
                    inchi = match.inchi;
                    inchiKey = match.inchikey;
                    smiles = match.smiles;
                    ro5Violations = match.ro5_violations;
		} else if (match.indexOf("purl.obolibrary.org") !== -1) {
                    purlURL = match;
                }
            });
            assayURL = item.onAssay["_about"];
            assayDescription = item.onAssay.description;
            assayTarget = item.onAssay.target;
            assayOrganism = item.onAssay.assay_organism;
            assayDataset = item.onAssay.inDataset;
            records.push({
                    chemblActivityURL: chemblActivityURL,
                    chemblURL: chemblURL,
                    pmid: pmid,
                    fullMWT: fullMWT,
                    inDataset: inDataset,
                    cwURL: cwURL,
                    prefLabel: prefLabel,
                    csURL: csURL,
                    inchi: inchi,
                    inchiKey: inchiKey,
                    smiles: smiles,
                    ro5Violations: ro5Violations,
                    assayURL: assayURL,
                    assayDescription: assayDescription,
                    assayTarget: assayTarget,
                    assayOrganism: assayOrganism,
                    assayDataset: assayDataset,
                    purlURL: purlURL
             });
        });
	return records;
}
