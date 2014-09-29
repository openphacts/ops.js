describe("Disease search", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.DiseaseSearch(appUrl, appID, appKey);
  });
  describe("single disease search", function() {

    it("can be executed", function() {
      spyOn(searcher, 'fetchDisease');
      searcher.fetchDisease('diseaseURI', 'lens', 'callback');
      expect(searcher.fetchDisease).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.fetchDisease('http://linkedlifedata.com/resource/umls/id/C0004238', null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });

});
