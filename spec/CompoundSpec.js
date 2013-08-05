describe("Compound search", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.CompoundSearch(appUrl, appID, appKey);
  });

  describe("single compound search", function() {

    it("can be executed", function() {
      spyOn(searcher, 'fetchCompound');
      searcher.fetchCompound('compoundURI', 'callback');
      expect(searcher.fetchCompound).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        this_result = searcher.parseCompoundResponse(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
	expect(this_success).toBe(true);
	expect(this_status).toBe(200);
        expect(this_result.id).toBeDefined();
        expect(this_result.prefLabel).toBeDefined();
        expect(this_result.cwUri).toBeDefined();
        expect(this_result.description).toBeDefined();
        expect(this_result.biotransformationItem).toBeDefined();
        expect(this_result.toxicity).toBeDefined();
        expect(this_result.proteinBinding).toBeDefined();
        expect(this_result.csUri).toBeDefined();
        expect(this_result.hba).toBeDefined();
        expect(this_result.hbd).toBeDefined();
        expect(this_result.inchi).toBeDefined();
        expect(this_result.logp).toBeDefined();
        expect(this_result.psa).toBeDefined();
        expect(this_result.ro5Violations).toBeDefined();
        expect(this_result.smiles).toBeDefined();
        expect(this_result.chemblURI).toBeDefined();
        expect(this_result.fullMWT).toBeDefined();
        expect(this_result.molform).toBeDefined();
        expect(this_result.mwFreebase).toBeDefined();
        expect(this_result.rtb).toBeDefined();
        expect(this_result.inchiKey).toBeDefined();
      });
      searcher.fetchCompound('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.fetchCompound('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', callback);
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
        return this_success != null;
      });
      runs(function() {
        expect(this_success).toEqual(false);
        expect(this_status).toEqual(404);
      });
      searcher.fetchCompound('http://www.conceptwiki.org/concept/876876876', callback);
    });
  });
  describe("compound pharmacology search", function() {

    it("can be executed", function() {
      spyOn(searcher, 'compoundPharmacology');
      searcher.compoundPharmacology('compoundURI', 'page', 'pageSize', 'callback');
      expect(searcher.compoundPharmacology).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_result = searcher.parseCompoundPharmacologyResponse(response);
      };
      waitsFor(function() {
          return this_status != null;
      });
      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result[0]).toBeDefined();
        expect(this_result[0].csid).toBeDefined();

      });
      searcher.compoundPharmacology('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', 1, 20, callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.compoundPharmacology('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', 1, 20, callback);
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
      searcher.compoundPharmacology('http://www.conceptwiki.org/concept/876876876', 1, 20, callback);
    });
  });
  describe("compound pharmacology count", function() {

    it("can be executed", function() {
      spyOn(searcher, 'compoundPharmacologyCount');
      searcher.compoundPharmacologyCount('compoundURI', 'callback');
      expect(searcher.compoundPharmacologyCount).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
          this_success = success;
	  this_status = status;
	  this_result = searcher.parseCompoundPharmacologyCountResponse(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result).toBeDefined();
      });
      searcher.compoundPharmacologyCount('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.compoundPharmacologyCount('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
});
