Openphacts.PathwaySearch = function PathwaySearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.PathwaySearch.prototype.information = function(URI, lens, callback) {
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

Openphacts.PathwaySearch.prototype.byCompound = function(URI, organism, lens, page, pageSize, orderBy, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        organism ? params['pathway_organism'] = organism : '';
        lens ? params['lens'] = lens : '';
        page ? page = params['_page'] : '';
        pageSize ? pageSize = params['_pageSize'] : '';
        //TODO order by neeeds an RDF like syntax to work eg ?cw_uri or DESC(?cw_uri), need to hide that
        //from users by having a descending flag and creating the correct syntax here
        orderBy ? orderBy = params['_orderBy'] : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/byCompound',
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

Openphacts.PathwaySearch.prototype.countPathwaysByCompound = function(URI, organism, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        organism ? params['pathway_organism'] = organism : '';
        lens ? params['lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/byCompound/count',
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


Openphacts.PathwaySearch.prototype.parseInformationResponse = function(response) {
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

Openphacts.PathwaySearch.prototype.parseByCompoundResponse = function(response) {
        var constants = new Openphacts.Constants();
        var items = response.items;
        var pathways = [];
        $.each(items, function(i, item) {
          var title, identifier, organism, organismLabel, parts, about, type, prefLabel, description, pathwayOntology;
          title = item.title;
          identifier = item.identifier;
          parts = item.hasPart;
          about = parts[constants.ABOUT];
          type = parts.type;
          prefLabel = parts.exactMatch.prefLabel;
          organism = item.pathway_organism[constants.ABOUT];
          organismLabel = item.pathway_organism.label;
          description = item.description ? item.description : null;
          pathwayOntology = item.pathwayOntology ? item.pathwayOntology : null;
          pathways.push({
                           'title': title, 
                           'identifier': identifier,
                           'description': description, 
                           'pathwayOntology': pathwayOntology,
                           'organism': organism, 
                           'organismLabel': organismLabel, 
                           'type': type,
                           'prefLabel': prefLabel,
                           'about': about
                        });
        });
	return pathways;
}

Openphacts.PathwaySearch.prototype.parseCountPathwaysByCompoundResponse = function(response) {
    var constants = new Openphacts.Constants();
	return response.primaryTopic[constants.PATHWAY_COUNT];
}
