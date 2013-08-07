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
      waitsFor(function() {
        return this_success != null;
      });
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        var result = searcher.parseTargetResponse(response);
        expect(result.id).toBeDefined();
        expect(result.cellularLocation).toBeDefined();
        expect(result.molecularWeight).toBeDefined();
        expect(result.numberOfResidues).toBeDefined();
        expect(result.theoreticalPi).toBeDefined();
        expect(result.description).toBeDefined();
        expect(result.subClassOf).toBeDefined();
        expect(result.keywords).toBeDefined();
        expect(result.functionAnnotation).toBeDefined();
        expect(result.alternativeName).toBeDefined();
        expect(result.existence).toBeDefined();
        expect(result.organism).toBeDefined();
        expect(result.sequence).toBeDefined();
        expect(result.classifiedWith).toBeDefined();
        expect(result.seeAlso).toBeDefined();
        expect(result.drugbankURI).toBeDefined();
        expect(result.prefLabel).toBeDefined();
      };
      searcher.fetchTarget('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', callback);
    });
    it("and use a chembl uri as input", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      waitsFor(function() {
        return this_success != null;
      });
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        var result = searcher.parseTargetResponse(response);
        expect(result.id).toBeDefined();
        expect(result.cellularLocation).toBeDefined();
        expect(result.molecularWeight).toBeDefined();
        expect(result.numberOfResidues).toBeDefined();
        expect(result.theoreticalPi).toBeDefined();
        expect(result.description).toBeDefined();
        expect(result.subClassOf).toBeDefined();
        expect(result.keywords).toBeDefined();
        expect(result.functionAnnotation).toBeDefined();
        expect(result.alternativeName).toBeDefined();
        expect(result.existence).toBeDefined();
        expect(result.organism).toBeDefined();
        expect(result.sequence).toBeDefined();
        expect(result.classifiedWith).toBeDefined();
        expect(result.seeAlso).toBeDefined();
        expect(result.drugbankURI).toBeDefined();
        expect(result.prefLabel).toBeDefined();
      };
      searcher.fetchTarget('http://data.kasabi.com/dataset/chembl-rdf/chemblid/CHEMBL1906', callback);
    });
    it("can handle singleton response", function() {
      var callback=function(success, status, response){
        var result = searcher.parseTargetResponse(response);
        expect(result.organism).toBeDefined();
        expect(success).toEqual(true);
        expect(status).toEqual(200);
      };
      searcher.fetchTarget('http://www.conceptwiki.org/concept/9e4b292d-5906-42f1-a4c1-1a48b5907242', callback);
    });
    it("and handle errors", function() {
      var callback=function(success, status){
        expect(success).toEqual(false);
        expect(status).toEqual(404);
      };
      searcher.fetchTarget('http://www.conceptwiki.org/concept/876876876', callback);
    });
  });
  describe("target pharmacology search", function() {

    it("and return a response", function() {
      var callback=function(success, status, response){
        var result = searcher.parseTargetPharmacologyResponse(response);
        expect(result[0].csid).toBeDefined();
      };
      searcher.targetPharmacology('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', 1, 20, callback);
    });
    it("and handle errors", function() {
      var callback=function(success, status){
        expect(success).toEqual(false);
        expect(status).toEqual(404);
      };
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
        return this_success != null;
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
