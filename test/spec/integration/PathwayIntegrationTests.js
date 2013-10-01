describe("Pathways", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.PathwaySearch(appUrl, appID, appKey);
  });

  describe("get information", function() {

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
        return this_result != null;
      });
      runs(function() {
	    expect(this_success).toBe(true);
	    expect(this_status).toBe(200);
        //optional
        expect(this_result.title).toBeDefined();
        expect(this_result.description).toBeDefined();
        expect(this_result.revision).toBeDefined();
        expect(this_result.pathwayOntology).toBeDefined();
        expect(this_result.parts).toBeDefined();
        //mandatory
        expect(this_result.title).not.toBeNull();
        expect(this_result.organism).not.toBeNull();
        expect(this_result.organismLabel).not.toBeNull();
      });
      searcher.getInformation('http://identifiers.org/wikipathways/WP1019', null, callback);
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
      searcher.getInformation('sdfbgsg', null, callback);
    });
  });
});
