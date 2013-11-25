describe("Compound search", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.CompoundSearch(appUrl, appID, appKey);
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
  describe("compound pharmacology search", function() {

    it("can be executed", function() {
      spyOn(searcher, 'compoundPharmacology');
      searcher.compoundPharmacology('URI', 'assayOrganism', 'targetOrganism', 'activityType', 'activityValue', 'minActivityValue', 'minExActivityValue', 'maxActivityValue', 'maxExActivityValue', 'activityUnit', 'page', 'pageSize', 'orderBy', 'callback');
      expect(searcher.compoundPharmacology).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.compoundPharmacology('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, null, null, null, null, null, null, null, null, 1, 20, null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
  describe("compound pharmacology count", function() {

    it("can be executed", function() {
      spyOn(searcher, 'compoundPharmacologyCount');
      searcher.compoundPharmacologyCount('URI', 'assayOrganism', 'targetOrganism', 'activityType', 'activityValue', 'minActivityValue', 'minExActivityValue', 'maxActivityValue', 'maxExActivityValue', 'activityUnit', 'callback');
      expect(searcher.compoundPharmacologyCount).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.compoundPharmacologyCount('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, null, null, null, null, null, null, null, null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
});
