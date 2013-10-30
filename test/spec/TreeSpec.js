describe("Trees", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.TreeSearch(appUrl, appID, appKey);
  });

  describe("get root nodes", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getRootNodes');
      searcher.getRootNodes('root', 'callback');
      expect(searcher.getRootNodes).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getRootNodes('root', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });

  describe("get child nodes", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getChildNodes');
      searcher.getChildNodes('URI', 'callback');
      expect(searcher.getChildNodes).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getChildNodes('http://purl.uniprot.org/enzyme/1.1.1.-', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
    it("can handle single responses", function() {
	  var response = {'primaryTopic': {'prefLabel': 'hijk', 'childNode': {'_about': 'abcd', 'prefLabel': 'defg'}}};
	  var result = searcher.parseChildNodes(response);
	  expect(result.label).toEqual('hijk');
	  expect(result.children[0].uri).toEqual('abcd');
      expect(result.children[0].names[0]).toEqual('defg');
    });
  });

  describe("get parent nodes", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getParentNodes');
      searcher.getChildNodes('URI', 'callback');
      expect(searcher.getParentNodes).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getParentNodes('http://purl.uniprot.org/enzyme/1.1.1.-', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
    it("can handle single responses", function() {
	  var response = {'primaryTopic': {'prefLabel': 'hijk', 'parentNode': {'_about': 'abcd', 'prefLabel': 'defg'}}};
	  var result = searcher.parseChildNodes(response);
	  expect(result.label).toEqual('hijk');
	  expect(result.parents[0].uri).toEqual('abcd');
      expect(result.parents[0].names[0]).toEqual('defg');
    });
  });

  describe("get pharmacology count", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getTargetClassPharmacologyCount');
      searcher.getTargetClassPharmacologyCount('URI', 'assayOrganism', 'targetOrganism', 'activityType', 'activityValue', 'activityUnit', 'relation', 'pChembl', 'min-pChembl', 'minEx-pChembl', 'max-pChembl', 'maxEx-pChembl', 'targetType', 'lens', 'callback');
      expect(searcher.getTargetClassPharmacologyCount).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getTargetClassPharmacologyCount('http://purl.uniprot.org/enzyme/1.1.1.-', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });

  describe("get pharmacology paginated", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getTargetClassPharmacologyPaginated');
      searcher.getTargetClassPharmacologyPaginated('URI', 'assayOrganism', 'targetOrganism', 'activityType', 'activityValue', 'activityUnit', 'relation', 'pChembl', 'min-pChembl', 'minEx-pChembl', 'max-pChembl', 'maxEx-pChembl', 'targetType', 'lens', 'page', 'pageSize', 'orderBy', 'callback');
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getTargetClassPharmacologyPaginated('http://purl.uniprot.org/enzyme/1.1.1.-', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
});
