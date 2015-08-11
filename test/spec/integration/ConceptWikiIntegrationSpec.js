var Openphacts = require("../../../src/OPS.js");
jasmine.getEnv().defaultTimeoutInterval = 30000;

describe("Concept Wiki", function() {
  var searcher, appID, appKey, appUrl;

  beforeEach(function() {
        appID = process.env['app_id'];
        appKey = process.env['app_key'];
        appUrl = process.env['app_url'];
	console.log('1');
        searcher = new ConceptWikiSearch(appUrl, appID, appKey);
  });

  describe("search for compounds", function() {

    it("and return a response for compounds", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_result = searcher.parseResponse(response);
      };

      waitsFor(function() {
        return this_result != null;
      });

      runs(function() {
	      console.log('a');
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result[0]).toBeDefined();
      });
      console.log('2');
      searcher.findCompounds('Aspirin', '20', callback);
    });
 });

  describe("search for targets", function() {

    it("and return a response for targets", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_result = searcher.parseResponse(response);
      };

      waitsFor(function() {
        return this_result != null;
      });

      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result[0]).toBeDefined();
        expect(this_result[0].uri).toBeDefined();
        expect(this_result[0].prefLabel).toBeDefined();
        expect(this_result[0].type).toBeDefined();
      });
      searcher.findTargets('PDE5', '20', callback);
    });
    it("and handle an empty response for compounds", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_result = searcher.parseResponse(response);
      };

      waitsFor(function() {
        return this_result != null;
      });

      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
      });
      searcher.findCompounds('Sorafenib', '20', callback);
    });
 });
  describe("free text search", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_response = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_response = response;
      };

      waitsFor(function() {
        return this_response != null;
      });

      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_response).not.toBeNull();
      });
      searcher.freeText('Aspirin', 20, 'chebi', 'compound', callback);
    });
  });
});
