describe("Chebi Classes", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      searcher = new Openphacts.ChebiSearch("https://beta.openphacts.org", appID, appKey);
  });

  describe("get ontology class members", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getOntologyClassMembers');
      searcher.getOntologyClassMembers('chebiURI', 'callback');
      expect(searcher.getOntologyClassMembers).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        this_result = searcher.parseOntologyClassMembers(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
	expect(this_success).toBe(true);
	expect(this_status).toBe(200);
        expect(this_result.length).toBeGreaterThan(1);
      });
      searcher.getOntologyClassMembers('http://purl.obolibrary.org/obo/CHEBI_38834', callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getOntologyClassMembers('http://purl.obolibrary.org/obo/CHEBI_38834', callback);
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
        expect(this_status).toEqual(400);
      });
      searcher.getOntologyClassMembers('90879879879879797', callback);
    });
  });
  describe("get ontology root class members", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getOntologyRootClassMembers');
      searcher.getOntologyRootClassMembers('callback');
      expect(searcher.getOntologyRootClassMembers).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        this_result = searcher.parseOntologyRootClassMembers(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
	expect(this_success).toBe(true);
	expect(this_status).toBe(200);
        expect(this_result.length).toBeGreaterThan(1);
      });
      searcher.getOntologyRootClassMembers(callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getOntologyRootClassMembers(callback);
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
        // Origin null is not allowed by Access-Control-Allow-Origin. 
        expect(this_status).toEqual(0);
      });
      var chebiSearch = new Openphacts.ChebiSearch("https://beta.openphacts.org", "sdfsdf", "sdfsdf");
      chebiSearch.getOntologyRootClassMembers(callback);
    });
  });
  describe("get ontology class", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getOntologyClass');
      searcher.getOntologyClass('chebiURI', 'callback');
      expect(searcher.getOntologyClass).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        this_result = searcher.parseOntologyClass(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
	expect(this_success).toBe(true);
	expect(this_status).toBe(200);
        expect(this_result.length).toBeGreaterThan(1);
      });
      searcher.getOntologyClass('http://purl.obolibrary.org/obo/CHEBI_38834', callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getOntologyClass('http://purl.obolibrary.org/obo/CHEBI_38834', callback);
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
        expect(this_status).toEqual(400);
      });
      searcher.getOntologyClass('90879879879879797', callback);
    });
  });
  describe("get class pharmacology count", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getClassPharmacologyCount');
      searcher.getClassPharmacologyCount('chebiURI', 'assayOrganism', 'targetOrganism', 'activityType', 'activityValue', 'minActivityValue', 'minExActivityValue', 'maxActivityValue', 'maxExActivityValue', 'activityUnit', 'callback');
      expect(searcher.getClassPharmacologyCount).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        this_result = searcher.parseClassPharmacologyCount(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
	expect(this_success).toBe(true);
	expect(this_status).toBe(200);
        expect(this_result).toBeGreaterThan(1);
      });
      searcher.getClassPharmacologyCount('http://purl.obolibrary.org/obo/CHEBI_38834', null, null, null, null, null, null, null, null, null, callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getClassPharmacologyCount('http://purl.obolibrary.org/obo/CHEBI_38834', null, null, null, null, null, null, null, null, null, callback);
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
        expect(this_status).toEqual(400);
      });
      searcher.getClassPharmacologyCount('90879879879879797', null, null, null, null, null, null, null, null, null, null, null, null, callback);
    });
  });
  describe("get class pharmacology paginated", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getClassPharmacologyPaginated');
      searcher.getClassPharmacologyPaginated('chebiURI', 'assayOrganism', 'targetOrganism', 'activityType', 'activityValue', 'minActivityValue', 'minExActivityValue', 'maxActivityValue', 'maxExActivityValue', 'activityUnit', 'callback');
      expect(searcher.getClassPharmacologyPaginated).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        this_result = searcher.parseClassPharmacologyPaginated(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
	expect(this_success).toBe(true);
	expect(this_status).toBe(200);
        expect(this_result.length).toBeGreaterThan(1);
      });
      searcher.getClassPharmacologyPaginated('http://purl.obolibrary.org/obo/CHEBI_38834', null, null, null, null, null, null, null, null, null, null, null, null, callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getClassPharmacologyCount('http://purl.obolibrary.org/obo/CHEBI_38834', null, null, null, null, null, null, null, null, null, null, null, null, callback);
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
        expect(this_status).toEqual(400);
      });
      searcher.getClassPharmacologyPaginated('90879879879879797', null, null, null, null, null, null, null, null, null, null, null, null, callback);
    });
  });
});
