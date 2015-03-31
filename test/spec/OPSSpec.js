var Openphacts = require("../../src/OPS.js");
describe("Compound search", function() {
    var searcher, appID, appKey;

    beforeEach(function() {
        appID = "1c22cbe7";
        appKey = "167a3a3d8539b5d85280e7178f4e62ab";
        appUrl = "https://beta.openphacts.org/1.4";
        searcher = new CompoundSearch(appUrl, appID, appKey);
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

});
