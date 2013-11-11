//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

Openphacts.TreeSearch = function TreeSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.TreeSearch.prototype.getRootNodes = function(root, callback) {
	var query = $.ajax({
		url: this.baseURL + '/tree',
                dataType: 'json',
		cache: true,
		data: {
            root: root,
			_format: "json",
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.TreeSearch.prototype.getChildNodes = function(URI, callback) {
	var query = $.ajax({
		url: this.baseURL + '/tree/children',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
                        uri: URI,
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.TreeSearch.prototype.getParentNodes = function(URI, callback) {
	var query = $.ajax({
		url: this.baseURL + '/tree/parents',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
                        uri: URI,
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}


Openphacts.TreeSearch.prototype.getTargetClassPharmacologyCount = function(URI, assayOrganism, targetOrganism, activityType, activityValue, activityUnit, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, relation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        assayOrganism != null ? params['assay_organism'] = assayOrganism : '';
        targetOrganism != null ? params['target_organism'] = targetOrganism : '';
        activityType != null ? params['activity_type'] = activityType : '';
        activityValue != null ? params['activity_value'] = activityValue : '';
        activityUnit != null ? params['activity_unit'] = activityUnit : '';
        relation != null ? params['relation'] = relation : '';
        pChembl != null ? params['pChembl'] = pChembl : '';
        minpChembl != null ? params['min-pChembl'] = minpChembl : '';
        minExpChembl != null ? params['minEx-pChembl'] = minExpChembl : '';
        maxpChembl != null ? params['max-pChembl'] = maxpChembl : '';
        maxExpChembl != null ? params['maxEx-pChembl'] = maxExpChembl : '';
        lens != null ? params['lens'] = lens : '';
	var query = $.ajax({
		url: this.baseURL + '/target/tree/pharmacology/count',
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

Openphacts.TreeSearch.prototype.getTargetClassPharmacologyPaginated = function(URI, assayOrganism, targetOrganism, activityType, activityValue, activityUnit, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, relation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, page, pageSize, orderBy, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        assayOrganism != null ? params['assay_organism'] = assayOrganism : '';
        targetOrganism != null ? params['target_organism'] = targetOrganism : '';
        activityType != null ? params['activity_type'] = activityType : '';
        activityValue != null ? params['activity_value'] = activityValue : '';
        activityUnit != null ? params['activity_unit'] = activityUnit : '';
        relation != null ? params['relation'] = relation : '';
        pChembl != null ? params['pChembl'] = pChembl : '';
        minpChembl != null ? params['min-pChembl'] = minpChembl : '';
        minExpChembl != null ? params['minEx-pChembl'] = minExpChembl : '';
        maxpChembl != null ? params['max-pChembl'] = maxpChembl : '';
        maxExpChembl != null ? params['maxEx-pChembl'] = maxExpChembl : '';
        lens != null ? params['lens'] = lens : '';
        page != null ? params['_page'] = page : '';
        pageSize != null ? params['_pageSize'] = pageSize : '';
        orderBy != null ? params['_orderBy'] = orderBy : '';
	var query = $.ajax({
		url: this.baseURL + '/target/tree/pharmacology/pages',
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

Openphacts.TreeSearch.prototype.getCompoundClassPharmacologyCount = function(URI, assayOrganism, targetOrganism, activityType, activityValue, activityUnit, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, relation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        assayOrganism != null ? params['assay_organism'] = assayOrganism : '';
        targetOrganism != null ? params['target_organism'] = targetOrganism : '';
        activityType != null ? params['activity_type'] = activityType : '';
        activityValue != null ? params['activity_value'] = activityValue : '';
        activityUnit != null ? params['activity_unit'] = activityUnit : '';
        relation != null ? params['relation'] = relation : '';
        pChembl != null ? params['pChembl'] = pChembl : '';
        minpChembl != null ? params['min-pChembl'] = minpChembl : '';
        minExpChembl != null ? params['minEx-pChembl'] = minExpChembl : '';
        maxpChembl != null ? params['max-pChembl'] = maxpChembl : '';
        maxExpChembl != null ? params['maxEx-pChembl'] = maxExpChembl : '';
        lens != null ? params['lens'] = lens : '';
	var query = $.ajax({
		url: this.baseURL + '/compound/tree/pharmacology/count',
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

Openphacts.TreeSearch.prototype.getCompoundClassPharmacologyPaginated = function(URI, assayOrganism, targetOrganism, activityType, activityValue, activityUnit, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, relation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, page, pageSize, orderBy, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        assayOrganism != null ? params['assay_organism'] = assayOrganism : '';
        targetOrganism != null ? params['target_organism'] = targetOrganism : '';
        activityType != null ? params['activity_type'] = activityType : '';
        activityValue != null ? params['activity_value'] = activityValue : '';
        activityUnit != null ? params['activity_unit'] = activityUnit : '';
        relation != null ? params['relation'] = relation : '';
        pChembl != null ? params['pChembl'] = pChembl : '';
        minpChembl != null ? params['min-pChembl'] = minpChembl : '';
        minExpChembl != null ? params['minEx-pChembl'] = minExpChembl : '';
        maxpChembl != null ? params['max-pChembl'] = maxpChembl : '';
        maxExpChembl != null ? params['maxEx-pChembl'] = maxExpChembl : '';
        targetType != null ? params['target_type'] = targetType : '';
        lens != null ? params['lens'] = lens : '';
        page != null ? params['_page'] = page : '';
        pageSize != null ? params['_pageSize'] = pageSize : '';
        orderBy != null ? params['_orderBy'] = orderBy : '';
	var query = $.ajax({
		url: this.baseURL + '/compound/tree/pharmacology/pages',
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

Openphacts.TreeSearch.prototype.parseRootNodes = function(response) {
    var enzymeRootClasses = [];
    if ($.isArray(response.primaryTopic.hasPart.rootNode)) {
	    $.each(response.primaryTopic.hasPart.rootNode, function(i, member) {
          enzymeRootClasses.push({uri: member["_about"], name: member.prefLabel});
	    });
    } else {
        enzymeRootClasses.push({uri: response.primaryTopic.hasPart.rootNode["_about"], name: response.primaryTopic.hasPart.rootNode.prefLabel});
    }
	return enzymeRootClasses;
}

Openphacts.TreeSearch.prototype.parseChildNodes = function(response) {
	var constants = new Openphacts.Constants();
	var childResponse = {};
    var treeClasses = [];
    var label = response.primaryTopic.prefLabel;
    if ($.isArray(label)) {
	  label = label[0];
    }
    childResponse['label'] = label;
    if ($.isArray(response.primaryTopic.childNode)) {
	  $.each(response.primaryTopic.childNode, function(i, member) {
                var about = member["_about"];
                var names = [];
                if ($.isArray(member.prefLabel)) {
                    $.each(member.prefLabel, function(j, label) {
                        names.push(label);
                    });
                } else {
                   names.push(member.prefLabel);
                }
                treeClasses.push({uri: about, names: names});
	        });
        } else {
	        var about = response.primaryTopic.childNode["_about"];
            var names = [];
            if ($.isArray(response.primaryTopic.childNode.prefLabel)) {
                $.each(response.primaryTopic.childNode.prefLabel, function(j, label) {
                    names.push(label);
                });
            } else {
                names.push(response.primaryTopic.childNode.prefLabel);
            }
            treeClasses.push({uri: about, names: names});
        }
        childResponse['children'] = treeClasses;
	    return childResponse;
}

Openphacts.TreeSearch.prototype.parseParentNodes = function(response) {
	var constants = new Openphacts.Constants();
	var parentResponse = {};
    var treeClasses = [];
    var label = response.primaryTopic.prefLabel;
    if ($.isArray(label)) {
	  label = label[0];
    }
    parentResponse['label'] = label;
    if ($.isArray(response.primaryTopic.parentNode)) {
	  $.each(response.primaryTopic.parentNode, function(i, member) {
                var about = member["_about"];
                var names = [];
                if ($.isArray(member.prefLabel)) {
                    $.each(member.prefLabel, function(j, label) {
                        names.push(label);
                    });
                } else {
                   names.push(member.prefLabel);
                }
                treeClasses.push({uri: about, names: names});
	        });
        } else {
	        var about = response.primaryTopic.parentNode["_about"];
            var names = [];
            if ($.isArray(response.primaryTopic.parentNode.prefLabel)) {
                $.each(response.primaryTopic.parentNode.prefLabel, function(j, label) {
                    names.push(label);
                });
            } else {
                names.push(response.primaryTopic.parentNode.prefLabel);
            }
            treeClasses.push({uri: about, names: names});
        }
        parentResponse['parents'] = treeClasses;
	    return parentResponse;
}


Openphacts.TreeSearch.prototype.parseTargetClassPharmacologyCount = function(response) {
    var constants = new Openphacts.Constants();
	return response.primaryTopic[constants.TARGET_PHARMACOLOGY_COUNT];
}

Openphacts.TreeSearch.prototype.parseTargetClassPharmacologyPaginated = function(response) {
    var constants = new Openphacts.Constants();
    var records = [];
    $.each(response.items, function(i, item) {
      var targets = [];
      var chemblActivityURI = null, pmid = null, relation = null, standardUnits = null, standardValue = null, activityType = null, inDataset = null, fullMWT = null, chemblURI = null, cwURI = null, prefLabel = null, csURI = null, inchi = null, inchiKey = null, smiles = null, ro5Violations = null, targetURI = null, targetTitle = null, targetOrganism = null, assayURI = null, assayDescription = null, publishedRelation = null, publishedType = null, publishedUnits = null, publishedValue = null, standardUnits = null, standardValue = null, pChembl = null;
      chemblActivityURI = item["_about"];
      pmid = item.pmid;
      relation = item.relation ? item.relation : null;
      standardUnits = item.standardUnits;
      standardValue = item.standardValue ? item.standardValue : null;
      activityType = item.activity_type;
      inDataset = item[constants.IN_DATASET];
      forMolecule = item[constants.FOR_MOLECULE];
      chemblURI = forMolecule[constants.ABOUT] ? forMolecule[constants.ABOUT] : null;
      fullMWT = forMolecule[constants.FULL_MWT] ? forMolecule[constants.FULL_MWT] : null;
      pChembl = item.pChembl ? item.pChembl : null;
      $.each(forMolecule[constants.EXACT_MATCH], function(j, match) {
        var src = match[constants.IN_DATASET];
		if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
            cwURI = match[constants.ABOUT];
            prefLabel = match[constants.PREF_LABEL];
		} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
            csURI = match[constants.ABOUT];
            inchi = match[constants.INCHI];
            inchiKey = match[constants.INCHIKEY];
            smiles = match[constants.SMILES];
            ro5Violations = match[constants.RO5_VIOLATIONS] ? match[constants.RO5_VIOLATIONS] : null;
		}
      });
//TODO not sure where/if the targets are in 1.3
//      targetURI = item.target[constants.ABOUT];
//      targetTitle = item.target.title;
//      targetOrganism = item.target.organism;
//      if (item.target.exactMatch) {
//          $.each(item.target.exactMatch, function(j, match) {
//            targets.push(match);
//          });
//      }
      var onAssay = item[constants.ON_ASSAY];
      assayURI = onAssay["_about"] ? onAssay["_about"] : null;
      assayDescription = onAssay.description ? onAssay.description : null;
      publishedRelation = item.publishedRelation ? item.publishedRelation : null;
      publishedType = item.publishedType ? item.publishedType : null;
      publishedUnits = item.publishedUnits ? item.publishedUnits : null;
      publishedValue = item.publishedValue ? item.publishedValue : null;
      standardUnits = item.standardUnits ? item.standardUnits : null;
      records.push({
          //targets: targets,
          'chemblActivityURI': chemblActivityURI,
          'pmid': pmid,
          'relation': relation,
          'standardUnits': standardUnits,
          'standardValue': standardValue,
          'activityType': activityType,
          'inDataset': inDataset,
          'fullMWT': fullMWT,
          'chemblURI': chemblURI,
          'cwURI': cwURI,
          'prefLabel': prefLabel,
          'csURI': csURI,
          'inchi': inchi,
          'inchiKey': inchiKey,
          'smiles': smiles,
          'ro5Violations': ro5Violations,
          //targetURI: targetURI,
          //targetTitle: targetTitle,
          //targetOrganism: targetOrganism,
          'assayURI': assayURI,
          'assayDescription': assayDescription,
          'publishedRelation': publishedRelation,
          'publishedType': publishedType,
          'publishedUnits': publishedUnits,
          'publishedValue': publishedValue,
          'standardUnits': standardUnits,
          'pChembl': pChembl
      });
    });
    return records;
}
