describe("Target search", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.TargetSearch(appUrl, appID, appKey);
  });

  describe("single target search", function() {

    it("can be executed", function() {
      spyOn(searcher, 'fetchTarget');
      searcher.fetchTarget('target', 'lens', 'callback');
      expect(searcher.fetchTarget).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.fetchTarget('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
  describe("target pharmacology search", function() {

    it("can be executed", function() {
      spyOn(searcher, 'targetPharmacology');
      searcher.targetPharmacology('URI', 'assayOrganism', 'targetOrganism', 'activityType', 'activityValue', 'minActivityValue', 'minExActivityValue', 'maxActivityValue', 'maxExActivityValue', 'activityUnit', 'activityRelation', 'pChembl', 'minpChembl', 'minExpChembl', 'maxpChembl', 'maxExpChembl', 'targetType', 'page', 'pageSize', 'orderBy', 'lens', 'callback');
      expect(searcher.targetPharmacology).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.targetPharmacology('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, 20, null, null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
  describe("target pharmacology count", function() {

    it("can be executed", function() {
      spyOn(searcher, 'targetPharmacologyCount');
      searcher.targetPharmacologyCount('URI', 'assayOrganism', 'targetOrganism', 'activityType', 'activityValue', 'minActivityValue', 'minExActivityValue', 'maxActivityValue', 'maxExActivityValue', 'activityUnit', 'activityRelation', 'pChembl', 'minpChembl', 'minExpChembl', 'maxpChembl', 'maxExpChembl', 'targetType', 'lens', 'callback');
      expect(searcher.targetPharmacologyCount).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.targetPharmacologyCount('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
        expect(callback).toHaveBeenCalled();
      });
    });
  });
  describe("compounds for target", function() {

    it("can be executed", function() {
      spyOn(searcher, 'compoundsForTarget');
      searcher.compoundsForTarget('targetURI', 'callback');
      expect(searcher.compoundsForTarget).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.compoundsForTarget('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
        expect(callback).toHaveBeenCalled();
      });
    });
  });
});
