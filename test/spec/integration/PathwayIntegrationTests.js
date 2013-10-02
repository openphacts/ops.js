describe("Pathways", function() {
  var searcher, appID, appKey, appUrl;

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
        expect(pathway_result.title).toBeDefined();
        expect(pathway_result.description).toBeDefined();
        expect(pathway_result.pathwayOntology).toBeDefined();
        expect(pathway_result.identifier).toBeDefined();
        expect(pathway_result.geneProduct).toBeDefined();
        expect(pathway_result.geneProduct.prefLabel).toBeDefined();
        expect(pathway_result.geneProduct.URI).toBeDefined();
        expect(pathway_result.geneProduct.cwURI).toBeDefined();
        //mandatory
        expect(pathway_result.title).not.toBeNull();
        expect(pathway_result.organism).not.toBeNull();
        expect(pathway_result.organismLabel).not.toBeNull();
        expect(pathway_result.identifier).not.toBeNull();
        expect(pathway_result.geneProduct.prefLabel).not.toBeNull();
        expect(pathway_result.geneProduct.URI).not.toBeNull();
        expect(pathway_result.geneProduct.cwURI).not.toBeNull();
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
        expect(pathway_result.title).toBeDefined();
        expect(pathway_result.description).toBeDefined();
        expect(pathway_result.pathwayOntology).toBeDefined();
        expect(pathway_result.identifier).toBeDefined();
        expect(pathway_result.geneProduct).toBeDefined();
        expect(pathway_result.geneProduct.prefLabel).toBeDefined();
        expect(pathway_result.geneProduct.URI).toBeDefined();
        expect(pathway_result.geneProduct.cwURI).toBeDefined();
        //mandatory
        expect(pathway_result.title).not.toBeNull();
        expect(pathway_result.organism).not.toBeNull();
        expect(pathway_result.organismLabel).not.toBeNull();
        expect(pathway_result.identifier).not.toBeNull();
        expect(pathway_result.geneProduct.prefLabel).not.toBeNull();
        expect(pathway_result.geneProduct.URI).not.toBeNull();
        expect(pathway_result.geneProduct.cwURI).not.toBeNull();
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

  describe("get targets for pathway", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	    this_status = status;
        this_result = searcher.parseGetTargetsResponse(response);
      };
      waitsFor(function() {
        return this_result != null;
      });
      runs(function() {
	    expect(this_success).toBe(true);
	    expect(this_status).toBe(200);
        expect(this_result).not.toBeNull();
        expect(this_result.title).toBeDefined();
        expect(this_result.revision).toBeDefined();
        expect(this_result.geneProducts).toBeDefined();
        expect(this_result.geneProducts.length).toBeGreaterThan(0);
        //mandatory
        expect(this_result.title).not.toBeNull();
        expect(this_result.revision).not.toBeNull();
        expect(this_result.geneProducts).not.toBeNull();

      });
      searcher.getTargets('http://identifiers.org/wikipathways/WP1008', null, callback);
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
      searcher.getTargets('456436236', null, callback);
    });
  });

  describe("get compounds for pathway", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	    this_status = status;
        this_result = searcher.parseGetCompoundsResponse(response);
      };
      waitsFor(function() {
        return this_result != null;
      });
      runs(function() {
	    expect(this_success).toBe(true);
	    expect(this_status).toBe(200);
        expect(this_result).not.toBeNull();
        expect(this_result.title).toBeDefined();
        expect(this_result.revision).toBeDefined();
        expect(this_result.metabolites).toBeDefined();
        expect(this_result.metabolites.length).toBeGreaterThan(0);
        //mandatory
        expect(this_result.title).not.toBeNull();
        expect(this_result.revision).not.toBeNull();
        expect(this_result.metabolites).not.toBeNull();

      });
      searcher.getCompounds('http://identifiers.org/wikipathways/WP1008', null, callback);
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
      searcher.getCompounds('456436236', null, callback);
    });
  });

  describe("pathways by reference", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	    this_status = status;
        this_result = searcher.parseByReferenceResponse(response);
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
        expect(pathway_result.title).toBeDefined();
        expect(pathway_result.description).toBeDefined();
        expect(pathway_result.pathwayOntology).toBeDefined();
        expect(pathway_result.identifier).toBeDefined();
        expect(pathway_result.publication).toBeDefined();
        //mandatory
        expect(pathway_result.title).not.toBeNull();
        expect(pathway_result.organism).not.toBeNull();
        expect(pathway_result.organismLabel).not.toBeNull();
        expect(pathway_result.identifier).not.toBeNull();
        expect(pathway_result.publication).not.toBeNull();
      });
      searcher.byReference('http://identifiers.org/pubmed/9789062', null, null, null, null, null, callback);
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
      searcher.byReference('456436236', null, null, null, null, null, callback);
    });
  });

  describe("count pathways by reference", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	    this_status = status;
        this_result = searcher.parseCountPathwaysByReferenceResponse(response);
      };
      waitsFor(function() {
        return this_result != null;
      });
      runs(function() {
	    expect(this_success).toBe(true);
	    expect(this_status).toBe(200);
        expect(this_result).not.toBeNull();
      });
      searcher.countPathwaysByReference('http://identifiers.org/pubmed/9789062', null, null, callback);
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
      searcher.countPathwaysByReference('456436236', null, null, callback);
    });
  });

  describe("get references for pathway", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	    this_status = status;
        this_result = searcher.parseGetReferencesResponse(response);
      };
      waitsFor(function() {
        return this_result != null;
      });
      runs(function() {
	    expect(this_success).toBe(true);
	    expect(this_status).toBe(200);
        expect(this_result).not.toBeNull();
        expect(this_result.title).toBeDefined();
        expect(this_result.revision).toBeDefined();
        expect(this_result.references).toBeDefined();
        expect(this_result.references.length).toBeGreaterThan(0);
        //mandatory
        expect(this_result.title).not.toBeNull();
        expect(this_result.revision).not.toBeNull();
        expect(this_result.references).not.toBeNull();

      });
      searcher.getReferences('http://identifiers.org/wikipathways/WP1015', null, callback);
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
      searcher.getReferences('456436236', null, callback);
    });
  });

  describe("count pathways", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	    this_status = status;
        this_result = searcher.parseCountPathwaysResponse(response);
      };
      waitsFor(function() {
        return this_result != null;
      });
      runs(function() {
	    expect(this_success).toBe(true);
	    expect(this_status).toBe(200);
        expect(this_result).not.toBeNull();
      });
      searcher.countPathways(null, null, callback);
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
        // CORS not allowed due to auth failure since call will otherwise be OK and return 0 items
        expect(this_status).toEqual(0);
      });
      var localSearcher = new Openphacts.PathwaySearch(appUrl, 'jhgjhg', 'jhgjhg');
      localSearcher.countPathways(null, null, callback);
    });
  });

  describe("list pathways", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	    this_status = status;
        this_result = searcher.parseListResponse(response);
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
        expect(pathway_result.title).toBeDefined();
        expect(pathway_result.description).toBeDefined();
        expect(pathway_result.pathwayOntology).toBeDefined();
        expect(pathway_result.identifier).toBeDefined();
        //mandatory
        expect(pathway_result.title).not.toBeNull();
        expect(pathway_result.organism).not.toBeNull();
        expect(pathway_result.organismLabel).not.toBeNull();
        expect(pathway_result.identifier).not.toBeNull();
      });
      searcher.list(null, null, null, null, null, callback);
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
        expect(this_status).toEqual(404);
      });
      searcher.list('fake organism', null, null, null, null, callback);
    });
  });

  describe("organisms", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	    this_status = status;
        this_result = searcher.parseOrganismsResponse(response);
      };
      waitsFor(function() {
        return this_result != null;
      });
      runs(function() {
	    expect(this_success).toBe(true);
	    expect(this_status).toBe(200);
        expect(this_result.length).toBeGreaterThan(0);
        var organisms_result = this_result[0];
        expect(organisms_result).not.toBeNull;
        expect(organisms_result.URI).toBeDefined();
        expect(organisms_result.count).toBeDefined();
        expect(organisms_result.label).toBeDefined();
        //mandatory
        expect(organisms_result.URI).not.toBeNull();
        expect(organisms_result.count).not.toBeNull();
        expect(organisms_result.label).not.toBeNull();
      });
      searcher.organisms(null, null, null, null, callback);
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
      searcher.organisms('fake lens', null, null, null, callback);
    });
  });

});
