var Openphacts = require("../../../src/OPS.js");
jasmine.getEnv().defaultTimeoutInterval = 30000;

describe("Structure search", function() {
  var searcher, appID, appKey, appUrl;

  beforeEach(function() {
       appID = process.env['app_id'];
        appKey = process.env['app_key'];
        appUrl = process.env['app_url'];
      searcher = new StructureSearch(appUrl, appID, appKey);
  });

  describe("exact structure", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
          if (response) {
	           this_result = searcher.parseExactResponse(response);
           }
          this_success = success;
 	        this_status = status;
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        // mandatory
        expect(this_result).not.toBeNull();
        expect(this_result.length).toBeGreaterThan(0);
      });
      searcher.exact('CNC(=O)c1cc(ccn1)Oc2ccc(cc2)NC(=O)Nc3ccc(c(c3)C(F)(F)F)Cl', 0, callback);
    });
    it("and handle errors", function() {
      var this_success = null;
      var this_status = null;
      var callback=function(success, status){
        this_success = success;
        this_status = status;
      };
      waitsFor(function() {
        return this_status != null;
      });
      runs(function() {
        expect(this_success).toEqual(false);
        expect(this_status).toEqual(500);
      });
      searcher.exact('13413434', 0, callback);
    });
  });

  describe("sub-structure", function() {

    xit("and return a response", function() { // times out. Reenable later
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        if (response) {
          this_result = searcher.parseSubstructureResponse(response);
        }
        this_success = success;
        this_status = status;
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result.length).toBeGreaterThan(0);
        expect(this_result[0].about).not.toBeNull();
        expect(this_result[0].relevance).not.toBeNull();
      });
      //searcher.substructure('CNC(=O)c1cc(ccn1)Oc2ccc(cc2)NC(=O)Nc3ccc(c(c3)C(F)(F)F)Cl', null, null, null, callback);
      searcher.substructure('CC(=O)OC1=CC=CC=C1C(=O)O', null, null, null, callback);
    });
    it("and handle errors", function() {
      var this_success = null;
      var this_status = null;
      var callback=function(success, status){
        this_success = success;
        this_status = status;
      };
      waitsFor(function() {
        return this_status != null;
      });
      runs(function() {
        expect(this_success).toEqual(false);
        expect(this_status).toEqual(500);
      });
      searcher.substructure('13413434', null, null, null, callback);
    });
  });

  describe("inchi key to url", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        if (response) {
          this_result = searcher.parseInchiKeyToURLResponse(response);
        }
        this_status = status;
        this_success = success;
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result).toBeDefined();
      });
      searcher.inchiKeyToURL('BSYNRYMUTXBXSQ-UHFFFAOYSA-N', callback);
    });
    it("and handle errors", function() {
      var this_success = null;
      var this_status = null;
      var callback=function(success, status){
        this_success = success;
        this_status = status;
      };
      waitsFor(function() {
        return this_status != null;
      });
      runs(function() {
        expect(this_success).toEqual(false);
        expect(this_status).toEqual(500);
      });
      searcher.inchiKeyToURL('-UHFFFAOYSA-N', callback);
    });
  });

  describe("inchi to URL", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        if (response) {
          this_result = searcher.parseInchiToURLResponse(response);
        }
        this_success = success;
        this_status = status;
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result).toBeDefined();
      });
      searcher.inchiToURL('InChI=1S/C9H8O4/c1-6(10)13-8-5-3-2-4-7(8)9(11)12/h2-5H,1H3,(H,11,12)', callback);
    });
    it("and handle errors", function() {
      var this_success = null;
      var this_status = null;
      var callback=function(success, status){
        this_success = success;
        this_status = status;
      };
      waitsFor(function() {
        return this_status != null;
      });
      runs(function() {
        expect(this_success).toEqual(false);
        expect(this_status).toEqual(500);
      });
      searcher.inchiToURL('13413434', callback);
    });
  });

  describe("similarity", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        if (response) {
          this_result = searcher.parseSimilarityResponse(response);
        }
        this_success = success;
        this_status = status;
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result.length).toBeGreaterThan(1);
      });
      searcher.similarity('CC(=O)Oc1ccccc1C(=O)O', 0, 0.99, null, null, null, null, callback);
    });
    it("and handle errors", function() {
      var this_success = null;
      var this_status = null;
      var callback=function(success, status){
        this_success = success;
        this_status = status;
      };
      waitsFor(function() {
        return this_status != null;
      });
      runs(function() {
        expect(this_success).toEqual(false);
        expect(this_status).toEqual(500);
      });
      searcher.similarity('13413434', 0, 0.99, null, null, null, null, callback);
    });
  });

  describe("smiles to URL", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        if (response) {
          this_result = searcher.parseSmilesToURLResponse(response);
        }
        this_success = success;
        this_status = status;
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result).toBeDefined();
      });
      searcher.smilesToURL('CC(=O)Oc1ccccc1C(=O)O', callback);
    });
    it("and handle errors", function() {
      var this_success = null;
      var this_status = null;
      var callback=function(success, status){
        this_success = success;
        this_status = status;
      };
      waitsFor(function() {
        return this_status != null;
      });
      runs(function() {
        expect(this_success).toEqual(false);
        expect(this_status).toEqual(500);
      });
      searcher.smilesToURL('13413434', callback);
    });
  });
});
