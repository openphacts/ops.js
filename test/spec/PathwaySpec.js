describe("Pathways", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.PathwaySearch(appUrl, appID, appKey);
  });

  describe("get information", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getInformation');
      searcher.getInformation('uri', 'lens', 'callback');
      expect(searcher.getInformation).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getInformation("http://rdf.wikipathways.org/WP1019_r48131", null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
});
