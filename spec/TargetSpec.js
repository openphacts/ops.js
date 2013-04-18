describe("Target search", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      searcher = new Openphacts.TargetSearch("https://ops2.few.vu.nl");
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
  });

  describe("single target search", function() {

    it("can be executed", function() {
      spyOn(searcher, 'fetchTarget');
      searcher.fetchTarget('a','b', 'c', 'd');
      expect(searcher.fetchTarget).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var callback=function(response){
        var result = searcher.parseTargetResponse(response);
        expect(result.id).toBeDefined();
        expect(result.cellularLocation).toBeDefined();
        expect(result.molecularWeight).toBeDefined();
        expect(result.numberOfResidues).toBeDefined();
        expect(result.theoreticalPi).toBeDefined();
        expect(result.description).toBeDefined();
        expect(result.subClassOf).toBeDefined();
        expect(result.keywords).toBeDefined();
        expect(result.functionAnnotation).toBeDefined();
        expect(result.alternativeName).toBeDefined();
        expect(result.existence).toBeDefined();
        expect(result.organism).toBeDefined();
        expect(result.sequence).toBeDefined();
        expect(result.classifiedWith).toBeDefined();
        expect(result.seeAlso).toBeDefined();
        expect(result.drugbankURI).toBeDefined();
      };
      searcher.fetchTarget(appID, appKey, 'http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.fetchTarget(appID, appKey, 'http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
});

