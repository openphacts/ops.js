describe("Structure search", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      searcher = new Openphacts.StructureSearch("https://beta.openphacts.org", appID, appKey);
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
          expect(this_status).toEqual(404);
      });
      searcher.substructure('13413434', null, null, null, callback);
    });
  });
});
