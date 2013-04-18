describe("Concept Wiki", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
    searcher = new Ops.ConceptWikiSearch("https://ops2.few.vu.nl/search/");
    appID = $.url().param('app_id');
    appKey = $.url().param('app_key');
  });

  describe("search by tag", function() {

    it("can be executed", function() {
      spyOn(searcher, 'byTag');
      searcher.byTag('a','b', 'c', 'd', 'e', 'f', 'h');
      expect(searcher.byTag).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var callback=function(success, status, response){
        var result = searcher.parseResponse(response);
        expect(result[0]).toBeDefined();
      };
      searcher.byTag(appID,appKey, 'Aspirin', '20', '4', '07a84994-e464-4bbf-812a-a4b96fa3d197', callback);
    });
    it("executes asynchronously", function() {
      var callback=jasmine.createSpy();
      searcher.byTag(appID,appKey, 'Aspirin', '20', '4', '07a84994-e464-4bbf-812a-a4b96fa3d197', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
    it("and handle errors", function() {
      var callback=function(success, status){
        expect(success).toEqual(false);
      };
      searcher.byTag(appID,appKey, 'Aspirin', '20', '4', '07a84994-e464-4ba-a4b96fa3d197', callback);
    });
  });
});
