var Openphacts = require("../../../src/OPS.js");
jasmine.getEnv().defaultTimeoutInterval = 30000;

describe("Disease search", function() {

    var searcher, appID, appKey, appUrl;

    beforeEach(function() {
        appID = process.env['app_id'];
        appKey = process.env['app_key'];
        appUrl = process.env['app_url'];
	searcher = new DiseaseSearch(appUrl, appID, appKey);
    });
    describe("single disease search", function() {

        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseDiseaseResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                // API contract states that these will be present
                expect(this_result.name).not.toBeNull();
                expect(this_result.URI).not.toBeNull();

                // May not be present but should be defined
                expect(this_result.diseaseClass).not.toBeNull();
                expect(this_result.diseaseClass.length).toEqual(2);
                expect(this_result.diseaseClass[0].name).not.toBeNull();
                expect(this_result.diseaseClass[0].URI).not.toBeNull();
            });
            searcher.fetchDisease('http://linkedlifedata.com/resource/umls/id/C0004238', null, callback);
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
            searcher.fetchDisease('http://www.conceptwiki.org/concept/876876876', null, callback);
        });
    });
    describe("count diseases for target", function() {

        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseDiseasesByTargetCountResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                // API contract states that these will be present
                expect(this_result).not.toBeNull();
            });
            searcher.diseasesByTargetCount('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, callback);
        });
        it("can handle random URI", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseDiseasesByTargetCountResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toEqual(true);
                expect(this_status).toEqual(200);
                expect(this_result).toEqual(0);
            });
            searcher.diseasesByTargetCount('http://www.conceptwiki.org/concept/876876876', null, callback);
        });
    });
    describe("multiple disease search", function() {

        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseDiseaseBatchResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);
expect(this_result.length).toBeGreaterThan(0);
                // API contract states that these will be present
                expect(this_result[0].name).not.toBeNull();
                expect(this_result[0].URI).not.toBeNull();

                // May not be present but should be defined
                expect(this_result[0].diseaseClass).not.toBeNull();
                expect(this_result[0].diseaseClass.length).toEqual(2);
                expect(this_result[0].diseaseClass[0].name).not.toBeNull();
                expect(this_result[0].diseaseClass[0].URI).not.toBeNull();
            });
            searcher.fetchDiseaseBatch(['http://linkedlifedata.com/resource/umls/id/C0004238', 'http://linkedlifedata.com/resource/umls/id/C0004238'], null, callback);
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
            searcher.fetchDiseaseBatch(['http://linkedlifedata.com/rC0004238', 'http://www.conceptwiki.org/concept/876876876'], null, callback);
        });
    });
    describe("count diseases for target", function() {

        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseDiseasesByTargetCountResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                // API contract states that these will be present
                expect(this_result).not.toBeNull();
            });
            searcher.diseasesByTargetCount('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, callback);
        });
        it("can handle random URI", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseDiseasesByTargetCountResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toEqual(true);
                expect(this_status).toEqual(200);
                expect(this_result).toEqual(0);
            });
            searcher.diseasesByTargetCount('http://www.conceptwiki.org/concept/876876876', null, callback);
        });
    });

    describe("diseases for target", function() {

        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseDiseasesByTargetResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);
                // API contract states that these will be present
                expect(this_result).toBeDefined();
                expect(this_result.length).toBeGreaterThan(0);
                expect(this_result[0].name).not.toBeNull();
                expect(this_result[0].URI).not.toBeNull();
                expect(this_result[0].gene).not.toBeNull();
		expect(this_result[0].gene.encodes).not.toBeNull();
		expect(this_result[0].gene.encodes[0]).not.toBeNull();
		expect(this_result[0].gene.encodes[0].uri).not.toBeNull();
		// encodesProvenance & encodesLabel are optional
		expect(this_result[0].gene.encodes[0].label).toBeDefined();
		expect(this_result[0].gene.encodes[0].provenance).toBeDefined();
            });
            searcher.diseasesByTarget('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, null, null, null, callback);
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
            searcher.diseasesByTarget('http://www.conceptwiki.org/concept/876876876', null, null, null, null, callback);
        });

    });
    describe("count targets for disease", function() {

        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseTargetsByDiseaseCountResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                // API contract states that these will be present
                expect(this_result).not.toBeNull();
            });
            searcher.targetsByDiseaseCount('http://linkedlifedata.com/resource/umls/id/C0004238', null, callback);
        });
        it("can handle random URI", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseTargetsByDiseaseCountResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toEqual(true);
                expect(this_status).toEqual(200);
                expect(this_result).toEqual(0);
            });
            searcher.targetsByDiseaseCount('http://www.conceptwiki.org/concept/876876876', null, callback);
        });
    });

    describe("targets for disease", function() {

        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseTargetsByDiseaseResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                // API contract states that these will be present
                expect(this_result).toBeDefined();
                expect(this_result.length).toBeGreaterThan(0);
                expect(this_result[0].dataset).not.toBeNull();
                expect(this_result[0].URI).not.toBeNull();
            });
            searcher.targetsByDisease('http://linkedlifedata.com/resource/umls/id/C0004238', null, null, null, null, callback);
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
            searcher.targetsByDisease('http://www.conceptwiki.org/concept/876876876', null, null, null, null, callback);
        });
    });
    describe("count associations for a target", function() {

        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseAssociationsByTargetCountResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                // API contract states that these will be present
                expect(this_result).not.toBeNull();
            });
            searcher.associationsByTargetCount('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, callback);
        });
        it("can handle random URI", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseAssociationsByTargetCountResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toEqual(true);
                expect(this_status).toEqual(200);
                expect(this_result).toEqual(0);
            });
            searcher.associationsByTargetCount('http://www.conceptwiki.org/concept/876876876', null, callback);
        });
    });
    describe("associations for target", function() {

        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseAssociationsByTargetResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                expect(this_result).toBeDefined();
                expect(this_result.length).toBeGreaterThan(0);
                expect(this_result[0].about).not.toBeNull();
                expect(this_result[0].dataset).not.toBeNull();
                expect(this_result[0].primarySource).not.toBeNull();
                expect(this_result[0].primarySource.length).toBeGreaterThan(0);
		expect(this_result[0].type).not.toBeNull();
		expect(this_result[0].type.length).toBeGreaterThan(0);
		expect(this_result[0].type[0].label).not.toBeNull();
		expect(this_result[0].type[0].URI).not.toBeNull();
                // pmid & description are optional but can be empty arrays
                expect(this_result[0].pmid).not.toBeNull();
                expect(this_result[0].description).not.toBeNull();
                expect(this_result[0].gene).not.toBeNull();
		expect(this_result[0].gene.URI).not.toBeNull();
		expect(this_result[0].gene.encodes).not.toBeNull();
		// encodesProvenance & encodesLabel are optional
		expect(this_result[0].gene.encodesProvenance).toBeDefined();
		expect(this_result[0].gene.encodesLabel).toBeDefined();
                expect(this_result[0].disease).not.toBeNull();
                expect(this_result[0].disease.name).not.toBeNull();
                expect(this_result[0].disease.dataset).not.toBeNull();
                expect(this_result[0].disease.diseaseClasses).not.toBeNull();
                expect(this_result[0].disease.diseaseClasses.length).toBeGreaterThan(0);
                expect(this_result[0].disease.diseaseClasses[0].URI).not.toBeNull(0);
                expect(this_result[0].disease.diseaseClasses[0].name).not.toBeNull(0);
                expect(this_result[0].disease.diseaseClasses[0].dataset).not.toBeNull(0);
            });
            searcher.associationsByTarget('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, null, null, null, callback);
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
            searcher.associationsByTarget('http://www.conceptwiki.org/concept/876876876', null, null, null, null, callback);
        });
    });
    describe("count associations for a disease", function() {

        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseAssociationsByDiseaseCountResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                // API contract states that these will be present
                expect(this_result).not.toBeNull();
            });
            searcher.associationsByDiseaseCount('http://linkedlifedata.com/resource/umls/id/C0004238', null, callback);
        });
        it("can handle random URI", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseAssociationsByDiseaseCountResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toEqual(true);
                expect(this_status).toEqual(200);
                expect(this_result).toEqual(0);
            });
            searcher.associationsByDiseaseCount('http://www.conceptwiki.org/concept/876876876', null, callback);
        });
    });
    describe("associations for disease", function() {

        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseAssociationsByDiseaseResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                expect(this_result).toBeDefined();
                expect(this_result.length).toBeGreaterThan(0);
                expect(this_result[0].about).not.toBeNull();
                expect(this_result[0].dataset).not.toBeNull();
                expect(this_result[0].primarySource).not.toBeNull();
                expect(this_result[0].primarySource.length).toBeGreaterThan(0);
		expect(this_result[0].type).not.toBeNull();
		expect(this_result[0].type.length).toBeGreaterThan(0);
		expect(this_result[0].type[0].label).not.toBeNull();
		expect(this_result[0].type[0].URI).not.toBeNull();
                // pmid & description are optional but can be empty arrays
                expect(this_result[0].pmid).not.toBeNull();
                expect(this_result[0].description).not.toBeNull();
                expect(this_result[0].gene).not.toBeNull();
		expect(this_result[0].gene.URI).not.toBeNull();
		// API contract not being fulfilled for gene encodes so can be null for disease associations
		expect(this_result[0].gene.encodes).toBeDefined();
		// encodesProvenance & encodesLabel are optional
		expect(this_result[0].gene.encodesProvenance).toBeDefined();
		expect(this_result[0].gene.encodesLabel).toBeDefined();
                expect(this_result[0].disease).not.toBeNull();
                expect(this_result[0].disease.name).not.toBeNull();
                expect(this_result[0].disease.dataset).not.toBeNull();
                expect(this_result[0].disease.diseaseClasses).not.toBeNull();
                expect(this_result[0].disease.diseaseClasses.length).toBeGreaterThan(0);
                expect(this_result[0].disease.diseaseClasses[0].URI).not.toBeNull(0);
                expect(this_result[0].disease.diseaseClasses[0].name).not.toBeNull(0);
                expect(this_result[0].disease.diseaseClasses[0].dataset).not.toBeNull(0);
            });
            searcher.associationsByDisease('http://linkedlifedata.com/resource/umls/id/C0004238', null, null, null, null, callback);
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
            searcher.associationsByDisease('http://www.conceptwiki.org/concept/876876876', null, null, null, null, callback);
        });
    });

});
