describe("Concept Wiki", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
    appID = $.url().param('app_id');
    appKey = $.url().param('app_key');
    appUrl = $.url().param('app_url');
    searcher = new Openphacts.ConceptWikiSearch(appUrl, appID, appKey);
  });

  describe("search by tag", function() {

    it("and return a response for compounds", function() {
      var callback=function(success, status, response){
        var result = searcher.parseResponse(response);
        expect(result[0]).toBeDefined();
      };
      searcher.byTag('Aspirin', '20', '4', '07a84994-e464-4bbf-812a-a4b96fa3d197', callback);
    });
    it("and return a response for targets", function() {
      var callback=function(success, status, response){
        var result = searcher.parseResponse(response);
        expect(result[0]).toBeDefined();
        expect(result[0].uri).toBeDefined();
        expect(result[0].prefLabel).toBeDefined();
        expect(result[0].match).toBeDefined();
      };
      searcher.byTag('Aspirin', '20', '3', 'eeaec894-d856-4106-9fa1-662b1dc6c6f1', callback);
    });
    it("and handle errors", function() {
      var callback=function(success, status){
        expect(success).toEqual(false);
        expect(status).toEqual(500);
      };
      searcher.byTag('Aspirin', '20', '4', '07a84994-e464-4b96fa3d197', callback);
    });
  });
  describe("search for compounds", function() {

    it("and return a response for compounds", function() {
      var callback=function(success, status, response){
        var result = searcher.parseResponse(response);
        expect(result[0]).toBeDefined();
      };
      searcher.findCompounds('Aspirin', '20', '4', callback);
    });
    it("and handle errors", function() {
      var callback=function(success, status){
        expect(success).toEqual(false);
        expect(status).toEqual(500);
      };
      searcher.findCompounds('Aspirin', '-1', '-1', callback);
    });
 });

  describe("search for targets", function() {

    it("and return a response for targets", function() {
      var callback=function(success, status, response){
        var result = searcher.parseResponse(response);
        expect(result[0]).toBeDefined();
        expect(result[0].uri).toBeDefined();
        expect(result[0].prefLabel).toBeDefined();
        expect(result[0].match).toBeDefined();
      };
      searcher.findTargets('PDE5', '20', '3', callback);
    });
    it("and handle errors", function() {
      var callback=function(success, status){
        expect(success).toEqual(false);
        expect(status).toEqual(500);
      };
      searcher.findTargets('PDE5', '-1', '-1', callback);
    });
    it("and handle an empty response for targets", function() {
      var callback=function(success, status, response){
        var result = searcher.parseResponse(response);
        expect(result[0]).toBeDefined();
      };
      searcher.findCompounds('Sorafenib', '20', '4', callback);
    });
 });
  describe("find a single concept", function() {

    it("and return a response", function() {
      var callback=function(success, status, response){
        var result = searcher.parseFindConceptResponse(response);
        expect(result.altLabels).toBeDefined();
        expect(result.prefLabel).toBeDefined();
        expect(result.definition).toBeDefined();
      };
      searcher.findConcept('8e3a87ae-345d-4c25-bd7a-5b3221c6e3fa', callback);
    });
    it("and handle errors", function() {
      var callback=function(success, status){
        expect(success).toEqual(false);
        expect(status).toEqual(500);
      };
      searcher.findConcept('07a84994-e464-4b96fa3d197', callback);
    });
  });
});
