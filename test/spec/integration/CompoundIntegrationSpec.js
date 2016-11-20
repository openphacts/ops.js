var Openphacts = require("../../../src/OPS.js");
//var nock = require('nock');
//nock.recorder.rec();
jasmine.getEnv().defaultTimeoutInterval = 30000;

describe("Compound search", function() {
    var searcher, appID, appKey, appUrl;

    beforeEach(function() {
        appID = process.env['app_id'];
        appKey = process.env['app_key'];
        appUrl = process.env['app_url'];
        searcher = new CompoundSearch(appUrl, appID, appKey);
    });

    describe("single compound search", function() {

        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseCompoundResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
    		    expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                // API contract states that these will be present
                expect(this_result.id).not.toBeNull();
                //expect(this_result.prefLabel).not.toBeNull();
                expect(this_result.URI).not.toBeNull();
                //expect(this_result.csURI).not.toBeNull();
                expect(this_result.inchi).not.toBeNull();
                expect(this_result.smiles).not.toBeNull();
                //expect(this_result.chemblURI).not.toBeNull();
                expect(this_result.inchiKey).not.toBeNull();
                //expect(this_result.drugbankURI).not.toBeNull();
                // API contract implies that prefLabel, chemblURI & drugbankURI  should be present but this is not the case in 1.4 API
                expect(this_result.chemblURI).toBeDefined();
                expect(this_result.prefLabel).toBeDefined();
                expect(this_result.cwURI).toBeDefined();
                expect(this_result.csURI).toBeDefined();
                expect(this_result.fullMWT).toBeDefined();
                expect(this_result.molform).toBeDefined();
                expect(this_result.mwFreebase).toBeDefined();
                expect(this_result.rtb).toBeDefined();
                expect(this_result.logp).toBeDefined();
                expect(this_result.psa).toBeDefined();
                expect(this_result.ro5Violations).toBeDefined();
                expect(this_result.hba).toBeDefined();
                expect(this_result.hbd).toBeDefined();
                expect(this_result.description).toBeDefined();
                expect(this_result.biotransformationItem).toBeDefined();
                expect(this_result.toxicity).toBeDefined();
                expect(this_result.proteinBinding).toBeDefined();
                expect(this_result.drugbankURI).toBeDefined();
            });
            searcher.fetchCompound('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, callback);
        });
        it("use an RSC uri", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseCompoundResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                // API contract states that these will be present
                expect(this_result.id).not.toBeNull();
                //expect(this_result.prefLabel).not.toBeNull();
                expect(this_result.URI).not.toBeNull();
                //expect(this_result.csURI).not.toBeNull();
                expect(this_result.inchi).not.toBeNull();
                expect(this_result.smiles).not.toBeNull();
                //expect(this_result.chemblURI).not.toBeNull();
                expect(this_result.inchiKey).not.toBeNull();
                //expect(this_result.drugbankURI).not.toBeNull();

                // API contract implies that prefLabel, chemblURI & drugbankURI  should be present but this is not the case in 1.4 API
                expect(this_result.chemblURI).toBeDefined();
                expect(this_result.prefLabel).toBeDefined();
                expect(this_result.fullMWT).toBeDefined();
                expect(this_result.molform).toBeDefined();
                expect(this_result.mwFreebase).toBeDefined();
                expect(this_result.rtb).toBeDefined();
                expect(this_result.logp).toBeDefined();
                expect(this_result.psa).toBeDefined();
                expect(this_result.ro5Violations).toBeDefined();
                expect(this_result.hba).toBeDefined();
                expect(this_result.hbd).toBeDefined();
                expect(this_result.description).toBeDefined();
                expect(this_result.biotransformationItem).toBeDefined();
                expect(this_result.toxicity).toBeDefined();
                expect(this_result.proteinBinding).toBeDefined();
                expect(this_result.drugbankURI).toBeDefined();
            });
            searcher.fetchCompound('http://ops.rsc.org/OPS2954', null, callback);
        });
        it("possible singleton in exactMatch", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseCompoundResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                // API contract states that these will be present
                expect(this_result.id).not.toBeNull();
                expect(this_result.URI).not.toBeNull();
                //expect(this_result.csURI).not.toBeNull();
                expect(this_result.inchi).not.toBeNull();
                expect(this_result.smiles).not.toBeNull();
                expect(this_result.inchiKey).not.toBeNull();
                //expect(this_result.drugbankURI).not.toBeNull();

                // These values are not guaranteed to be in the response from the API but should present though may be null
                // API contract implies that prefLabel, chemblURI & drugbankURI  should be present but this is not the case in 1.4 API
                expect(this_result.chemblURI).toBeDefined();
                expect(this_result.prefLabel).toBeDefined();
                expect(this_result.fullMWT).toBeDefined();
                expect(this_result.molform).toBeDefined();
                expect(this_result.mwFreebase).toBeDefined();
                expect(this_result.rtb).toBeDefined();
                expect(this_result.logp).toBeDefined();
                expect(this_result.psa).toBeDefined();
                expect(this_result.ro5Violations).toBeDefined();
                expect(this_result.hba).toBeDefined();
                expect(this_result.hbd).toBeDefined();
                expect(this_result.description).toBeDefined();
                expect(this_result.biotransformationItem).toBeDefined();
                expect(this_result.toxicity).toBeDefined();
                expect(this_result.proteinBinding).toBeDefined();
                expect(this_result.drugbankURI).toBeDefined();
            });
            searcher.fetchCompound('http://ops.rsc.org/OPS1891233', null, callback);
        });
        it("use identifiers.org uri in request", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseCompoundResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
     		    expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                // API contract states that these will be present
                expect(this_result.id).not.toBeNull();
                //expect(this_result.prefLabel).not.toBeNull();
                expect(this_result.URI).not.toBeNull();
                //expect(this_result.csURI).not.toBeNull();
                expect(this_result.inchi).not.toBeNull();
                expect(this_result.smiles).not.toBeNull();
                //expect(this_result.chemblURI).not.toBeNull();
                expect(this_result.inchiKey).not.toBeNull();
                //expect(this_result.drugbankURI).not.toBeNull();

                // API contract implies that prefLabel, chemblURI & drugbankURI  should be present but this is not the case in 1.4 API
                expect(this_result.chemblURI).toBeDefined();
                expect(this_result.prefLabel).toBeDefined();
                expect(this_result.fullMWT).toBeDefined();
                expect(this_result.molform).toBeDefined();
                expect(this_result.mwFreebase).toBeDefined();
                expect(this_result.rtb).toBeDefined();
                expect(this_result.logp).toBeDefined();
                expect(this_result.psa).toBeDefined();
                expect(this_result.ro5Violations).toBeDefined();
                expect(this_result.hba).toBeDefined();
                expect(this_result.hbd).toBeDefined();
                expect(this_result.description).toBeDefined();
                expect(this_result.biotransformationItem).toBeDefined();
                expect(this_result.toxicity).toBeDefined();
                expect(this_result.proteinBinding).toBeDefined();
                expect(this_result.drugbankURI).toBeDefined();
            });
            searcher.fetchCompound('http://identifiers.org/hmdb/HMDB00123', null, callback);
        });
        it("can use a lens", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseCompoundLensResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                // API contract states that these will be present
                expect(this_result.lensChemspider).toBeDefined();
                expect(this_result.lensChembl).toBeDefined();
                expect(this_result.lensCW).toBeDefined();
                expect(this_result.lensDrugbank).toBeDefined();
            });
            searcher.fetchCompound('http://ops.rsc.org/OPS539735', 'Stereochemistry', callback);
        });
        it("can handle errors", function() {
            var this_success = null;
            var this_status = null;
            var callback = function(success, status) {
                this_success = success;
                this_status = status;
            };
            waitsFor(function() {
                return this_success != null;
            });
            runs(function() {
                expect(this_success).toEqual(false);
                expect(this_status).toEqual(404);
            });
            searcher.fetchCompound('http://www.conceptwiki.org/concept/876876876', null, callback);
        });
    });
    describe("fetch multiple compounds using batch call", function() {
        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseCompoundBatchResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);
                expect(this_result).not.toBeNull();
                expect(this_result.length).toEqual(2);
                // API contract states that these will be present
                expect(this_result[0].id).not.toBeNull();
                //expect(this_result[0].prefLabel).not.toBeNull();
                expect(this_result[0].URI).not.toBeNull();
                //expect(this_result.csURI).not.toBeNull();
                expect(this_result[0].inchi).not.toBeNull();
                expect(this_result[0].smiles).not.toBeNull();
                //expect(this_result[0].chemblURI).not.toBeNull();
                expect(this_result[0].inchiKey).not.toBeNull();
                //expect(this_result.drugbankURI).not.toBeNull();

                // API contract implies that prefLabel, chemblURI & drugbankURI  should be present but this is not the case in 1.4 API
                expect(this_result[0].chemblURI).toBeDefined();
                expect(this_result[0].prefLabel).toBeDefined();

                // These values are not guaranteed to be in the response from the API but should present though may be null
                expect(this_result[0].fullMWT).toBeDefined();
                expect(this_result[0].molform).toBeDefined();
                expect(this_result[0].mwFreebase).toBeDefined();
                expect(this_result[0].rtb).toBeDefined();
                expect(this_result[0].logp).toBeDefined();
                expect(this_result[0].psa).toBeDefined();
                expect(this_result[0].ro5Violations).toBeDefined();
                expect(this_result[0].hba).toBeDefined();
                expect(this_result[0].hbd).toBeDefined();
                expect(this_result[0].description).toBeDefined();
                expect(this_result[0].biotransformationItem).toBeDefined();
                expect(this_result[0].toxicity).toBeDefined();
                expect(this_result[0].proteinBinding).toBeDefined();
                expect(this_result[0].drugbankURI).toBeDefined();
            });
            searcher.fetchCompoundBatch(['http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', 'http://www.conceptwiki.org/concept/dd758846-1dac-4f0d-a329-06af9a7fa413'], null, callback);
        });
        it("use an RSC uri", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseCompoundResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                // API contract states that these will be present
                expect(this_result.id).not.toBeNull();
                expect(this_result.URI).not.toBeNull();
                //expect(this_result.csURI).not.toBeNull();
                expect(this_result.inchi).not.toBeNull();
                expect(this_result.smiles).not.toBeNull();
                expect(this_result.inchiKey).not.toBeNull();
                //expect(this_result.drugbankURI).not.toBeNull();

                // API contract implies that prefLabel, chemblURI & drugbankURI  should be present but this is not the case in 1.4 API
                expect(this_result.chemblURI).toBeDefined();
                expect(this_result.prefLabel).toBeDefined();


                // These values are not guaranteed to be in the response from the API but should present though may be null
                expect(this_result.fullMWT).toBeDefined();
                expect(this_result.molform).toBeDefined();
                expect(this_result.mwFreebase).toBeDefined();
                expect(this_result.rtb).toBeDefined();
                expect(this_result.logp).toBeDefined();
                expect(this_result.psa).toBeDefined();
                expect(this_result.ro5Violations).toBeDefined();
                expect(this_result.hba).toBeDefined();
                expect(this_result.hbd).toBeDefined();
                expect(this_result.description).toBeDefined();
                expect(this_result.biotransformationItem).toBeDefined();
                expect(this_result.toxicity).toBeDefined();
                expect(this_result.proteinBinding).toBeDefined();
                expect(this_result.drugbankURI).toBeDefined();
            });
            searcher.fetchCompound('http://ops.rsc.org/OPS2954', null, callback);
        });
        it("use identifiers.org uri in request", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseCompoundResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                // API contract states that these will be present
                expect(this_result.id).not.toBeNull();
                expect(this_result.URI).not.toBeNull();
                //expect(this_result.csURI).not.toBeNull();
                expect(this_result.inchi).not.toBeNull();
                expect(this_result.smiles).not.toBeNull();
                expect(this_result.inchiKey).not.toBeNull();
                //expect(this_result.drugbankURI).not.toBeNull();

                // API contract implies that prefLabel, chemblURI & drugbankURI  should be present but this is not the case in 1.4 API
                expect(this_result.chemblURI).toBeDefined();
                expect(this_result.prefLabel).toBeDefined();


                // These values are not guaranteed to be in the response from the API but should present though may be null
                expect(this_result.fullMWT).toBeDefined();
                expect(this_result.molform).toBeDefined();
                expect(this_result.mwFreebase).toBeDefined();
                expect(this_result.rtb).toBeDefined();
                expect(this_result.logp).toBeDefined();
                expect(this_result.psa).toBeDefined();
                expect(this_result.ro5Violations).toBeDefined();
                expect(this_result.hba).toBeDefined();
                expect(this_result.hbd).toBeDefined();
                expect(this_result.description).toBeDefined();
                expect(this_result.biotransformationItem).toBeDefined();
                expect(this_result.toxicity).toBeDefined();
                expect(this_result.proteinBinding).toBeDefined();
                expect(this_result.drugbankURI).toBeDefined();
            });
            searcher.fetchCompound('http://identifiers.org/hmdb/HMDB00123', null, callback);
        });
        it("can handle errors", function() {
            var this_success = null;
            var this_status = null;
            var callback = function(success, status) {
                this_success = success;
                this_status = status;
            };
            waitsFor(function() {
                return this_success != null;
            });
            runs(function() {
		    expect(this_success).toEqual(false);
                expect(this_status).toEqual(404);
            });
            searcher.fetchCompound('http://www.conceptwiki.org/concept/876876876', null, callback);
        });
    });

    describe("compound pharmacology search", function() {

        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseCompoundPharmacologyResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toEqual(true);
                expect(this_status).toEqual(200);
                expect(this_result[0]).toBeDefined();
                // optional values
                expect(this_result[0].compoundDrugType).toBeDefined();
                expect(this_result[0].compoundGenericName).toBeDefined();
                expect(this_result[0].targetOrganismName).toBeDefined();
		expect(this_result[0].targetTitle).toBeDefined();
		expect(this_result[0].targetURI).toBeDefined();
		expect(this_result[0].targetProvenance).toBeDefined();
		expect(this_result[0].targetComponents).toBeDefined();
		//expect(this_result[0].targetComponents[0].label).toBeDefined();
 		//expect(this_result[0].targetComponents[0].uri).toBeDefined();
                //expect(this_result[0].targetComponents[0].labelProvenance).toBeDefined();
	       	expect(this_result[0].compoundInchikeySrc).toBeDefined();
                expect(this_result[0].compoundDrugTypeSrc).toBeDefined();
                expect(this_result[0].compoundGenericNameSrc).toBeDefined();
                expect(this_result[0].targetTitleSrc).toBeDefined();
                expect(this_result[0].chemblCompoundUri).toBeDefined();
                expect(this_result[0].compoundFullMwt).toBeDefined();
                expect(this_result[0].chemblAssayUri).toBeDefined();
                expect(this_result[0].assayOrganism).toBeDefined();
                expect(this_result[0].assayDescription).toBeDefined();
                expect(this_result[0].activityRelation).toBeDefined();
                // Response format seems wrong for 1.5 - see https://github.com/openphacts/GLOBAL/issues/245
                //expect(this_result[0].activityStandardUnits).toBeDefined();
                expect(this_result[0].activityStandardValue).toBeDefined();
                expect(this_result[0].activityActivityType).toBeDefined();
                expect(this_result[0].compoundFullMwtSrc).toBeDefined();
                expect(this_result[0].compoundPrefLabel_src).toBeDefined();
                expect(this_result[0].compoundInchiSrc).toBeDefined();
                expect(this_result[0].compoundSmilesSrc).toBeDefined();
                expect(this_result[0].targetOrganismSrc).toBeDefined();
                expect(this_result[0].assayOrganismSrc).toBeDefined();
                expect(this_result[0].assayDescriptionSrc).toBeDefined();
                expect(this_result[0].activityRelationSrc).toBeDefined();
                expect(this_result[0].activityStandardUnitsSrc).toBeDefined();
                expect(this_result[0].activityStandardValueSrc).toBeDefined();
                expect(this_result[0].activityActivityTypeSrc).toBeDefined();
                expect(this_result[0].activityPubmedId).toBeDefined();
                expect(this_result[0].assayDescriptionItem).toBeDefined();
                expect(this_result[0].assayOrganismItem).toBeDefined();
                expect(this_result[0].activityActivityTypeItem).toBeDefined();
                expect(this_result[0].activityRelationItem).toBeDefined();
                expect(this_result[0].activityStandardValueItem).toBeDefined();
                expect(this_result[0].activityStandardUnitsItem).toBeDefined();
                expect(this_result[0].compoundFullMwtItem).toBeDefined();
                expect(this_result[0].compoundSmilesItem).toBeDefined();
                expect(this_result[0].compoundInchiItem).toBeDefined();
                expect(this_result[0].compoundInchikeyItem).toBeDefined();
                expect(this_result[0].compoundPrefLabelItem).toBeDefined();
                expect(this_result[0].pChembl).toBeDefined();
                expect(this_result[0].activityValue).toBeDefined();

                // mandatory values
                expect(this_result[0].chemblActivityUri).not.toBeNull();
                expect(this_result[0].cwCompoundUri).toBeDefined();
                expect(this_result[0].compoundPrefLabel).toBeDefined();;
                expect(this_result[0].compoundInchikey).toBeDefined();;
                expect(this_result[0].compoundSmiles).toBeDefined();
                expect(this_result[0].compoundInchi).toBeDefined();
                expect(this_result[0].csCompoundUri).toBeDefined();
                expect(this_result[0].csid).toBeDefined();

            });
            searcher.compoundPharmacology('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, 20, null, null, callback);
        });
        it("and handle errors", function() {
            var this_success = null;
            var this_status = null;
            var callback = function(success, status) {
                this_success = success;
                this_status = status;
            };
            waitsFor(function() {
                return this_success != null;
            });
            runs(function() {
                expect(this_success).toEqual(false);
                expect(this_status).toEqual(404);
            });
            searcher.compoundPharmacology('http://www.conceptwiki.org/concept/876876876', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, 20, null, null, callback);
        });
    });
    describe("compound pharmacology count", function() {

        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseCompoundPharmacologyCountResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
     		    expect(this_success).toEqual(true);
                expect(this_status).toEqual(200);
                expect(this_result).toBeDefined();
            });
            searcher.compoundPharmacologyCount('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, callback);
        });
    });
    describe("compound classifications", function() {

        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
            };
            waitsFor(function() {
                return this_status != null;
            });
            runs(function() {
                expect(this_success).toEqual(true);
                expect(this_status).toEqual(200);
            });
            searcher.compoundClassifications('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', 'chebi', callback);
        });
    });
    describe("compound class members count", function() {
        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseCompoundClassMembersCountResponse(response);
            };
            waitsFor(function() {
                return this_result !== null;
            });
            runs(function() {
                expect(this_success).toEqual(true);
                expect(this_status).toEqual(200);
                expect(this_result).not.toBeNull();
            });
            searcher.compoundClassMembersCount('http://purl.obolibrary.org/obo/CHEBI_24431', null, callback);
        });

    });
    //1.5 does not parse compound class members according to the spec
    //    describe("compound class members fetch", function() {
    //        it("can return a response", function() {
    //            var this_success = null;
    //            var this_status = null;
    //            var this_result = null
    //            var callback = function(success, status, response) {
    //                this_success = success;
    //                this_status = status;
    //                this_result = searcher.parseCompoundClassMembersResponse(response);
    //            };
    //            waitsFor(function() {
    //                return this_result !== null;
    //            });
    //            runs(function() {
    //                expect(this_success).toEqual(true);
    //                expect(this_status).toEqual(200);
    //                expect(this_result).not.toBeNull();
    //            });
    //            searcher.compoundClassMembers('http://purl.obolibrary.org/obo/CHEBI_24431', null, null, null, null, callback);
    //        });
});
