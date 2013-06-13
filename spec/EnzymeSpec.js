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
});
