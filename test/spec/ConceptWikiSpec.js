describe("Concept Wiki", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
    appID = $.url().param('app_id');
    appKey = $.url().param('app_key');
    appUrl = $.url().param('app_url');
    searcher = new Openphacts.ConceptWikiSearch(appUrl, appID, appKey);
  });

  describe("search by tag", function() {

    it("can be executed", function() {
      spyOn(searcher, 'byTag');
      searcher.byTag('query', 'total', 'branch', 'uuid', 'callback');
      expect(searcher.byTag).toHaveBeenCalled();
    });
    it("searches for compounds asynchronously", function() {
      var callback=jasmine.createSpy();
      searcher.byTag('Aspirin', '20', '4', '07a84994-e464-4bbf-812a-a4b96fa3d197', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
    it("searches for targets asynchronously", function() {
      var callback=jasmine.createSpy();
      searcher.byTag('Aspirin', '20', '3', 'eeaec894-d856-4106-9fa1-662b1dc6c6f1', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
  describe("search for compounds", function() {

    it("can be executed", function() {
      spyOn(searcher, 'findCompounds');
      searcher.findCompounds('query', 'total', 'branch', 'callback');
      expect(searcher.findCompounds).toHaveBeenCalled();
    });
    it("searches for compounds asynchronously", function() {
      var callback=jasmine.createSpy();
      searcher.findCompounds('Aspirin', '20', '4', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
 });

  describe("search for targets", function() {

    it("can be executed", function() {
      spyOn(searcher, 'findTargets');
      searcher.findTargets('query', 'total', 'branch', 'callback');
      expect(searcher.findTargets).toHaveBeenCalled();
    });
    it("searches for targets asynchronously", function() {
      var callback=jasmine.createSpy();
      searcher.findTargets('Aspirin', '20', '3', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
 });
  describe("find a single concept", function() {

    it("can be executed", function() {
      spyOn(searcher, 'findConcept');
      searcher.findConcept('uuid', 'callback');
      expect(searcher.findConcept).toHaveBeenCalled();
    });
    it("finds single concepts asynchronously", function() {
      var callback=jasmine.createSpy();
      searcher.findConcept('8e3a87ae-345d-4c25-bd7a-5b3221c6e3fa', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
  describe("free text search", function() {

    it("can be executed", function() {
      spyOn(searcher, 'freeText');
      searcher.freeText('query', 'limit', 'branch', 'callback');
      expect(searcher.freeText).toHaveBeenCalled();
    });
    it("finds single concepts asynchronously", function() {
      var callback=jasmine.createSpy();
      searcher.freeText('Aspirin', null, null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
});
