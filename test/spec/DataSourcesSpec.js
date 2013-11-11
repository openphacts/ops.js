describe("Data Sources", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.DataSources(appUrl, appID, appKey);
  });

  describe("get sources", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getSources');
      searcher.getInformation('callback');
      expect(searcher.getSources).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getSources(callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
});
