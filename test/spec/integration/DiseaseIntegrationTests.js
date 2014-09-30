describe("Disease search", function() {

  var searcher, appID, appKey, appUrl;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.DiseaseSearch(appUrl, appID, appKey);
  });
  describe("single disease search", function() {

    it("can return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_result = searcher.parseDiseaseResponse(response);
      };
      waitsFor(function() {
        return this_result != null;
      });
      runs(function() {
        expect(this_success).toBe(true);
        expect(this_status).toBe(200);

        // API contract states that these will be present
        expect(this_result.id).not.toBeNull();
        expect(this_result.name).not.toBeNull();
        expect(this_result.URI).not.toBeNull();

	// May not be present but should be defined
	expect(this_result.diseaseClass).not.toBeNull();
	expect(this_result.diseaseClass.length).toEqual(2);
	expect(this_result.diseaseClass[0].name).not.toBeNull();
	expect(this_result.diseaseClass[0].URI).not.toBeNull();
      });
      searcher.fetchDisease('http://linkedlifedata.com/resource/umls/id/C0004238', null, callback);
    });
    it("can handle errors", function() {
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
        expect(this_status).toEqual(404);
      });
      searcher.fetchDisease('http://www.conceptwiki.org/concept/876876876', null, callback);
    });
  });
  describe("count diseases for target", function() {

    it("can return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_result = searcher.parseDiseasesByTargetCountResponse(response);
      };
      waitsFor(function() {
        return this_result != null;
      });
      runs(function() {
        expect(this_success).toBe(true);
        expect(this_status).toBe(200);

        // API contract states that these will be present
        expect(this_result).not.toBeNull();
      });
      searcher.diseasesByTargetCount('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, callback);
    });
    it("can handle random URI", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        this_result = searcher.parseDiseasesByTargetCountResponse(response);
      };
      waitsFor(function() {
        return this_result != null;
      });
      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
	expect(this_result).toEqual(0);
      });
      searcher.diseasesByTargetCount('http://www.conceptwiki.org/concept/876876876', null, callback);
    });
  });
  describe("diseases for target", function() {

    it("can return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_result = searcher.parseDiseasesByTargetResponse(response);
      };
      waitsFor(function() {
        return this_result != null;
      });
      runs(function() {
        expect(this_success).toBe(true);
        expect(this_status).toBe(200);

        // API contract states that these will be present
        expect(this_result).toBeDefined();
	expect(this_result.length).toBeGreaterThan(0);
	expect(this_result[0].name).not.toBeNull();
        expect(this_result[0].URI).not.toBeNull();
        expect(this_result[0].gene).not.toBeNull();
	expect(this_result[0].encodes).not.toBeNull();
	// May not be present but should be defined
	expect(this_result[0].encodeURI).toBeDefined();
	expect(this_result[0].encodeLabel).toBeDefined();
      });
      searcher.diseasesByTarget('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, null, null, null, callback);
    });
    it("can handle errors", function() {
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
        expect(this_status).toEqual(404);
      });
      searcher.diseasesByTarget('http://www.conceptwiki.org/concept/876876876', null, null, null, null, callback);
    });
  });

});


