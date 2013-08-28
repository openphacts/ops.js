Openphacts.CompoundSearch = function CompoundSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.CompoundSearch.prototype.fetchCompound = function(compoundURI, callback) {
	var compoundQuery = $.ajax({
		url: this.baseURL + '/compound',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			uri: compoundURI,
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

Openphacts.CompoundSearch.prototype.compoundPharmacology = function(compoundURI, page, pageSize, callback) {
	var compoundQuery = $.ajax({
		url: this.baseURL + '/compound/pharmacology/pages',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			_page: page,
			_pageSize: pageSize,
			uri: compoundURI,
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

Openphacts.CompoundSearch.prototype.compoundPharmacologyCount = function(compoundURI, callback) {
	var compoundQuery = $.ajax({
		url: this.baseURL + '/compound/pharmacology/count',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			uri: compoundURI,
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

Openphacts.CompoundSearch.prototype.parseCompoundResponse = function(response) {
    var constants = new Openphacts.Constants();
	var drugbankData, chemspiderData, chemblData;
	var cwUri = response[constants.ABOUT];
	var id = cwUri.split("/").pop();
	var prefLabel = response.prefLabel;
	$.each(response.exactMatch, function(i, match) {
        var src = match[constants.IN_DATASET];
		if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
			drugbankData = match;
		} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
			chemspiderData = match;
		} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemblValue') {
			chemblData = match;
		}
	});
	return {
		id: id,
		prefLabel: prefLabel,
		cwURI: cwUri,
		description: drugbankData ? drugbankData.description : null,
		biotransformationItem: drugbankData ? drugbankData.biotransformation : null,
		toxicity: drugbankData ? drugbankData.toxicity : null,
		proteinBinding: drugbankData ? drugbankData.proteinBinding : null,
		csURI: chemspiderData ? chemspiderData["_about"] : null,
		hba: chemspiderData ? chemspiderData.hba : null,
		hbd: chemspiderData ? chemspiderData.hbd : null,
		inchi: chemspiderData ? chemspiderData.inchi : null,
		logp: chemspiderData ? chemspiderData.logp : null,
		psa: chemspiderData ? chemspiderData.psa : null,
		ro5Violations: chemspiderData ? chemspiderData.ro5_violations : null,
		smiles: chemspiderData ? chemspiderData.smiles : null,
		chemblURI: chemblData ? chemblData["_about"] : null,
		fullMWT: chemblData ? chemblData.full_mwt : null,
		molform: chemblData ? chemblData[constants.MOLFORM] : null,
		mwFreebase: chemblData ? chemblData.mw_freebase : null,
		rtb: chemblData ? chemblData.rtb : null,
        inchiKey: chemspiderData ? chemspiderData.inchikey : null,
        drugbankURI: drugbankData ? drugbankData[constants.ABOUT] : null
	};
}

Openphacts.CompoundSearch.prototype.parseCompoundPharmacologyResponse = function(response) {
    var constants = new Openphacts.Constants();
	var records = [];

	$.each(response.items, function(i, item) {

		var chembl_activity_uri = item[constants.ABOUT];
		var chembl_src = item[constants.IN_DATASET];
        // according to the API docs pmid can be an array but an array of what?
		var activity_pubmed_id = item['pmid'] ? item['pmid'] : null;
		var activity_relation = item['relation'] ? item['relation'] : null;
		var activity_standard_units = item['standardUnits'] ? item['standardUnits'] : null;
		var activity_standard_value = item['standardValue'] ? item['standardValue'] : null;
		var activity_activity_type = item['activity_type'] ? item['activity_type'] : null;
        var pChembl = item['pChembl'] ? item['pChembl'] : null;

		var compound_full_mwt_item = null;

		//big bits
		var forMolecule = item[constants.FOR_MOLECULE];
		var chembleMoleculeLink = 'https://www.ebi.ac.uk/chembldb/compound/inspect/';
		if (forMolecule != null) {
			var chembl_compound_uri = forMolecule[constants.ABOUT];
			var compound_full_mwt = forMolecule['full_mwt'] ? forMolecule['full_mwt'] : null;
			chembleMoleculeLink += chembl_compound_uri.split('/').pop();
			compound_full_mwt_item = chembleMoleculeLink;
			var em = forMolecule["exactMatch"];
		}

		var cw_compound_uri = null, compound_pref_label = null, cw_src = null, cs_compound_uri = null, compound_inchi = null, compound_inchikey = null, compound_smiles = null, cs_src = null, drugbank_compound_uri = null, compound_drug_type = null, compound_generic_name = null, drugbank_src = null, csid = null, compound_smiles_item = null, compound_inchi_item = null, compound_inchikey_item = null, compound_pref_label_item = null;
        var chemblMolecule = em[constants.ABOUT];
		$.each(em, function(index, match) {
          var src = match[constants.IN_DATASET];
			if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
				cw_compound_uri = match[constants.ABOUT];
				compound_pref_label = match[constants.PREF_LABEL];
				compound_pref_label_item = cw_compound_uri;
				cw_src = match["inDataset"];
			} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
				cs_compound_uri = match[constants.ABOUT];
				csid = cs_compound_uri.split('/').pop();
				compound_inchi = match['inchi'];
				compound_inchikey = match['inchikey'];
				compound_smiles = match['smiles'];
				var chemSpiderLink = 'http://www.chemspider.com/' + csid;
				compound_smiles_item = chemSpiderLink;
				compound_inchi_item = chemSpiderLink;
				compound_inchikey_item = chemSpiderLink;
				cs_src = match["inDataset"];
			} else if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
				drugbank_compound_uri = match[constants.ABOUT];
				compound_drug_type = match['drugType'];
				compound_generic_name = match['genericName'];
				drugbank_src = match[constants.ABOUT];
			}
		});

		var target_title_item = null, target_organism_item = null, activity_activity_type_item = null, activity_standard_value_item = null, activity_standard_units_item = null, activity_relation_item = null, assay_description = null, assay_description_item = null, assay_organism = null, assay_organism_src = null, assay_organism_item = null;

		var onAssay = item[constants.ON_ASSAY];
		if (onAssay != null) {
			var chembl_assay_uri = onAssay[constants.ABOUT];
			var chembldAssayLink = 'https://www.ebi.ac.uk/chembldb/assay/inspect/';
			assay_description = onAssay['description'];
			var chembleAssayLink = chembldAssayLink + chembl_assay_uri.split('/').pop();
			assay_description_item = chembleAssayLink;
			assay_organism = onAssay['organism'] ? onAssay['organism']: null;
			assay_organism_item = chembleAssayLink;

			var target = onAssay[constants.ON_TARGET];
			var targets = [];
			var target_organisms = [];

            if ($.isArray(target)) {
			    $.each(target, function(index, target_item) {	
				  // For Target
				  var target_inner = {};
			      target_inner['title'] = target_item['title']
				  target_inner['src'] = onAssay["inDataset"] ? onAssay["inDataset"] : '';
				  if (target_item["_about"]) {
                      target_inner['about'] = target_item['_about'];
                      var targetLink = 'https://www.ebi.ac.uk/chembl/target/inspect/' + target_item["_about"].split('/').pop();
					  target_inner['item'] = targetLink;
				  } else {
                      target_inner['item'] = '';
                  }
                  targets.push(target_inner);

                  // For Organism
                  var organism_inner = {};
                  organism_inner['organism'] = target_item['organism'] ? target_item['organism'] : '';
                  organism_inner['src'] = onAssay["inDataset"] ? onAssay["inDataset"] : '';
                  if (target_item["_about"]) {
                      var organismLink = 'https://www.ebi.ac.uk/chembl/target/inspect/' + target_item["_about"].split('/').pop();
                      organism_inner['item'] = organismLink;
                  } else {
                      organism_inner['item'] = '';
                  }
                  target_organisms.push(organism_inner);
                });
            } else {	
		        // For Target
                var target_inner = {};
                target_inner['title'] = target['title']
                target_inner['src'] = onAssay["inDataset"] ? onAssay["inDataset"] : '';
                if (target["_about"]) {
                    target_inner['about'] = target['_about'];
                    var targetLink = 'https://www.ebi.ac.uk/chembl/target/inspect/' + target["_about"].split('/').pop();
                    target_inner['item'] = targetLink;
                } else {
                    target_inner['item'] = '';
                }
                targets.push(target_inner);

                // For Organism
			    var organism_inner = {};
                organism_inner['organism'] = target['organism'] ? target['organism'] : '';
                organism_inner['src'] = onAssay["inDataset"] ? onAssay["inDataset"] : '';
                if (target["_about"]) {
                    var organismLink = 'https://www.ebi.ac.uk/chembl/target/inspect/' + target["_about"].split('/').pop();
                    organism_inner['item'] = organismLink;
                } else {
                    organism_inner['item'] = '';
                }
                target_organisms.push(organism_inner);
            }
        }

        var chemblActivityLink = 'https://www.ebi.ac.uk/ebisearch/crossrefsearch.ebi?id=' + chembl_activity_uri.split('/a').pop() + '&db=chembl-activity&ref=chembl-compound';

        activity_activity_type_item = chemblActivityLink;
        activity_standard_value_item = chemblActivityLink;
        activity_standard_units_item = chemblActivityLink;
        activity_relation_item = chemblActivityLink;
		records.push({
			//for compound
			compoundInchikey: compound_inchikey,
			compoundDrugType: compound_drug_type,
			compoundGenericName: compound_generic_name,
			targets: targets,
			compoundInchikeySrc: cs_src,
			compoundDrugTypeSrc: drugbank_src,
			compoundGenericNameSrc: drugbank_src,
			targetTitleSrc: chembl_src,
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
			targetOrganisms: target_organisms,
			assayOrganism: assay_organism,
			assayDescription: assay_description,
			activity_Relation: activity_relation,
			activityStandardUnits: activity_standard_units,
			activityStandardValue: activity_standard_value,
			activityActivityType: activity_activity_type,

			compoundFullMwtSrc: chembl_src,
			compoundPrefLabel_src: cw_src,
			compoundInchiSrc: cs_src,
			compoundSmilesSrc: cs_src,
			targetOrganismSrc: chembl_src,
			assayOrganismSrc: chembl_src,
			assayDescriptionSrc: chembl_src,
			activityRelationSrc: chembl_src,
			activityStandardUnitsSrc: chembl_src,
			activityStandardValueSrc: chembl_src,
			activityActivityTypeSrc: chembl_src,
			activityPubmedId: activity_pubmed_id,
			assayDescriptionItem: assay_description_item,
			assayOrganismItem: assay_organism_item,
			activityActivityTypeItem: activity_activity_type_item,
			activityRelationItem: activity_relation_item,
			activityStandardValueItem: activity_standard_value_item,
			activityStandardUnitsItem: activity_standard_units_item,
			compoundFullMwtItem: compound_full_mwt_item,
			compoundSmilesItem: compound_smiles_item,
			compoundInchiItem: compound_inchi_item,
			compoundInchikeyItem: compound_inchikey_item,
			compoundPrefLabelItem: compound_pref_label_item,
            pChembl: pChembl
		});
	});
	return records;
}

Openphacts.CompoundSearch.prototype.parseCompoundPharmacologyCountResponse = function(response) {
    return response.primaryTopic.compoundPharmacologyTotalResults;
}
