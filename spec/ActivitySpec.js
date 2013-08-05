describe("Activities", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.ActivitySearch(appUrl, appID, appKey);
  });

  describe("get types", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getTypes');
      searcher.getTypes('callback');
      expect(searcher.getTypes).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        this_result = searcher.parseTypes(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
	expect(this_success).toBe(true);
	expect(this_status).toBe(200);
        expect(this_result.length).toBeGreaterThan(1);
        expect(this_result[0].label).toBeDefined();
        expect(this_result[0].uri).toBeDefined();
      });
      searcher.getTypes(callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getTypes(callback);
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
      var activitySearch = new Openphacts.ActivitySearch(appUrl, "sdfsdf", "sdfsdf");
      activitySearch.getTypes(callback);
    });
  });
  describe("get units", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getUnits');
      searcher.getUnits('activityType', 'callback');
      expect(searcher.getUnits).toHaveBeenCalled();
    });
    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        this_success = success;
	this_status = status;
        this_result = searcher.parseUnits(response);
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
	expect(this_success).toBe(true);
	expect(this_status).toBe(200);
        expect(this_result.length).toBeGreaterThan(1);
        expect(this_result[0].label).toBeDefined();
        expect(this_result[0].uri).toBeDefined();
      });
      searcher.getUnits('IC50', callback);
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getUnits('IC50', callback);
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
        // The LDA returns success and a response for this next test even
        // though it should be false. A bug has been reported.
        expect(this_success).toEqual(true); // should really be false
        expect(this_status).toEqual(200);
      });
      searcher.getUnits('gjhgjj444lkjsr8svkjhxvk', callback);
    });
  });
});
