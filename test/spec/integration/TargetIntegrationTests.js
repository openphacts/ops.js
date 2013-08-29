describe("Target search", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.TargetSearch(appUrl, appID, appKey);
  });

  describe("single target search", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_result = searcher.parseTargetResponse(response);
      };

      waitsFor(function() {
        return this_result != null;
      });

      runs(function() {
        expect(this_success).toBe(true);
        expect(this_status).toBe(200);
        expect(this_result).toBeDefined();

        // mandatory
        expect(this_result.id).not.toBeNull();
        expect(this_result.cwURI).not.toBeNull();
        expect(this_result.uniprotURI).not.toBeNull();
        expect(this_result.existence).not.toBeNull();

        // optional
        expect(this_result.cellularLocation).toBeDefined();
        expect(this_result.molecularWeight).toBeDefined();
        expect(this_result.numberOfResidues).toBeDefined();
        expect(this_result.theoreticalPi).toBeDefined();
        expect(this_result.keywords).toBeDefined();
        expect(this_result.functionAnnotation).toBeDefined();
        expect(this_result.alternativeName).toBeDefined();
        expect(this_result.organism).toBeDefined();
        expect(this_result.sequence).toBeDefined();
        expect(this_result.classifiedWith).toBeDefined();
        expect(this_result.seeAlso).toBeDefined();
        expect(this_result.drugbankURI).toBeDefined();
        expect(this_result.prefLabel).toBeDefined();
        expect(this_result.chemblItems).toBeDefined();
      });

      searcher.fetchTarget('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', callback);
    });
    it("and use a chembl uri as input", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_result = searcher.parseTargetResponse(response);
      };

      waitsFor(function() {
        return this_result != null && this_success != null;
      });

      runs(function() {
        expect(this_success).toBe(true);
        expect(this_status).toBe(200);
        expect(this_result).toBeDefined();

        // mandatory
        expect(this_result.id).not.toBeNull();
        expect(this_result.cwURI).not.toBeNull();
        expect(this_result.uniprotURI).not.toBeNull();
        expect(this_result.existence).not.toBeNull();

        // optional
        expect(this_result.cellularLocation).toBeDefined();
        expect(this_result.molecularWeight).toBeDefined();
        expect(this_result.numberOfResidues).toBeDefined();
        expect(this_result.theoreticalPi).toBeDefined();
        expect(this_result.keywords).toBeDefined();
        expect(this_result.functionAnnotation).toBeDefined();
        expect(this_result.alternativeName).toBeDefined();
        expect(this_result.organism).toBeDefined();
        expect(this_result.sequence).toBeDefined();
        expect(this_result.classifiedWith).toBeDefined();
        expect(this_result.seeAlso).toBeDefined();
        expect(this_result.drugbankURI).toBeDefined();
        expect(this_result.prefLabel).toBeDefined();
        expect(this_result.chemblItems).toBeDefined();
      });

      searcher.fetchTarget('http://rdf.ebi.ac.uk/resource/chembl/target/CHEMBL1075146', callback);
    });

    it("and handle errors", function() {
      var this_success = null;
      var this_status = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
      };

      waitsFor(function() {
        return this_success != null;
      });

      runs(function() {
        expect(this_success).toBe(false);
        expect(this_status).toBe(404);
      });

      searcher.fetchTarget('http://www.conceptwiki.org/concept/876876876', callback);
    });
  });

  describe("target pharmacology search", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_result = searcher.parseTargetPharmacologyResponse(response);
      };

      waitsFor(function() {
        return this_result != null;
      });

      runs(function() {
        expect(this_success).toBe(true);
        expect(this_status).toBe(200);
        expect(this_result).toBeDefined();
      });

      searcher.targetPharmacology('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', 1, 20, callback);
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
        expect(this_success).toBe(false);
        expect(this_status).toBe(404);
      });

      searcher.targetPharmacology('http://www.conceptwiki.org/concept/876876876', 1, 20, callback);
    });
  });

  describe("target pharmacology count", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_result = searcher.parseTargetPharmacologyCountResponse(response);
      };

      waitsFor(function() {
        return this_result != null;
      });

      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result).toBeDefined();
      });

      searcher.targetPharmacologyCount('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', callback);
    });
  });
});
