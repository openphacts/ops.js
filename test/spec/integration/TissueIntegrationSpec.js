var Openphacts = require("../../../src/OPS.js");
jasmine.getEnv().defaultTimeoutInterval = 30000;

describe("Tissue search", function() {
    var searcher, appID, appKey, appUrl;

    beforeEach(function() {
        appID = process.env['app_id'];
        appKey = process.env['app_key'];
        appUrl = process.env['app_url'];
	searcher = new TissueSearch(appUrl, appID, appKey);
    });

    describe("single tissue search", function() {

        it("can return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = searcher.parseTissueResponse(response);
            };
            waitsFor(function() {
                return this_result != null;
            });
            runs(function() {
                expect(this_success).toBe(true);
                expect(this_status).toBe(200);

                expect(this_result.uri).not.toBeNull();
                expect(this_result.label).not.toBeNull();
                expect(this_result.dataset).not.toBeNull();
                expect(this_result.definition).toBeDefined();
                expect(this_result.dbXrefs).toBeDefined();
            });
            searcher.fetchTissue('ftp://ftp.nextprot.org/pub/current_release/controlled_vocabularies/caloha.obo#TS-0171', null, callback);
        });
    });
});
