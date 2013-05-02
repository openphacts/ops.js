Openphacts.TargetSearch = function TargetSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.TargetSearch.prototype.fetchTarget = function(targetURI, callback) {
	var targetQuery = $.ajax({
		url: this.baseURL + '/target',
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

Openphacts.TargetSearch.prototype.parseTargetResponse = function(response) {
	var drugbankData, chemblData, uniprotData;
	var cwUri = response["_about"];
	var id = cwUri.split("/").pop();
	var keywords = [];
	var classifiedWith = [];
	var seeAlso = [];
	$.each(response.exactMatch, function(i, exactMatch) {
		if (exactMatch["_about"]) {
			if (exactMatch["_about"].indexOf("http://www4.wiwiss.fu-berlin.de/drugbank") !== -1) {
				drugbankData = exactMatch;
			} else if (exactMatch["_about"].indexOf("http://linkedlifedata.com/resource/drugbank") !== -1) {
				drugbankData = exactMatch;
			} else if (exactMatch["_about"].indexOf("http://data.kasabi.com/dataset/chembl-rdf") !== -1) {
				chemblData = exactMatch;
				$.each(chemblData.keyword, function(j, key) {
					keywords.push(key);
				});
			} else if (exactMatch["_about"].indexOf("http://purl.uniprot.org") !== -1) {
				uniprotData = exactMatch;
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
			}
		}
	});
	return {
		id: id,
		cellularLocation: drugbankData ? drugbankData.cellularLocation : null,
		molecularWeight: drugbankData ? drugbankData.molecularWeight : null,
		numberOfResidues: drugbankData ? drugbankData.numberOfResidues : null,
		theoreticalPi: drugbankData ? drugbankData.theoreticalPi : null,
		drugbankURI: drugbankData ? drugbankData["_about"] : null,
		description: chemblData ? chemblData.description : null,
		subClassOf: chemblData ? chemblData.subClassOf : null,
		keywords: keywords,
		functionAnnotation: uniprotData ? uniprotData.Function_Annotation : null,
		alternativeName: uniprotData ? uniprotData.alternativeName : null,
		existence: uniprotData ? uniprotData.existence : null,
		organism: uniprotData ? uniprotData.organism : null,
		sequence: uniprotData ? uniprotData.sequence : null,
		classifiedWith: classifiedWith,
		seeAlso: seeAlso
	};
}

Openphacts.TargetSearch.prototype.parseTargetPharmacologyResponse = function(response) {
	var records = [];

	$.each(response.items, function(index, item) {
		var chembl_activity_uri = item["_about"];
		var chembl_src = item["inDataset"];

		//big bits
		var forMolecule = item["forMolecule"];
		var chembl_compound_uri;
		var compound_full_mwt;
		var compound_full_mwt_item;

		var em;
		var chembleMolecultLink = 'https://www.ebi.ac.uk/chembldb/compound/inspect/';

		if (forMolecule != null) {
			chembl_compound_uri = forMolecule["_about"];
			compound_full_mwt = forMolecule['full_mwt'];
			chembleMolecultLink += chembl_compound_uri.split('/').pop();
			compound_full_mwt_item = chembleMolecultLink;
			em = forMolecule["exactMatch"];
		}

		var cw_compound_uri, compound_pref_label, cw_src, cs_compound_uri, compound_inchi, compound_inchikey, compound_smiles, cs_src, drugbank_compound_uri, compound_drug_type, compound_generic_name, drugbank_src, csid, compound_pref_label_item, compound_inchi_item, compound_inchikey_item, compound_smiles_item, assay_description, assay_description_item;

		$.each(em, function(index, match) {
			var src = match["inDataset"];
			if (match["_about"].indexOf("http://www.conceptwiki.org") !== -1) {
				cw_compound_uri = match["_about"];
				compound_pref_label = match['prefLabel'];
				cw_src = match["inDataset"];
				compound_pref_label_item = cw_compound_uri;
			} else if (match["_about"].indexOf("chemspider.com") !== -1) {
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
			} else if (match["_about"].indexOf("http://www4.wiwiss.fu-berlin.de/drugbank") !== -1) {
				drugbank_compound_uri = match["_about"];
				compound_drug_type = match['drugType'];
				compound_generic_name = match['genericName'];
				drugbank_src = match["_about"];
			} else if (match["_about"].indexOf("http://linkedlifedata.com/resource/drugbank") !== -1) {
				drugbank_compound_uri = match["_about"];
				compound_drug_type = match['drugType'];
				compound_generic_name = match['genericName'];
				drugbank_src = match["_about"];
			}
		});

		var onAssay = item["onAssay"];
		var chembl_assay_uri;
		var assay_organism;
		var assay_organism_item;
		var target;
		var chembldAssayLink = 'https://www.ebi.ac.uk/chembldb/assay/inspect/';

		if (onAssay != null) {
			chembl_assay_uri = onAssay["_about"];
			assay_organism = onAssay['assay_organism'];
			assay_organism_item = chembldAssayLink + chembl_assay_uri.split('/').pop();
			assay_description = onAssay['description'];
			assay_description_item = chembldAssayLink + chembl_assay_uri.split('/').pop();
			target = onAssay['target'];
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

			target_organism = target['target_organism'];
			target_organism_item = chemblTargetLink + chembl_target_uri.split('/').pop();
			target_concatenated_uris = target['concatenatedURIs'];
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
		var activity_standard_value = item['standardValue'];
		activity_standard_value_item = chemblActivityLink;
		var activity_standard_units = item['standardUnits'];
		activity_standard_units_item = chemblActivityLink;
		var activity_relation = item['relation'];
		activity_relation_item = chemblActivityLink;
		var activity_pubmed_id = item['pmid'];
		records.push({ //for compound
			compound_inchikey: compound_inchikey,
			compound_drug_type: compound_drug_type,
			compound_generic_name: compound_generic_name,
			target_title: target_title,
			target_concatenated_uris: target_concatenated_uris,

			compound_inchikey_src: cs_src,
			compound_drug_type_src: drugbank_src,
			compound_generic_name_src: drugbank_src,
			target_title_src: chembl_src,
			target_concatenated_uris_src: chembl_src,


			//for target
			chembl_activity_uri: chembl_activity_uri,
			chembl_compound_uri: chembl_compound_uri,
			compound_full_mwt: compound_full_mwt,
			cw_compound_uri: cw_compound_uri,
			compound_pref_label: compound_pref_label,
			cs_compound_uri: cs_compound_uri,
			csid: csid,
			compound_inchi: compound_inchi,
			compound_smiles: compound_smiles,
			chembl_assay_uri: chembl_assay_uri,
			chembl_target_uri: chembl_target_uri,

			target_organism: target_organism,
			target_organisms: target_organisms,
			target_pref_label: target_pref_label,

			assay_organism: assay_organism,
			assay_description: assay_description,
			activity_relation: activity_relation,
			activity_standard_units: activity_standard_units,
			activity_standard_value: activity_standard_value,
			activity_activity_type: activity_activity_type,
			activity_pubmed_id: activity_pubmed_id,

			compound_full_mwt_src: chembl_src,
			compound_pref_label_src: cw_src,
			compound_inchi_src: cs_src,
			compound_smiles_src: cs_src,
			target_organism_src: chembl_src,
			target_pref_label_src: cw_src,
			assay_organism_src: chembl_src,
			assay_description_src: chembl_src,
			activity_relation_src: chembl_src,
			activity_standard_units_src: chembl_src,
			activity_standard_value_src: chembl_src,
			activity_activity_type_src: chembl_src,

			compound_pref_label_item: compound_pref_label_item,
			activity_activity_type_item: activity_activity_type_item,
			activity_relation_item: activity_relation_item,
			activity_standard_value_item: activity_standard_value_item,
			activity_standard_units_item: activity_standard_units_item,
			compound_full_mwt_item: compound_full_mwt_item,
			compound_smiles_item: compound_smiles_item,
			compound_inchi_item: compound_inchi_item,
			compound_inchikey_item: compound_inchikey_item,
			target_pref_label_item: target_pref_label_item,
			assay_organism_item: assay_organism_item,
			assay_description_item: assay_description_item,
			target_organism_item: target_organism_item,
			targets: targets
		});
	});
	return records;
}
