describe("Pathways", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.PathwaySearch(appUrl, appID, appKey);
  });

  describe("information", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	    this_status = status;
        this_result = searcher.parseInformationResponse(response);
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
      searcher.information('http://identifiers.org/wikipathways/WP1019', null, callback);
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
      searcher.information('sdfbgsg', null, callback);
    });
  });

  describe("pathways by compound", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	    this_status = status;
        this_result = searcher.parseByCompoundResponse(response);
      };
      waitsFor(function() {
        return this_result != null;
      });
      runs(function() {
	    expect(this_success).toBe(true);
	    expect(this_status).toBe(200);
        expect(this_result.length).toBeGreaterThan(0);
        var pathway_result = this_result[0];
        expect(pathway_result).not.toBeNull;
        //optional
        expect(pathway_result.title).toBeDefined();
        expect(pathway_result.description).toBeDefined();
        expect(pathway_result.pathwayOntology).toBeDefined();
        expect(pathway_result.identifier).toBeDefined();
        expect(pathway_result.type).toBeDefined();
        expect(pathway_result.prefLabel).toBeDefined();
        expect(pathway_result.about).toBeDefined();
        //mandatory
        expect(pathway_result.title).not.toBeNull();
        expect(pathway_result.organism).not.toBeNull();
        expect(pathway_result.organismLabel).not.toBeNull();
        expect(pathway_result.identifier).not.toBeNull();
        expect(pathway_result.type).not.toBeNull();
        expect(pathway_result.prefLabel).not.toBeNull();
        expect(pathway_result.about).not.toBeNull();
      });
      searcher.byCompound('http://www.conceptwiki.org/concept/83931753-9e3f-4e90-b104-e3bcd0b4d833', null, null, null, null, null, callback);
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
      searcher.byCompound('456436236', null, null, null, null, null, callback);
    });
  });

  describe("count pathways by compound", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	    this_status = status;
        this_result = searcher.parseCountPathwaysByCompoundResponse(response);
      };
      waitsFor(function() {
        return this_result != null;
      });
      runs(function() {
	    expect(this_success).toBe(true);
	    expect(this_status).toBe(200);
        expect(this_result).not.toBeNull();
      });
      searcher.countPathwaysByCompound('http://www.conceptwiki.org/concept/83931753-9e3f-4e90-b104-e3bcd0b4d833', null, null, callback);
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
      searcher.countPathwaysByCompound('456436236', null, null, callback);
    });
  });

  describe("pathways by target", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	    this_status = status;
        this_result = searcher.parseByTargetResponse(response);
      };
      waitsFor(function() {
        return this_result != null;
      });
      runs(function() {
	    expect(this_success).toBe(true);
	    expect(this_status).toBe(200);
        expect(this_result.length).toBeGreaterThan(0);
        var pathway_result = this_result[0];
        expect(pathway_result).not.toBeNull;
        //optional
        expect(pathway_result.title).toBeDefined();
        expect(pathway_result.description).toBeDefined();
        expect(pathway_result.pathwayOntology).toBeDefined();
        expect(pathway_result.identifier).toBeDefined();
        expect(pathway_result.type).toBeDefined();
        expect(pathway_result.prefLabel).toBeDefined();
        expect(pathway_result.about).toBeDefined();
        //mandatory
        expect(pathway_result.title).not.toBeNull();
        expect(pathway_result.organism).not.toBeNull();
        expect(pathway_result.organismLabel).not.toBeNull();
        expect(pathway_result.identifier).not.toBeNull();
        expect(pathway_result.type).not.toBeNull();
        expect(pathway_result.prefLabel).not.toBeNull();
        expect(pathway_result.about).not.toBeNull();
      });
      searcher.byTarget('http://identifiers.org/ncbigene/282478', null, null, null, null, null, callback);
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
      searcher.byTarget('456436236', null, null, null, null, null, callback);
    });
  });

  describe("count pathways by target", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	    this_status = status;
        this_result = searcher.parseCountPathwaysByTargetResponse(response);
      };
      waitsFor(function() {
        return this_result != null;
      });
      runs(function() {
	    expect(this_success).toBe(true);
	    expect(this_status).toBe(200);
        expect(this_result).not.toBeNull();
      });
      searcher.countPathwaysByTarget('http://identifiers.org/ncbigene/282478', null, null, callback);
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
      searcher.countPathwaysByTarget('456436236', null, null, callback);
    });
  });

});
