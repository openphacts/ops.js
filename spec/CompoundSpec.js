describe("Compound search", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      searcher = new Openphacts.CompoundSearch("https://ops2.few.vu.nl");
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
  });

  describe("single compound search", function() {

    it("can be executed", function() {
      spyOn(searcher, 'fetchCompound');
      searcher.fetchCompound('a','b', 'c', 'd');
      expect(searcher.fetchCompound).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var callback=function(response){
        var compoundResult = searcher.parseCompoundResponse(response);
        expect(compoundResult.id).toBeDefined();
        expect(compoundResult.prefLabel).toBeDefined();
        expect(compoundResult.cwUri).toBeDefined();
        expect(compoundResult.description).toBeDefined();
        expect(compoundResult.biotransformationItem).toBeDefined();
        expect(compoundResult.toxicity).toBeDefined();
        expect(compoundResult.proteinBinding).toBeDefined();
        expect(compoundResult.csUri).toBeDefined();
        expect(compoundResult.hba).toBeDefined();
        expect(compoundResult.hbd).toBeDefined();
        expect(compoundResult.inchi).toBeDefined();
        expect(compoundResult.logp).toBeDefined();
        expect(compoundResult.psa).toBeDefined();
        expect(compoundResult.ro5Violations).toBeDefined();
        expect(compoundResult.smiles).toBeDefined();
        expect(compoundResult.chemblURI).toBeDefined();
        expect(compoundResult.fullMWT).toBeDefined();
        expect(compoundResult.molform).toBeDefined();
        expect(compoundResult.mwFreebase).toBeDefined();
        expect(compoundResult.rtb).toBeDefined();
      };
      searcher.fetchCompound(appID, appKey, 'http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.fetchCompound(appID, appKey, 'http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
});
