describe("Concept Wiki", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
    searcher = new Openphacts.ConceptWikiSearch("https://beta.openphacts.org");
    appID = $.url().param('app_id');
    appKey = $.url().param('app_key');
  });

  describe("search by tag", function() {

    it("can be executed", function() {
      spyOn(searcher, 'byTag');
      searcher.byTag('a','b', 'c', 'd', 'e', 'f', 'h');
      expect(searcher.byTag).toHaveBeenCalled();
    });
    it("and return a response for compounds", function() {
      var callback=function(success, status, response){
        var result = searcher.parseResponse(response);
        expect(result[0]).toBeDefined();
      };
      searcher.byTag(appID,appKey, 'Aspirin', '20', '4', '07a84994-e464-4bbf-812a-a4b96fa3d197', callback);
    });
    it("and return a response for targets", function() {
      var callback=function(success, status, response){
        var result = searcher.parseResponse(response);
        expect(result[0]).toBeDefined();
        expect(result[0].uri).toBeDefined();
        expect(result[0].prefLabel).toBeDefined();
        expect(result[0].match).toBeDefined();
      };
      searcher.byTag(appID,appKey, 'Aspirin', '20', '3', 'eeaec894-d856-4106-9fa1-662b1dc6c6f1', callback);
    });
    it("searches for compounds asynchronously", function() {
      var callback=jasmine.createSpy();
      searcher.byTag(appID,appKey, 'Aspirin', '20', '4', '07a84994-e464-4bbf-812a-a4b96fa3d197', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
    it("searches for targets asynchronously", function() {
      var callback=jasmine.createSpy();
      searcher.byTag(appID,appKey, 'Aspirin', '20', '3', 'eeaec894-d856-4106-9fa1-662b1dc6c6f1', callback);
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
        expect(status).toEqual(500);
      };
      searcher.byTag(appID,appKey, 'Aspirin', '20', '4', '07a84994-e464-4b96fa3d197', callback);
    });
  });
  describe("search for compounds", function() {

    it("can be executed", function() {
      spyOn(searcher, 'findCompounds');
      searcher.findCompounds('a','b', 'c', 'd', 'e', 'f', 'h');
      expect(searcher.findCompounds).toHaveBeenCalled();
    });
    it("and return a response for compounds", function() {
      var callback=function(success, status, response){
        var result = searcher.parseResponse(response);
        expect(result[0]).toBeDefined();
      };
      searcher.findCompounds(appID,appKey, 'Aspirin', '20', '4', callback);
    });
    it("searches for compounds asynchronously", function() {
      var callback=jasmine.createSpy();
      searcher.findCompounds(appID,appKey, 'Aspirin', '20', '4', callback);
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
        expect(status).toEqual(500);
      };
      searcher.findCompounds(appID,appKey, 'Aspirin', '-1', '-1', callback);
    });
  });

  describe("search for targets", function() {

    it("can be executed", function() {
      spyOn(searcher, 'findTargets');
      searcher.findTargets('a','b', 'c', 'd', 'e', 'f');
      expect(searcher.findTargets).toHaveBeenCalled();
    });
    it("and return a response for targets", function() {
      var callback=function(success, status, response){
        var result = searcher.parseResponse(response);
        expect(result[0]).toBeDefined();
        expect(result[0].uri).toBeDefined();
        expect(result[0].prefLabel).toBeDefined();
        expect(result[0].match).toBeDefined();
      };
      searcher.findTargets(appID,appKey, 'PDE5', '20', '3', callback);
    });
    it("searches for targets asynchronously", function() {
      var callback=jasmine.createSpy();
      searcher.findTargets(appID,appKey, 'Aspirin', '20', '3', callback);
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
        expect(status).toEqual(500);
      };
      searcher.findTargets(appID,appKey, 'PDE5', '-1', '-1', callback);
    });
  });
});
