describe("Activities", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.ActivitySearch(appUrl, appID, appKey);
  });

  describe("get types", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getTypes');
      searcher.getTypes('activityUnit', 'page', 'pageSize', 'orderBy', 'lens', 'callback');
      expect(searcher.getTypes).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getTypes(callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
  describe("get units", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getUnits');
      searcher.getUnits('activityType', 'lens', 'callback');
      expect(searcher.getUnits).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getUnits('IC50', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
});
