describe("Pathways", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.PathwaySearch(appUrl, appID, appKey);
  });

  describe("get information", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getInformation');
      searcher.getInformation('callback', 'uri');
      expect(searcher.getInformation).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        this_result = searcher.parseInformation(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
	expect(this_success).toBe(true);
	expect(this_status).toBe(200);
        expect(this_result.title).toBeDefined();
        expect(this_result.description).toBeDefined();
        expect(this_result.identifier).toBeDefined();
        expect(this_result.inDataset).toBeDefined();
        expect(this_result.ontology).toBeDefined();
        expect(this_result.parts.length).toBeGreaterThan(1);
      });
      searcher.getInformation(callback, "http://rdf.wikipathways.org/WP1019_r48131");
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getInformation(callback, "http://rdf.wikipathways.org/WP1019_r48131");
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
    it("and handle errors", function() {
      var this_success = null;
      var this_status = null;
      var callback=function(success, status){
        this_success = success;
	this_status = status;
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
        expect(this_success).toEqual(false);
        expect(this_status).toEqual(400);
      });
      searcher.getInformation(callback, "sdfbgsg");
    });
  });
});
