Openphacts.TargetSearch = function TargetSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.TargetSearch.prototype.fetchTarget = function(targetURI, callback) {
	var targetQuery = $.ajax({
		url: this.baseURL + '/target',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			uri: targetURI,
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

Openphacts.TargetSearch.prototype.targetPharmacology = function(targetURI, page, pageSize, callback) {
	var targetQuery = $.ajax({
		url: this.baseURL + '/target/pharmacology/pages',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			_page: page,
			_pageSize: pageSize,
			uri: targetURI,
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

Openphacts.TargetSearch.prototype.targetPharmacologyCount = function(targetURI, callback) {
	var targetQuery = $.ajax({
		url: this.baseURL + '/target/pharmacology/count',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			uri: targetURI,
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

Openphacts.TargetSearch.prototype.parseTargetResponse = function(response) {
    var constants = new Openphacts.Constants();
	var drugbankData = null, chemblData = null, uniprotData = null, cellularLocation = null, molecularWeight = null, numberOfResidues = null, theoreticalPi = null, drugbankURI = null, functionAnnotation  =null, alternativeName = null, existence = null, organism = null, sequence = null, uniprotURI = null;
	var cwUri = response[constants.ABOUT];
	var id = cwUri.split("/").pop();
	var keywords = [];
	var classifiedWith = [];
	var seeAlso = [];
    var chemblItems = [];
    var label = response[constants.PREF_LABEL];
	$.each(response[constants.EXACT_MATCH], function(i, exactMatch) {
        var src = exactMatch[constants.IN_DATASET];
		if (src) {
			if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
				drugbankData = exactMatch;
                cellularLocation = drugbankData.cellularLocation ? drugbankData.cellularLocation : null;
                numberOfResidues = drugbankData.numberOfResidues ? drugbankData.numberOfResidues : null;
                theoreticalPi = drugbankData.theoreticalPi ? drugbankData.theoreticalPi : null;
                drugbankURI = drugbankData[constants.ABOUT] ? drugbankData[constants.ABOUT] : null;
			} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemblValue') {
                // there can be multiple proteins per target response
			    chemblData = exactMatch;
                var chemblLinkOut = 'https://www.ebi.ac.uk/chembldb/target/inspect/';
                chemblDataItem = {};
                chemblDataItem['chembl_src'] = chemblData[constants.IN_DATASET];
                chemblUri = chemblData[constants.ABOUT];
                chemblLinkOut += chemblUri.split('/').pop();
                chemblDataItem['linkOut'] = chemblLinkOut;
                // synomnys
                var synonmysData;
                if (chemblData[constants.LABEL]) {
                    synonymsData = chemblData[constants.LABEL];
                }
                chemblDataItem['synonyms'] = synonymsData;
                var targetComponents = {};
                if (chemblData[constants.HAS_TARGET_COMPONENT]) {
                    $.each(chemblData[constants.HAS_TARGET_COMPONENT], function(index, targetComponent) {
                      targetComponents[targetComponent[constants.ABOUT]] = targetComponent.description;
                    });
                }
                chemblDataItem['targetComponents'] = targetComponents;
                chemblDataItem['type'] = chemblData.type;
                if (chemblData.keyword) {
				  $.each(chemblData.keyword, function(j, key) {
				 keywords.push(key);
				  });
                }
                chemblDataItem['keywords'] = keywords;
                chemblItems.push(chemblDataItem);
			} else if (constants.SRC_CLS_MAPPINGS[src] == 'uniprotValue') {
				uniprotData = exactMatch;
                uniprotURI = uniprotData[constants.ABOUT];
				if (uniprotData.classifiedWith) {
					$.each(uniprotData.classifiedWith, function(j, classified) {
						classifiedWith.push(classified);
					});
				}
				if (uniprotData.seeAlso) {
					$.each(uniprotData.seeAlso, function(j, see) {
						seeAlso.push(see);
					});
				}
                molecularWeight =  uniprotData.molecularWeight ? uniprotData.molecularWeight: null;
	            functionAnnotation = uniprotData.Function_Annotation ? uniprotData.Function_Annotation : null;
                alternativeName = uniprotData.alternativeName ? uniprotData.alternativeName : null;
	            existence = uniprotData.existence ? uniprotData.existence : null;
	            organism = uniprotData.organism ? uniprotData.organism : null;
	            sequence = uniprotData.sequence ? uniprotData.sequence : null;
			} else if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
                  // if using a chembl id to search then the about would be a chembl id rather than the
                  // cw one which we want
                  id = exactMatch[constants.ABOUT].split("/").pop();
                  label = exactMatch[constants.PREF_LABEL];
            }
		}
	});

	return {
		id: id,
		cellularLocation: cellularLocation,
		molecularWeight: molecularWeight,
		numberOfResidues: numberOfResidues,
		theoreticalPi: theoreticalPi,
		drugbankURI: drugbankURI,
		keywords: keywords,
		functionAnnotation: functionAnnotation,
		alternativeName: alternativeName,
		existence: existence,
		organism: organism,
		sequence: sequence,
		classifiedWith: classifiedWith,
		seeAlso: seeAlso,
        prefLabel: label,
        chemblItems: chemblItems,
        cwURI: cwUri
	};
}

Openphacts.TargetSearch.prototype.parseTargetPharmacologyResponse = function(response) {
    var constants = new Openphacts.Constants();
	var records = [];

	$.each(response.items, function(index, item) {
		var chembl_activity_uri = item["_about"];
		var chembl_src = item["inDataset"];

		//big bits
		var forMolecule = item[constants.FOR_MOLECULE];
		var chembl_compound_uri;
		var compound_full_mwt;
		var compound_full_mwt_item;

		var em;
		var chembleMoleculeLink = 'https://www.ebi.ac.uk/chembldb/compound/inspect/';

		if (forMolecule != null) {
			chembl_compound_uri = forMolecule["_about"];
			compound_full_mwt = forMolecule['full_mwt'];
			chembleMoleculeLink += chembl_compound_uri.split('/').pop();
			compound_full_mwt_item = chembleMoleculeLink;
			em = forMolecule["exactMatch"];
		}

		var cw_compound_uri = null, compound_pref_label = null, cw_src = null, cs_compound_uri = null, compound_inchi = null, compound_inchikey = null, compound_smiles = null, cs_src = null, drugbank_compound_uri = null, compound_drug_type = null, compound_generic_name = null, drugbank_src = null, csid = null, compound_pref_label_item = null, compound_inchi_item = null, compound_inchikey_item = null, compound_smiles_item = null, assay_description = null, assay_description_item = null;

		$.each(em, function(index, match) {
          var src = match[constants.IN_DATASET];
          if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
              cw_compound_uri = match["_about"];
              compound_pref_label = match['prefLabel'];
              cw_src = match["inDataset"];
              compound_pref_label_item = cw_compound_uri;
          } else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
              cs_compound_uri = match["_about"];
              csid = cs_compound_uri.split('/').pop();
              compound_inchi = match['inchi'];
              compound_inchikey = match['inchikey'];
              compound_smiles = match['smiles'];
              cs_src = match["inDataset"];
              var chemSpiderLink = 'http://www.chemspider.com/' + csid;
              compound_inchi_item = chemSpiderLink;
              compound_inchikey_item = chemSpiderLink;
              compound_smiles_item = chemSpiderLink;
          }// else if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
           //   drugbank_compound_uri = match["_about"];
           //   compound_drug_type = match['drugType'];
           //   compound_generic_name = match['genericName'];
           //   drugbank_src = match["_about"];
          //}
        });

		var onAssay = item[constants.ON_ASSAY];
		var chembl_assay_uri;
		var assay_organism;
		var assay_organism_item;
		var target;
		var chembldAssayLink = 'https://www.ebi.ac.uk/chembldb/assay/inspect/';

		if (onAssay != null) {
			chembl_assay_uri = onAssay[constants.ABOUT];
			assay_organism = onAssay['assay_organism'];
			assay_organism_item = chembldAssayLink + chembl_assay_uri.split('/').pop();
			assay_description = onAssay['description'];
			//assay_description_item = chembldAssayLink + chembl_assay_uri.split('/').pop();
			target = onAssay[constants.ON_TARGET];
		}
		var chembl_target_uri;
		var target_pref_label;
		var target_pref_label_item;
		var targetMatch;
		var target_title;
		var target_organism;
		var target_organism_item;
		var target_concatenated_uris;
		var chemblTargetLink = 'https://www.ebi.ac.uk/chembldb/target/inspect/';
		var target_organisms = new Array();
		var targets = new Array();
		if (target != null) {
			chembl_target_uri = target["_about"];
			//target_pref_label = target['prefLabel'];
			targetMatch = target['exactMatch'];
			if (targetMatch != null) {
				var targetMatchURI = targetMatch["_about"];
				target_pref_label = targetMatch['prefLabel'];
				target_pref_label_item = targetMatchURI;
				target_title = target_pref_label;
			}

			target_organism = target['targetOrganismName'];
			target_organism_item = chemblTargetLink + chembl_target_uri.split('/').pop();
			//target_concatenated_uris = target['concatenatedURIs'];
			var target_organisms_inner = {};
			target_organisms_inner['organism'] = target_organism;
			target_organisms_inner['src'] = target_organism_item;
			target_organisms.push(target_organisms_inner);
			var targets_inner = {};
			targets_inner['title'] = target_pref_label;
			targets_inner['cw_uri'] = target_pref_label_item;
			targets.push(targets_inner);
		}

		var chemblActivityLink = 'https://www.ebi.ac.uk/ebisearch/crossrefsearch.ebi?id=' + chembl_activity_uri.split('/a').pop() + '&db=chembl-activity&ref=chembl-compound';

		var activity_activity_type_item, activity_standard_value_item, activity_standard_units_item, activity_relation_item;

		var activity_activity_type = item['activity_type'];
		activity_activity_type_item = chemblActivityLink;
		var activity_standard_value = item['activity_value'];
		activity_standard_value_item = chemblActivityLink;
		var activity_standard_units = item['standardUnits'];
		activity_standard_units_item = chemblActivityLink;
		var activity_relation = item['activity_relation'];
		activity_relation_item = chemblActivityLink;
		var activity_pubmed_id = item['pmid'];
		records.push({ //for compound
			compoundInchikey: compound_inchikey,
			//compoundDrugType: compound_drug_type,
			//compoundGenericName: compound_generic_name,
			targetTitle: target_title,
			targetConcatenatedUris: target_concatenated_uris,

			compoundInchikeySrc: cs_src,
			//compoundDrugTypeSrc: drugbank_src,
			//compoundGenericNameSrc: drugbank_src,
			targetTitleSrc: chembl_src,
			//targetConcatenatedUrisSrc: chembl_src,


			//for target
			chemblActivityUri: chembl_activity_uri,
			chemblCompoundUri: chembl_compound_uri,
			compoundFullMwt: compound_full_mwt,
			cwCompoundUri: cw_compound_uri,
			compoundPrefLabel: compound_pref_label,
			csCompoundUri: cs_compound_uri,
			csid: csid,
			compoundInchi: compound_inchi,
			compoundSmiles: compound_smiles,
			chemblAssayUri: chembl_assay_uri,
			chemblTargetUri: chembl_target_uri,

			//targetOrganism: target_organism,
			targetOrganisms: target_organisms,
			//targetPrefLabel: target_pref_label,

			assayOrganism: assay_organism,
			assayDescription: assay_description,
			activityRelation: activity_relation,
			activityStandardUnits: activity_standard_units,
			activityStandardValue: activity_standard_value,
			activityActivityType: activity_activity_type,
			activityPubmedId: activity_pubmed_id,

			compoundFullMwtSrc: chembl_src,
			compoundPrefLabelSrc: cw_src,
			compoundInchiSrc: cs_src,
			compoundSmilesSrc: cs_src,
			//targetOrganismSrc: chembl_src,
			targetPrefLabelSrc: cw_src,
			assayOrganismSrc: chembl_src,
			assayDescriptionSrc: chembl_src,
			activityRelationSrc: chembl_src,
			activityStandardUnits_src: chembl_src,
			activityStandardValue_src: chembl_src,
			activityActivityType_src: chembl_src,

			compoundPrefLabelItem: compound_pref_label_item,
			activityActivityTypeItem: activity_activity_type_item,
			activityRelationItem: activity_relation_item,
			activityStandardValueItem: activity_standard_value_item,
			activityStandardUnitsItem: activity_standard_units_item,
			compoundFullMwtItem: compound_full_mwt_item,
			compoundSmilesItem: compound_smiles_item,
			compoundInchiItem: compound_inchi_item,
			compoundInchikeyItem: compound_inchikey_item,
			//targetPrefLabelItem: target_pref_label_item,
			assayOrganismItem: assay_organism_item,
			//assayDescriptionItem: assay_description_item,
		    //targetOrganismItem: target_organism_item,
			targets: targets
		});
	});
	return records;
}

Openphacts.TargetSearch.prototype.parseTargetPharmacologyCountResponse = function(response) {
    return response.primaryTopic.targetPharmacologyTotalResults;
}
