describe("Map URL", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.MapSearch(appUrl, appID, appKey);
  });

  describe("get map of URLs", function() {

    it("can be executed", function() {
      spyOn(searcher, 'mapURL');
      searcher.mapURL('URI', 'targetUriPattern', 'graph', 'lens', 'callback');
      expect(searcher.mapURL).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.mapURL('http://rdf.ebi.ac.uk/resource/chembl/target/CHEMBL3622', null, null, null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
});
