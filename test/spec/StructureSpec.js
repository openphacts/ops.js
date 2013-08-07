describe("Structure search", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.StructureSearch(appUrl, appID, appKey);
  });

  describe("exact structure", function() {

    it("can be executed", function() {
      spyOn(searcher, 'exact');
      searcher.exact('smiles', 'match', 'limit', 'start', 'length', 'callback');
      expect(searcher.exact).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
          this_success = success;
	  this_status = status;
	  this_result = searcher.parseExactResponse(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result.type).toEqual(0);
        expect(this_result.molecule).toEqual('CNC(=O)c1cc(ccn1)Oc2ccc(cc2)NC(=O)Nc3ccc(c(c3)C(F)(F)F)Cl');
        expect(this_result.csURI).toBeDefined();
      });
      searcher.exact('CNC(=O)c1cc(ccn1)Oc2ccc(cc2)NC(=O)Nc3ccc(c(c3)C(F)(F)F)Cl', 0, null, null, null, callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.exact('CNC(=O)c1cc(ccn1)Oc2ccc(cc2)NC(=O)Nc3ccc(c(c3)C(F)(F)F)Cl', 0, null, null, null, callback);
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
          return this_status != null;
      });
      runs(function() {
          expect(this_success).toEqual(false);
          expect(this_status).toEqual(500);
      });
      searcher.exact('13413434', 0, null, null, null, callback);
    });
  });

  describe("sub-structure", function() {

    it("can be executed", function() {
      spyOn(searcher, 'substructure');
      searcher.substructure('smiles', 'limit', 'start', 'length', 'callback');
      expect(searcher.substructure).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
          this_success = success;
	  this_status = status;
	  this_result = searcher.parseSubstructureResponse(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result.length).toBeGreaterThan(1);
      });
      searcher.substructure('CNC(=O)c1cc(ccn1)Oc2ccc(cc2)NC(=O)Nc3ccc(c(c3)C(F)(F)F)Cl', null, null, null, callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.substructure('CNC(=O)c1cc(ccn1)Oc2ccc(cc2)NC(=O)Nc3ccc(c(c3)C(F)(F)F)Cl', null, null, null, callback);
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

    it("can be executed", function() {
      spyOn(searcher, 'inchiKeyToURL');
      searcher.inchiKeyToURL('inchiKey', 'callback');
      expect(searcher.inchiKeyToURL).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
          this_success = success;
	  this_status = status;
	  this_result = searcher.parseInchiKeyToURLResponse(response);
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
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.inchiKeyToURL('BSYNRYMUTXBXSQ-UHFFFAOYSA-N', callback);
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

    it("can be executed", function() {
      spyOn(searcher, 'inchiToURL');
      searcher.inchiToURL('inchi', 'callback');
      expect(searcher.inchiToURL).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
          this_success = success;
	  this_status = status;
	  this_result = searcher.parseInchiToURLResponse(response);
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
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.inchiToURL('InChI=1S/C9H8O4/c1-6(10)13-8-5-3-2-4-7(8)9(11)12/h2-5H,1H3,(H,11,12)', callback);
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

    it("can be executed", function() {
      spyOn(searcher, 'similarity');
      searcher.similarity('smiles', 'type', 'threshold', null, null, null, 'callback');
      expect(searcher.similarity).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
          this_success = success;
	  this_status = status;
	  this_result = searcher.parseSimilarityResponse(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result.length).toBeGreaterThan(1);
      });
      searcher.similarity('CC(=O)Oc1ccccc1C(=O)O', 0, 0.99, null, null, null, callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.similarity('CC(=O)Oc1ccccc1C(=O)O', 0, 0.99, null, null, null, callback);
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
          return this_status != null;
      });
      runs(function() {
          expect(this_success).toEqual(false);
          expect(this_status).toEqual(500);
      });
      searcher.similarity('13413434', 0, 0.99, null, null, null, callback);
    });
  });

  describe("smiles to URL", function() {

    it("can be executed", function() {
      spyOn(searcher, 'smilesToURL');
      searcher.smilesToURL('smiles', 'callback');
      expect(searcher.smilesToURL).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
          this_success = success;
	  this_status = status;
	  this_result = searcher.parseSmilesToURLResponse(response);
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
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.smilesToURL('CC(=O)Oc1ccccc1C(=O)O', callback);
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
