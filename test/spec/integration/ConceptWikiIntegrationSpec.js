var Openphacts = require("../../../src/OPS.js");
describe("Concept Wiki", function() {
  var searcher, appID, appKey, appUrl;

  beforeEach(function() {
        appID = process.env['app_id'];
        appKey = process.env['app_key'];
        appUrl = process.env['app_url'];
        searcher = new ConceptWikiSearch(appUrl, appID, appKey);
  });

  describe("search by tag", function() {

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
	      console.log('1');
        expect(this_result[0]).toBeDefined();
        expect(this_result[0].uri).toBeDefined();
        expect(this_result[0].prefLabel).toBeDefined();
        expect(this_result[0].match).toBeDefined();
      });
      searcher.byTag('Aspirin', '20', '4', '07a84994-e464-4bbf-812a-a4b96fa3d197', callback);
    });
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
	      console.log('2');
        expect(this_result[0]).toBeDefined();
        expect(this_result[0].uri).toBeDefined();
        expect(this_result[0].prefLabel).toBeDefined();
        expect(this_result[0].match).toBeDefined();
      });
      searcher.byTag('Aspirin', '20', '3', 'eeaec894-d856-4106-9fa1-662b1dc6c6f1', callback);
    });
    it("and handle errors", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
      };

      waitsFor(function() {
        return this_status != null;
      });

      runs(function() {
	      console.log('3');
        expect(this_success).toEqual(false);
        expect(this_status).toEqual(500);
      });
      searcher.byTag('Aspirin', '20', '4', '07a84994-e464-4b96fa3d197', callback);
    });
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
	      console.log('4');
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result[0]).toBeDefined();
      });
      searcher.findCompounds('Aspirin', '20', '4', callback);
    });
    it("and handle errors", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
      };

      waitsFor(function() {
        return this_status != null;
      });

      runs(function() {
	      console.log('5');
        expect(this_success).toEqual(false);
        expect(this_status).toEqual(500);
      });
      searcher.findCompounds('Aspirin', '-1', '-1', callback);
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
	      console.log('6');
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result[0]).toBeDefined();
        expect(this_result[0].uri).toBeDefined();
        expect(this_result[0].prefLabel).toBeDefined();
        expect(this_result[0].match).toBeDefined();
      });
      searcher.findTargets('PDE5', '20', '3', callback);
    });
    it("and handle errors", function() {
      var callback=function(success, status){
        expect(this_success).toEqual(false);
        expect(this_status).toEqual(500);
      };
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
      };

      waitsFor(function() {
        return this_status != null;
      });

      runs(function() {
	      console.log('7');
        expect(this_success).toEqual(false);
        expect(this_status).toEqual(500);
      });
      searcher.findTargets('PDE5', '-1', '-1', callback);
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
	      console.log('8');
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
      });
      searcher.findCompounds('Sorafenib', '20', '4', callback);
    });
 });
  describe("find a single concept", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
	      console.log('9a');
        this_success = success;
        this_status = status;
	console.log('9b');
        this_result = searcher.parseFindConceptResponse(response);
      };

      waitsFor(function() {
        return this_result != null;
      });

      runs(function() {
	      console.log('9');
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result.altLabels).toBeDefined();
        expect(this_result.prefLabel).toBeDefined();
        expect(this_result.definition).toBeDefined();
      });
      searcher.findConcept('8e3a87ae-345d-4c25-bd7a-5b3221c6e3fa', 4, callback);
    });
    it("and handle errors", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
      };

      waitsFor(function() {
        return this_status != null;
      });

      runs(function() {
	      console.log('11');
        expect(this_success).toEqual(false);
        expect(this_status).toEqual(500);
      });
      searcher.findConcept('07a84994-e464-4b96fa3d197', 4, callback);
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
	      console.log('12');
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_response).not.toBeNull();
      });
      searcher.freeText('Aspirin', null, null, callback);
    });
  });
});
