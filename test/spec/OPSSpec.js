var Openphacts = require("../../src/OPS.js");
describe("Compound search", function() {
    var searcher, appID, appKey;

    beforeEach(function() {
        appID = process.env['app_id'];
        appKey = process.env['app_key'];
        appUrl = process.env['app_url'];
//        appID = "1c22cbe7";
//        appKey = "167a3a3d8539b5d85280e7178f4e62ab";
//        appUrl = "https://beta.openphacts.org/1.4";
        searcher = new CompoundSearch(appUrl, appID, appKey);
    });

    describe("single compound search", function() {

        it("can be executed", function() {
            spyOn(searcher, 'fetchCompound');
            searcher.fetchCompound('compoundURI', 'lens', 'callback');
            expect(searcher.fetchCompound).toHaveBeenCalled();
        });
        it("executes asynchronously", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseCompoundResponse(response);
            };
            waitsFor(function() {
                return this_result !== null;
            });
            searcher.fetchCompound('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, callback);
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
        });
        it("can fail", function() {
            var callback = jasmine.createSpy();
            searcher.fetchCompound('http://www.conceptwiki.org/concept/38932552', null, callback);
            waitsFor(function() {
                return callback.callCount > 0;
            });
            runs(function() {
                expect(callback).toHaveBeenCalled();
            });
        });
    });
});
