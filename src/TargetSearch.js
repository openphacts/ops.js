//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.
/**
 * @constructor
 * @param {string} baseURL - URL for the Open PHACTS API
 * @param {string} appID - Application ID for the application being used. Created by https://dev.openphacts.org
 * @param {string} appKey - Application Key for the application ID.
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author Ian Dunlop
 */
Openphacts.TargetSearch = function TargetSearch(baseURL, appID, appKey) {
    this.baseURL = baseURL;
    this.appID = appID;
    this.appKey = appKey;
}

/**
 * Fetch the target represented by the URI provided.
 * @param {string} URI - The URI for the target of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new Openphacts.TargetSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var targetResult = searcher.parseTargetResponse(response);
 * };
 * searcher.fetchTarget('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', null, callback);
 */
Openphacts.TargetSearch.prototype.fetchTarget = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
    var targetQuery = $.ajax({
        url: this.baseURL + '/target',
        dataType: 'json',
        cache: true,
        data: params,
        success: function(response, status, request) {
            //return the primaryTopic so we can use the same parser for this and batch
            callback.call(this, true, request.status, response.result.primaryTopic);
        },
        error: function(request, status, error) {
            callback.call(this, false, request.status);
        }
    });
}

/**
 * Fetch the targets represented by the URIs provided.
 * @param {string} URIList - The URIs for the targets of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new Openphacts.TargetSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var targets = searcher.parseTargetBatchResponse(response);
 * };
 * searcher.fetchTargetBatch(['http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', 'http://www.conceptwiki.org/concept/7b21c06f-0343-4fcc-ab0f-a74ffe871ade'], null, callback);
 */
Openphacts.TargetSearch.prototype.fetchTargetBatch = function(URIList, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    var URIs = URIList.join('|');
    params['uri_list'] = URIs;
    lens ? params['_lens'] = lens : '';
    var targetQuery = $.ajax({
        url: this.baseURL + '/target/batch',
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

/**
 * The hierarchy classes for the different Compounds that interact with a given Target.
 * @param {string} URI - The URI for the target of interest.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new Openphacts.TargetSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var targetResult = searcher.parseTargetResponse(response);
 * };
 * searcher.compoundsForTarget('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', callback);
 */
Openphacts.TargetSearch.prototype.compoundsForTarget = function(URI, callback) {
    var targetQuery = $.ajax({
        url: this.baseURL + '/target/classificationsForCompounds',
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

/**
 * Fetch pharmacology records for the target represented by the URI provided.
 * @param {string} URI - The URI for the target of interest
 * @param {string} [assayOrganism] - Filter by assay organism eg Homo Sapiens
 * @param {string} [targetOrganism] - Filter by target organism eg Rattus Norvegicus
 * @param {string} [activityType] - Filter by activity type eg IC50
 * @param {string} [activityValue] - Return pharmacology records with activity values equal to this number
 * @param {string} [minActivityValue] - Return pharmacology records with activity values greater than or equal to this number
 * @param {string} [minExActivityValue] - Return pharmacology records with activity values greater than this number
 * @param {string} [maxActivityValue] - Return pharmacology records with activity values less than or equal to this number
 * @param {string} [maxExActivityValue] - Return pharmacology records with activity values less than this number
 * @param {string} [activityUnit] - Return pharmacology records which have this activity unit eg nanomolar
 * @param {string} [activityRelation] - Return pharmacology records which have this activity relation eg =
 * @param {string} [pChembl] - Return pharmacology records with pChembl equal to this number
 * @param {string} [minpChembl] - Return pharmacology records with pChembl values greater than or equal to this number
 * @param {string} [minExpChembl] - Return pharmacology records with pChembl values greater than this number
 * @param {string} [maxpChembl] - Return pharmacology records with pChembl values less than or equal to this number
 * @param {string} [maxExpChembl] - Return pharmacology records with pChembl values less than this number
 * @param {string} [targetType] - Filter by one of the available target types. e.g. single_protein
 * @param {string} [page=1] - Which page of records to return.
 * @param {string} [pageSize=10] - How many records to return. Set to 'all' to return all records in a single page
 * @param {string} [orderBy] - Order the records by this field eg ?assay_type or DESC(?assay_type)
 * @param {string} [lens] - Which chemistry lens to apply to the records
 * @param {requestCallback} callback - Function that will be called with the result
 * @method
 * @example
 * var searcher = new Openphacts.TargetSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
 * var callback=function(success, status, response){
 *     var pharmacologyResult == searcher.parseTargetPharmacologyResponse(response);
 * };
 * searcher.targetPharmacology('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, 20, null, null, callback);
 */
Openphacts.TargetSearch.prototype.targetPharmacology = function(URI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, activityRelation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, page, pageSize, orderBy, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    assayOrganism ? params['assay_organism'] = assayOrganism : '';
    targetOrganism ? params['target_organism'] = targetOrganism : '';
    activityType ? params['activity_type'] = activityType : '';
    activityValue ? params['activity_value'] = activityValue : '';
    minActivityValue ? params['min-activity_value'] = minActivityValue : '';
    minExActivityValue ? params['minEx-activity_value'] = minExActivityValue : '';
    maxActivityValue ? params['max-activity_value'] = maxActivityValue : '';
    maxExActivityValue ? params['maxEx-activity_value'] = maxExActivityValue : '';
    activityUnit ? params['activity_unit'] = activityUnit : '';
    activityRelation ? params['activity_relation'] = activityRelation : '';
    pChembl ? params['pChembl'] = pChembl : '';
    minpChembl ? params['min-pChembl'] = minpChembl : '';
    minExpChembl ? params['minEx-pChembl'] = minExpChembl : '';
    maxpChembl ? params['max-pChembl'] = maxpChembl : '';
    maxExpChembl ? params['maxEx-pChembl'] = maxExpChembl : '';
    targetType ? params['target_type'] = targetType : '';
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    orderBy ? params['_orderBy'] = orderBy : '';
    lens ? params['_lens'] = lens : '';

    var targetQuery = $.ajax({
        url: this.baseURL + '/target/pharmacology/pages',
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

/**
 * Fetch a count of the pharmacology records belonging to the target represented by the URI provided.
 * @param {string} URI - The URI for the target of interest
 * @param {string} [assayOrganism] - Filter by assay organism eg Homo Sapiens
 * @param {string} [targetOrganism] - Filter by target organism eg Rattus Norvegicus
 * @param {string} [activityType] - Filter by activity type eg IC50
 * @param {string} [activityValue] - Return pharmacology records with activity values equal to this number
 * @param {string} [minActivityValue] - Return pharmacology records with activity values greater than or equal to this number
 * @param {string} [minExActivityValue] - Return pharmacology records with activity values greater than this number
 * @param {string} [maxActivityValue] - Return pharmacology records with activity values less than or equal to this number
 * @param {string} [maxExActivityValue] - Return pharmacology records with activity values less than this number
 * @param {string} [activityUnit] - Return pharmacology records which have this activity unit eg nanomolar
 * @param {string} [activityRelation] - Return pharmacology records which have this activity relation eg =
 * @param {string} [pChembl] - Return pharmacology records with pChembl equal to this number
 * @param {string} [minpChembl] - Return pharmacology records with pChembl values greater than or equal to this number
 * @param {string} [minExpChembl] - Return pharmacology records with pChembl values greater than this number
 * @param {string} [maxpChembl] - Return pharmacology records with pChembl values less than or equal to this number
 * @param {string} [maxExpChembl] - Return pharmacology records with pChembl values less than this number
 * @param {string} [targetType] - Filter by one of the available target types. e.g. single_protein
 * @param {string} [lens] - Which chemistry lens to apply to the records
 * @param {requestCallback} callback - Function that will be called with the result
 * @method
 * @example
 * var searcher = new Openphacts.TargetSearch("https://beta.openphacts.org/1.4", "appID", "appKey");
 * var callback=function(success, status, response){
 *     var pharmacologyResult == searcher.parseTargetPharmacologyCountResponse(response);
 * };
 * searcher.targetPharmacologyCount('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, callback);
 */
Openphacts.TargetSearch.prototype.targetPharmacologyCount = function(URI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, activityRelation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    assayOrganism ? params['assay_organism'] = assayOrganism : '';
    targetOrganism ? params['target_organism'] = targetOrganism : '';
    activityType ? params['activity_type'] = activityType : '';
    activityValue ? params['activity_value'] = activityValue : '';
    minActivityValue ? params['min-activity_value'] = minActivityValue : '';
    minExActivityValue ? params['minEx-activity_value'] = minExActivityValue : '';
    maxActivityValue ? params['max-activity_value'] = maxActivityValue : '';
    maxExActivityValue ? params['maxEx-activity_value'] = maxExActivityValue : '';
    activityUnit ? params['activity_unit'] = activityUnit : '';
    activityRelation ? params['activity_relation'] = activityRelation : '';
    pChembl ? params['pChembl'] = pChembl : '';
    minpChembl ? params['min-pChembl'] = minpChembl : '';
    minExpChembl ? params['minEx-pChembl'] = minExpChembl : '';
    maxpChembl ? params['max-pChembl'] = maxpChembl : '';
    maxExpChembl ? params['maxEx-pChembl'] = maxExpChembl : '';
    targetType ? params['target_type'] = targetType : '';
    lens ? params['_lens'] = lens : '';

    var targetQuery = $.ajax({
        url: this.baseURL + '/target/pharmacology/count',
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

/**
 * A list of target types
 * @param {string} lens - Which chemistry lens to apply to the result
 * @param {requestCallback} callback - Function that will be called with the result
 * @method
 */
Openphacts.TargetSearch.prototype.targetTypes = function(lens, callback) {
    var targetQuery = $.ajax({
        url: this.baseURL + '/target/types',
        dataType: 'json',
        cache: true,
        data: {
            _format: "json",
            lens: lens,
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

/**
 * Parse a block of uniprot data for a target
 * @param {Object} uniprotBlock - JSON containing some Uniprot data for a target
 * @returns {Object} Flattened uniprot response
 * @method
 */
Openphacts.TargetSearch.prototype.parseUniprotBlock = function(uniprotBlock) {
    var constants = new Openphacts.Constants();
    var uniprotData = uniprotBlock;
    var uniprotURI = uniprotData[constants.ABOUT];
    var classifiedWith = [];
    var seeAlso = [];
    if (uniprotData.classifiedWith) {
        Openphacts.arrayify(uniprotData.classifiedWith).forEach(function(classified, j, allClassified) {
            classifiedWith.push(classified);
        });
    }
    if (uniprotData.seeAlso) {
        Openphacts.arrayify(uniprotData.seeAlso).forEach(function(see, j, allSee) {
            seeAlso.push(see);
        });
    }
    var molecularWeight = uniprotData.molecularWeight ? uniprotData.molecularWeight : null;
    var functionAnnotation = uniprotData.Function_Annotation ? uniprotData.Function_Annotation : null;
    var alternativeName = uniprotData.alternativeName ? Openphacts.arrayify(uniprotData.alternativeName) : [];
    var existence = uniprotData.existence ? uniprotData.existence : null;
    var organism = uniprotData.organism ? uniprotData.organism : null;
    var sequence = uniprotData.sequence ? uniprotData.sequence : null;
    var mass = uniprotData.mass ? uniprotData.mass : null;
    var uniprotProvenance = {};
    var uniprotLinkOut = uniprotURI;
    uniprotProvenance['source'] = 'uniprot';
    uniprotProvenance['classifiedWith'] = uniprotLinkOut;
    uniprotProvenance['seeAlso'] = uniprotLinkOut;
    uniprotProvenance['molecularWeight'] = uniprotLinkOut;
    uniprotProvenance['functionAnnotation'] = uniprotLinkOut;
    uniprotProvenance['alternativeName'] = uniprotLinkOut;
    uniprotProvenance['existence'] = uniprotLinkOut;
    uniprotProvenance['organism'] = uniprotLinkOut;
    uniprotProvenance['sequence'] = uniprotLinkOut;
    uniprotProvenance['mass'] = uniprotLinkOut;

    return {
        'alternativeName': alternativeName,
        'molecularWeight': molecularWeight,
        'functionAnnotation': functionAnnotation,
        'mass': mass,
        'existence': existence,
        'organism': organism,
        'sequence': sequence,
        'classifiedWith': classifiedWith,
        'seeAlso': seeAlso,
        'uniprotProvenance': uniprotProvenance
    };
}

/**
 * Parse a block of concept wiki data for a target
 * @param {Object} conceptWikiBlock - JSON containing some Concept Wiki data for a target
 * @returns {Object} Flattened Concept Wiki response
 * @method
 */
Openphacts.TargetSearch.prototype.parseConceptWikiBlock = function(conceptWikiBlock) {
    var constants = new Openphacts.Constants();
    var cwUri = conceptWikiBlock[constants.ABOUT];
    var label = conceptWikiBlock[constants.PREF_LABEL];
    var conceptWikiLinkOut = conceptWikiBlock[constants.ABOUT];
    var conceptwikiProvenance = {};
    conceptwikiProvenance['source'] = 'conceptwiki';
    conceptwikiProvenance['prefLabel'] = conceptWikiLinkOut;
    return {
        'prefLabel': label,
        'URI': cwUri,
        'conceptwikiProvenance': conceptwikiProvenance
    };
}

/**
 * Parse a block of ChEMBL data for a target
 * @param {Object} chemblBlock - JSON containing some ChEMBL data for a target
 * @returns {Object} Flattened ChEMBL response
 * @method
 */
Openphacts.TargetSearch.prototype.parseChemblBlock = function(chemblBlock) {
    var constants = new Openphacts.Constants();
    // there can be multiple proteins per target response
    var chemblData = chemblBlock;
    var chemblLinkOut = 'https://www.ebi.ac.uk/chembldb/target/inspect/';
    var chemblDataItem = {};
    chemblDataItem['chembl_src'] = chemblData[constants.IN_DATASET];
    chemblUri = chemblData[constants.ABOUT];
    chemblLinkOut += chemblUri.split('/').pop();
    chemblDataItem['linkOut'] = chemblLinkOut;
    var synonymsData;
    if (chemblData[constants.LABEL]) {
        synonymsData = chemblData[constants.LABEL];
    }
    chemblDataItem['synonyms'] = synonymsData;
    var targetComponents = {};
    if (chemblData[constants.HAS_TARGET_COMPONENT]) {
        Openphacts.arrayify(chemblData[constants.HAS_TARGET_COMPONENT]).forEach(function(targetComponent, index, allTargetComponents) {
            targetComponents[targetComponent[constants.ABOUT]] = targetComponent.description;
        });
    }
    chemblDataItem['targetComponents'] = targetComponents;
    chemblDataItem['type'] = chemblData.type;

    var chemblProvenance = {};
    chemblProvenance['source'] = 'chembl';
    chemblProvenance['synonymsData'] = chemblLinkOut;
    chemblProvenance['targetComponents'] = chemblLinkOut;
    chemblProvenance['type'] = chemblLinkOut;
    return {
        'chemblDataItem': chemblDataItem,
        'chemblProvenance': chemblProvenance
    };
}

/**
 * Parse a block of drugbank data for a target
 * @param {Object} drugbankBlock - JSON containing some drugbank data for a target
 * @returns {Object} Flattened drugbank response
 */
Openphacts.TargetSearch.prototype.parseDrugbankBlock = function(drugbankBlock) {
    var constants = new Openphacts.Constants();
    var drugbankData = drugbankBlock;
    var cellularLocation = drugbankData.cellularLocation ? drugbankData.cellularLocation : null;
    var numberOfResidues = drugbankData.numberOfResidues ? drugbankData.numberOfResidues : null;
    var theoreticalPi = drugbankData.theoreticalPi ? drugbankData.theoreticalPi : null;
    var drugbankURI = drugbankData[constants.ABOUT] ? drugbankData[constants.ABOUT] : null;

    var drugbankLinkOut = drugbankURI;
    var drugbankProvenance = {};
    drugbankProvenance['source'] = 'drugbank';
    drugbankProvenance['cellularLocation'] = drugbankLinkOut;
    drugbankProvenance['numberOfResidues'] = drugbankLinkOut;
    drugbankProvenance['theoreticalPi'] = drugbankLinkOut;
    return {
        'cellularLocation': cellularLocation,
        'numberOfResidues': numberOfResidues,
        'theoreticalPi': theoreticalPi,
        'drugbankURI': drugbankURI,
        'drugbankProvenance': drugbankProvenance
    };
}

/**
 * Parse the results from {@link Openphacts.TargetSearch#fetchTarget}
 * @param {Object} response - the JSON response from {@link Openphacts.TargetSearch#fetchTarget}
 * @returns {FetchTargetResponse} Containing the flattened response
 * @method
 */
Openphacts.TargetSearch.prototype.parseTargetResponse = function(response) {
    var me = this;
    var constants = new Openphacts.Constants();
    var uniprotBlock = {};
    var conceptWikiBlock = {};
    var chemblBlock = {};
    var drugbankBlock = {};
    var URI = response[constants.ABOUT];
    var id = URI.split("/").pop();
    var chemblItems = [];
    // depending on the URI used the info block for that object will be on the top level rather than in exactMatch
    // We need to check what the URI represents and pull the appropriate info out 
    if (constants.SRC_CLS_MAPPINGS[response[constants.IN_DATASET]] === 'drugbankValue') {
        drugbankBlock = me.parseDrugbankBlock(response);
    } else if (constants.SRC_CLS_MAPPINGS[response[constants.IN_DATASET]] === 'chemblValue') {
        chemblBlock = me.parseChemblBlock(response);
        chemblItems.push(chemblBlock);
    } else if (constants.SRC_CLS_MAPPINGS[response[constants.IN_DATASET]] === 'uniprotValue') {
        uniprotBlock = me.parseUniprotBlock(response);
    } else if (constants.SRC_CLS_MAPPINGS[response[constants.IN_DATASET]] === 'conceptWikiValue') {
        conceptWikiBlock = me.parseConceptWikiBlock(response);
    }
    var exactMatches = response[constants.EXACT_MATCH];
    Openphacts.arrayify(exactMatches).forEach(function(exactMatch, i, allMatches) {
        var src = exactMatch[constants.IN_DATASET];
        if (src) {
            if (constants.SRC_CLS_MAPPINGS[src] === 'drugbankValue') {
                drugbankBlock = me.parseDrugbankBlock(exactMatch);
            } else if (constants.SRC_CLS_MAPPINGS[src] === 'chemblValue') {
                chemblBlock = me.parseChemblBlock(exactMatch);
                chemblItems.push(chemblBlock);
            } else if (constants.SRC_CLS_MAPPINGS[src] === 'uniprotValue') {
                uniprotBlock = me.parseUniprotBlock(exactMatch);
            } else if (constants.SRC_CLS_MAPPINGS[src] === 'conceptWikiValue') {
                conceptWikiBlock = me.parseConceptWikiBlock(exactMatch);
            }
        }
    });

    // each chemblItem has its own provenance
    return {
        'id': id,
        'URI': URI,
        'cellularLocation': drugbankBlock.cellularLocation != null ? drugbankBlock.cellularLocation : null,
        'numberOfResidues': drugbankBlock.numberOfResidues != null ? drugbankBlock.numberOfResidues : null,
        'theoreticalPi': drugbankBlock.theoreticalPi != null ? drugbankBlock.theoreticalPi : null,
        'drugbankURI': drugbankBlock.drugbankURI != null ? drugbankBlock.drugbankURI : null,
        'molecularWeight': uniprotBlock.molecularWeight != null ? uniprotBlock.molecularWeight : null,
        'functionAnnotation': uniprotBlock.functionAnnotation != null ? uniprotBlock.functionAnnotation : null,
        'alternativeName': uniprotBlock.alternativeName != null ? uniprotBlock.alternativeName : null,
        'mass': uniprotBlock.mass != null ? uniprotBlock.mass : null,
        'existence': uniprotBlock.existence != null ? uniprotBlock.existence : null,
        'organism': uniprotBlock.organism != null ? uniprotBlock.organism : null,
        'sequence': uniprotBlock.sequence != null ? uniprotBlock.sequence : null,
        'classifiedWith': uniprotBlock.classifiedWith != null ? uniprotBlock.classifiedWith : null,
        'seeAlso': uniprotBlock.seeAlso != null ? uniprotBlock.seeAlso : null,
        'chemblItems': chemblItems,
        'cwURI': conceptWikiBlock.URI != null ? conceptWikiBlock.URI : null,
        'prefLabel': conceptWikiBlock.prefLabel != null ? conceptWikiBlock.prefLabel : null,
        'drugbankProvenance': drugbankBlock.drugbankProvenance != null ? drugbankBlock.drugbankProvenance : null,
        'uniprotProvenance': uniprotBlock.uniprotProvenance != null ? uniprotBlock.uniprotProvenance : null,
        'conceptwikiProvenance': conceptWikiBlock.conceptwikiProvenance != null ? conceptWikiBlock.conceptwikiProvenance : null
    };
}

/**
 * Parse the results from {@link Openphacts.TargetSearch#fetchTargetBatch}
 * @param {Object} response - the JSON response from {@link Openphacts.TargetSearch#fetchTargetBatch}
 * @returns {FetchTargetBatchResponse} Containing the flattened response
 * @method
 */
Openphacts.TargetSearch.prototype.parseTargetBatchResponse = function(response) {
    var constants = new Openphacts.Constants();
    var targets = [];
    var me = this;
    response.items.forEach(function(item, index, items) {
        targets.push(me.parseTargetResponse(item));
    });
    return targets;
}

Openphacts.TargetSearch.prototype.parseTargetPharmacologyResponse = function(response) {
    var constants = new Openphacts.Constants();
    var records = [];

    response.items.forEach(function(item, index, items) {

        chemblProvenance = {};
        chemblProvenance['source'] = 'chembl';

        var chembl_activity_uri = item["_about"];
        var chembl_src = item["inDataset"];

        //big bits
        var forMolecule = item[constants.FOR_MOLECULE];
        var chembl_compound_uri;
        var compound_full_mwt = null;
        var compound_full_mwt_item;

        var em;
        var chembleMoleculeLink = 'https://www.ebi.ac.uk/chembldb/compound/inspect/';

        if (forMolecule != null) {
            chembl_compound_uri = forMolecule["_about"];
            //compound_full_mwt = forMolecule['full_mwt'] ? forMolecule['full_mwt'] : null;
            chembleMoleculeLink += chembl_compound_uri.split('/').pop();
            compound_full_mwt_item = chembleMoleculeLink;
            em = forMolecule["exactMatch"];
        }

        var cw_compound_uri = null,
            compound_pref_label = null,
            cw_src = null,
            cs_compound_uri = null,
            compound_inchi = null,
            compound_inchikey = null,
            compound_smiles = null,
            cs_src = null,
            drugbank_compound_uri = null,
            compound_drug_type = null,
            compound_generic_name = null,
            drugbank_src = null,
            csid = null,
            compound_pref_label_item = null,
            compound_inchi_item = null,
            compound_inchikey_item = null,
            compound_smiles_item = null,
            assay_description = null,
            assay_description_item = null,
            compound_ro5_violations = null;
        if (em != null) {
            em.forEach(function(match, index, all) {
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
                    compound_full_mwt = match.molweight;
                    compound_ro5_violations = match.ro5_violations;
                    cs_src = match["inDataset"];
                    var chemSpiderLink = 'http://www.chemspider.com/' + csid;
                    compound_inchi_item = chemSpiderLink;
                    compound_inchikey_item = chemSpiderLink;
                    compound_smiles_item = chemSpiderLink;
                } // else if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
                //   drugbank_compound_uri = match["_about"];
                //   compound_drug_type = match['drugType'];
                //   compound_generic_name = match['genericName'];
                //   drugbank_src = match["_about"];
                //}
            });
        }

        var onAssay = item[constants.ON_ASSAY];
        var chembl_assay_uri;
        var assay_organism;
        var assay_organism_item;
        var target;
        var chembldAssayLink = 'https://www.ebi.ac.uk/chembldb/assay/inspect/';

        if (onAssay != null) {
            chembl_assay_uri = onAssay[constants.ABOUT];
            assay_organism = onAssay.assayOrganismName ? onAssay.assayOrganismName : null;
            assay_organism_item = chembldAssayLink + chembl_assay_uri.split('/').pop();
            assay_description = onAssay['description'] ? onAssay['description'] : null;
            //assay_description_item = chembldAssayLink + chembl_assay_uri.split('/').pop();
            target = onAssay[constants.ON_TARGET];
        }
        var chembl_target_uri;
        var target_pref_label;
        var target_pref_label_item;
        var targetMatch;
        var target_title = null;
        var target_organism;
        var target_organism_item;
        var target_concatenated_uris;
        var chemblTargetLink = 'https://www.ebi.ac.uk/chembldb/target/inspect/';
        var target_organisms = new Array();
        var targets = [];
        // Target has a title, a target organism and a target component. Each target component has an exactMatch singleton which
        // contains a prefLabel and a URI
        if (target != null) {
            chembl_target_uri = target["_about"];
            //target_pref_label = target['prefLabel'];
            //TODO The exact match stuff does not seem to exist any more
            //targetMatch = target['exactMatch'];
            target_title = target.title;
            //if (targetMatch != null) {
            //	var targetMatchURI = targetMatch["_about"];
            //	target_pref_label = targetMatch['prefLabel'];
            //	target_pref_label_item = targetMatchURI;
            //	target_title = target_pref_label ? target_pref_label : null;
            //}
            var targetComponents = [];
            if (target[constants.HAS_TARGET_COMPONENT] != null) {
                Openphacts.arrayify(target[constants.HAS_TARGET_COMPONENT]).forEach(function(targetComponent, index, allTargetComponents) {
                    var targetComponentDetails = {
                        'URI': targetComponent[constants.ABOUT]
                    };
                    if (targetComponent[constants.EXACT_MATCH] != null) {
                        targetComponentDetails['prefLabel'] = targetComponent[constants.EXACT_MATCH].prefLabel;
                        targetComponentDetails['prefLabelURI'] = targetComponent[constants.EXACT_MATCH][constants.ABOUT];
                    }

                    targetComponents.push(targetComponentDetails);
                });
            }
            target_organism = target['assay_organism'];
            target_organism_item = chemblTargetLink + chembl_target_uri.split('/').pop();
            //target_concatenated_uris = target['concatenatedURIs'];
            var target_organisms_inner = {};
            target_organisms_inner['organism'] = target_organism;
            target_organisms_inner['src'] = target_organism_item;
            target_organisms.push(target_organisms_inner);
            var targets_inner = {};
            targets_inner['targetComponents'] = targetComponents;
            targets_inner['type'] = target.type != null ? target.type : null;

            targets_inner['title'] = target_title;
            //targets_inner['cw_uri'] = target_pref_label_item ? target_pref_label_item : null;
            targets_inner['URI'] = target[constants.ABOUT];
            targets.push(targets_inner);
        }

        var chemblActivityLink = 'https://www.ebi.ac.uk/ebisearch/search.ebi?t=' + chembl_activity_uri.split('/').pop().split('_').pop() + '&db=chembl-activity';

        var activity_activity_type_item, activity_standard_value_item, activity_standard_units_item, activity_relation_item;

        var activity_activity_type = item['activity_type'] ? item['activity_type'] : null;
        activity_activity_type_item = chemblActivityLink;
        var activity_standard_value = item['activity_value'] ? item['activity_value'] : null;
        activity_standard_value_item = chemblActivityLink;
        var activity_standard_units = item.activity_unit ? item.activity_unit.prefLabel : null;
        activity_standard_units_item = chemblActivityLink;
        var activity_relation = item['activity_relation'] ? item['activity_relation'] : null;
        activity_relation_item = chemblActivityLink;
        var activity_pubmed_id = item['pmid'] ? item['pmid'] : null;
        var activity_comment = item['activityComment'] ? item['activityComment'] : null;
        var pChembl = item.pChembl;
        var documents = [];
        if (item.hasDocument) {
            Openphacts.arrayify(item.hasDocument).forEach(function(document, index, documents) {
                documents.push(document);
            });
        }
        records.push({ //for compound
            'compoundInchikey': compound_inchikey,
            //compoundDrugType: compound_drug_type,
            //compoundGenericName: compound_generic_name,
            'targetTitle': target_title,
            //targetConcatenatedUris: target_concatenated_uris,

            'compoundInchikeySrc': cs_src,
            //compoundDrugTypeSrc: drugbank_src,
            //compoundGenericNameSrc: drugbank_src,
            'targetTitleSrc': chembl_src,
            //targetConcatenatedUrisSrc: chembl_src,


            //for target
            'chemblActivityUri': chembl_activity_uri,
            'chemblCompoundUri': chembl_compound_uri,
            'compoundFullMwt': compound_full_mwt,
            'cwCompoundUri': cw_compound_uri,
            'compoundPrefLabel': compound_pref_label,
            'csCompoundUri': cs_compound_uri,
            'csid': csid,
            'compoundInchi': compound_inchi,
            'compoundSmiles': compound_smiles,
            'chemblAssayUri': chembl_assay_uri,
            'chemblTargetUri': chembl_target_uri,

            //targetOrganism: target_organism,
            'targetOrganisms': target_organisms,
            //targetPrefLabel: target_pref_label,

            'assayOrganism': assay_organism,
            'assayDescription': assay_description,
            'activityRelation': activity_relation,
            'activityStandardUnits': activity_standard_units,
            'activityStandardValue': activity_standard_value,
            'activityActivityType': activity_activity_type,
            'activityPubmedId': activity_pubmed_id,
            'activityComment': activity_comment,

            'compoundFullMwtSrc': chembl_src,
            'compoundPrefLabelSrc': cw_src,
            'compoundInchiSrc': cs_src,
            'compoundSmilesSrc': cs_src,
            //targetOrganismSrc: chembl_src,
            'targetPrefLabelSrc': cw_src,
            'assayOrganismSrc': chembl_src,
            'assayDescriptionSrc': chembl_src,
            'activityRelationSrc': chembl_src,
            'activityStandardUnits_src': chembl_src,
            'activityStandardValue_src': chembl_src,
            'activityActivityType_src': chembl_src,

            'compoundPrefLabelItem': compound_pref_label_item,
            'activityActivityTypeItem': activity_activity_type_item,
            'activityRelationItem': activity_relation_item,
            'activityStandardValueItem': activity_standard_value_item,
            'activityStandardUnitsItem': activity_standard_units_item,
            'compoundFullMwtItem': compound_full_mwt_item,
            'compoundSmilesItem': compound_smiles_item,
            'compoundInchiItem': compound_inchi_item,
            'compoundInchikeyItem': compound_inchikey_item,
            //targetPrefLabelItem: target_pref_label_item,
            'assayOrganismItem': assay_organism_item,
            //assayDescriptionItem: assay_description_item,
            //targetOrganismItem: target_organism_item,
            'targets': targets,
            'pChembl': pChembl,
            'compoundRO5Violations': compound_ro5_violations,
            'chemblProvenance': chemblProvenance,
            'chemblDOIs': documents
        });
    });
    return records;
}

Openphacts.TargetSearch.prototype.parseTargetPharmacologyCountResponse = function(response) {
    return response.primaryTopic.targetPharmacologyTotalResults;
}
