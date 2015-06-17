describe("Compound search", function() {
    var searcher, appID, appKey;

    beforeEach(function() {
        appID = $.url().param('app_id');
        appKey = $.url().param('app_key');
        appUrl = $.url().param('app_url');
        searcher = new Openphacts.CompoundSearch(appUrl, appID, appKey);
    });

    describe("single compound search", function() {

        it("can be executed", function() {
            spyOn(searcher, 'fetchCompound');
            searcher.fetchCompound('compoundURI', 'lens', 'callback');
            expect(searcher.fetchCompound).toHaveBeenCalled();
        });
        it("executes asynchronously", function() {
            var callback = jasmine.createSpy();
            searcher.fetchCompound('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, callback);
            waitsFor(function() {
                return callback.callCount > 0;
            });
            runs(function() {
                expect(callback).toHaveBeenCalled();
            });
        });
    });

    describe("parse compound with singleton exactMatch block", function() {

        it("info contains some non null values", function() {
            var JSONResponse = {"primaryTopic": {"_about": "http://www.conceptwiki.org/concept/index/58124e75-a5b0-496c-b198-ff4529d9090a","exactMatch": {"_about": "http://ops.rsc.org/OPS1415040","inDataset": "http://ops.rsc.org","inchi": "InChI=1S/C17H23NO3.H2O4S.H2O/c1-18-13-7-8-14(18)10-15(9-13)21-17(20)16(11-19)12-5-3-2-4-6-12;1-5(2,3)4;/h2-6,13-16,19H,7-11H2,1H3;(H2,1,2,3,4);1H2","inchikey": "PVGPXGKNDGTPTD-UHFFFAOYSA-N","molformula": "C17H27NO8S","molweight": 405.463,"smiles": "CN1C2CCC1CC(C2)OC(=O)C(CO)C3=CC=CC=C3.O.OS(=O)(=O)O"}}};
            var this_result = searcher.parseCompoundResponse(JSONResponse);
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
    });

    describe("fetch multiple compounds using batch call", function() {

        it("can be executed", function() {
            spyOn(searcher, 'fetchCompoundBatch');
            searcher.fetchCompoundBatch(['compoundURI1', 'compoundURI2'], 'lens', 'callback');
            expect(searcher.fetchCompoundBatch).toHaveBeenCalled();
        });
        it("executes asynchronously", function() {
            var callback = jasmine.createSpy();
            searcher.fetchCompoundBatch(['http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', 'http://www.conceptwiki.org/concept/dd758846-1dac-4f0d-a329-06af9a7fa413'], null, callback);
            waitsFor(function() {
                return callback.callCount > 0;
            });
            runs(function() {
                expect(callback).toHaveBeenCalled();
            });
        });
    });

    describe("compound pharmacology search", function() {

        it("can be executed", function() {
            spyOn(searcher, 'compoundPharmacology');
            searcher.compoundPharmacology('URI', 'assayOrganism', 'targetOrganism', 'activityType', 'activityValue', 'minActivityValue', 'minExActivityValue', 'maxActivityValue', 'maxExActivityValue', 'activityUnit', 'activityRelation', 'pChembl', 'minpChembl', 'minExpChembl', 'maxpChembl', 'maxExpChembl', 'targetType', 'page', 'pageSize', 'orderBy', 'lens', 'callback');
            expect(searcher.compoundPharmacology).toHaveBeenCalled();
        });
        it("executes asynchronously", function() {
            var callback = jasmine.createSpy();
            searcher.compoundPharmacology('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, 20, null, null, callback);
            waitsFor(function() {
                return callback.callCount > 0;
            });
            runs(function() {
                expect(callback).toHaveBeenCalled();
            });
        });
    });
    describe("compound pharmacology count", function() {

        it("can be executed", function() {
            spyOn(searcher, 'compoundPharmacologyCount');
            searcher.compoundPharmacologyCount('URI', 'assayOrganism', 'targetOrganism', 'activityType', 'activityValue', 'minActivityValue', 'minExActivityValue', 'maxActivityValue', 'maxExActivityValue', 'activityUnit', 'activityRelation', 'pChembl', 'minpChembl', 'minExpChembl', 'maxpChembl', 'maxExpChembl', 'targetType', 'lens', 'callback');
            expect(searcher.compoundPharmacologyCount).toHaveBeenCalled();
        });
        it("executes asynchronously", function() {
            var callback = jasmine.createSpy();
            searcher.compoundPharmacologyCount('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, callback);
            waitsFor(function() {
                return callback.callCount > 0;
            });
            runs(function() {
                expect(callback).toHaveBeenCalled();
            });
        });
    });
    describe("compound classifications", function() {

        it("can be executed", function() {
            spyOn(searcher, 'compoundClassifications');
            searcher.compoundClassifications('URI', 'tree', 'callback');
            expect(searcher.compoundClassifications).toHaveBeenCalled();
        });
        it("executes asynchronously", function() {
            var callback = jasmine.createSpy();
            searcher.compoundClassifications('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', 'chebi', callback);
            waitsFor(function() {
                return callback.callCount > 0;
            });
            runs(function() {
                expect(callback).toHaveBeenCalled();
            });
        });
    });
});
