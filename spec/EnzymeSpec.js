describe("Enzymes", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      searcher = new Openphacts.EnzymeSearch("https://beta.openphacts.org", appID, appKey);
  });

  describe("get root class members", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getClassificationRootClasses');
      searcher.getClassificationRootClasses('callback');
      expect(searcher.getClassificationRootClasses).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        this_result = searcher.parseClassificationRootClasses(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
	expect(this_success).toBe(true);
	expect(this_status).toBe(200);
        expect(this_result.length).toBeGreaterThan(1);
      });
      searcher.getClassificationRootClasses(callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getClassificationRootClasses(callback);
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
      var enzymeSearch = new Openphacts.EnzymeSearch("https://beta.openphacts.org", "sdfsdf", "sdfsdf");
      enzymeSearch.getClassificationRootClasses(callback);
    });
  });

  describe("get classification class", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getClassificationClass');
      searcher.getClassificationClass('enzmeURL', 'callback');
      expect(searcher.getClassificationClass).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        this_result = searcher.parseClassificationClass(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
	expect(this_success).toBe(true);
	expect(this_status).toBe(200);
        expect(this_result.length).toBeGreaterThan(1);
        expect(this_result[0].uri).toBeDefined();
        expect(this_result[0].name).toBeDefined();
      });
      searcher.getClassificationClass('http://purl.uniprot.org/enzyme/1.1.1.-', callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getClassificationClass('http://purl.uniprot.org/enzyme/1.1.1.-', callback);
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
      searcher.getClassificationClass('34534533', callback);
    });
  });

  describe("get classification class members", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getClassificationClassMembers');
      searcher.getClassificationClassMembers('enzmeURI', 'callback');
      expect(searcher.getClassificationClassMembers).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        this_result = searcher.parseClassificationClassMembers(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
	expect(this_success).toBe(true);
	expect(this_status).toBe(200);
        expect(this_result.length).toBeGreaterThan(1);
        expect(this_result[0].uri).toBeDefined();
        expect(this_result[0].names.length).toBeGreaterThan(0);
      });
      searcher.getClassificationClassMembers('http://purl.uniprot.org/enzyme/1.1.1.-', callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getClassificationClassMembers('http://purl.uniprot.org/enzyme/1.1.1.-', callback);
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
      searcher.getClassificationClassMembers('34534533', callback);
    });
  });

  describe("get pharmacology count", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getPharmacologyCount');
      searcher.getPharmacologyCount('enzymeURI', 'assayOrganism', 'targetOrganism', 'activityType', 'activityValue', 'minActivityValue', 'minExActivityValue', 'maxActivityValue', 'maxExActivityValue', 'activityUnit', 'callback');
      expect(searcher.getPharmacologyCount).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        this_result = searcher.parsePharmacologyCount(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
	expect(this_success).toBe(true);
	expect(this_status).toBe(200);
        expect(this_result).toBeGreaterThan(1);
      });
      searcher.getPharmacologyCount('http://purl.uniprot.org/enzyme/1.1.1.-', null, null, null, null, null, null, null, null, null, callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getPharmacologyCount('http://purl.uniprot.org/enzyme/1.1.1.-', null, null, null, null, null, null, null, null, null, callback);
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
      searcher.getPharmacologyCount('90879879879879797', null, null, null, null, null, null, null, null, null, callback);
    });
  });

  describe("get pharmacology paginated", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getPharmacologyPaginated');
      searcher.getPharmacologyPaginated('enzymeURI', 'assayOrganism', 'targetOrganism', 'activityType', 'activityValue', 'minActivityValue', 'minExActivityValue', 'maxActivityValue', 'maxExActivityValue', 'activityUnit', 'page', 'pageSize', 'orderBy', 'callback');
      expect(searcher.getPharmacologyPaginated).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        this_result = searcher.parsePharmacologyPaginated(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
	expect(this_success).toBe(true);
	expect(this_status).toBe(200);
        expect(this_result.length).toBeGreaterThan(1);
        expect(this_result[0].targetMatches.length).toBeGreaterThan(0);
        expect(this_result[0].chemblActivityURI).toBeDefined();
        expect(this_result[0].pmid).toBeDefined();
        expect(this_result[0].relation).toBeDefined();
        expect(this_result[0].standardUnits).toBeDefined();
        expect(this_result[0].standardValue).toBeDefined();
        expect(this_result[0].activityType).toBeDefined();
        expect(this_result[0].inDataset).toBeDefined();
        expect(this_result[0].fullMWT).toBeDefined();
        expect(this_result[0].chemblURI).toBeDefined();
        expect(this_result[0].cwURI).toBeDefined();
        expect(this_result[0].prefLabel).toBeDefined();
        expect(this_result[0].csURI).toBeDefined();
        expect(this_result[0].inchi).toBeDefined();
        expect(this_result[0].inchiKey).toBeDefined();
        expect(this_result[0].smiles).toBeDefined();
        expect(this_result[0].ro5Violations).toBeDefined();
        expect(this_result[0].targetURI).toBeDefined();
        expect(this_result[0].targetOrganism).toBeDefined();
        expect(this_result[0].assayURI).toBeDefined();
        expect(this_result[0].assayDescription).toBeDefined();
      });
      searcher.getPharmacologyPaginated('http://purl.uniprot.org/enzyme/1.1.1.-', null, null, null, null, null, null, null, null, null, null, null, null, callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getPharmacologyPaginated('http://purl.uniprot.org/enzyme/1.1.1.-', null, null, null, null, null, null, null, null, null, null, null, null, callback);
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
      searcher.getPharmacologyPaginated('90879879879879797', null, null, null, null, null, null, null, null, null, null, null, null, callback);
    });
  });
});
