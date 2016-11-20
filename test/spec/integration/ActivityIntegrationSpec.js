var Openphacts = require("../../../src/OPS.js");
jasmine.getEnv().defaultTimeoutInterval = 30000;
describe("Activities", function() {
  var searcher, appID, appKey, appUrl;

  beforeEach(function() {
        appID = process.env['app_id'];
        appKey = process.env['app_key'];
        appUrl = process.env['app_url'];
      searcher = new ActivitySearch(appUrl, appID, appKey);
  });

  describe("get types", function() {

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
        return this_result != null;
      });
      runs(function() {
        expect(this_success).toBe(true);
        expect(this_status).toBe(200);
        expect(this_result.length).toBeGreaterThan(0);
        expect(this_result[0].label).toBeDefined();
        expect(this_result[0].uri).toBeDefined();
      });
      searcher.getTypes('percent', null, null, null, null, callback);
    });
  });
  describe("get units", function() {

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
        return this_result != null;
      });
      runs(function() {
        expect(this_success).toBe(true);
        expect(this_status).toBe(200);
        expect(this_result.length).toBeGreaterThan(0);
        expect(this_result[0].label).toBeDefined();
        expect(this_result[0].uri).toBeDefined();
      });
      searcher.getUnits('IC50', null, callback);
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
      searcher.getUnits('gjhgjj444lkjsr8svkjhxvk', null, callback);
    });
  });
  describe("get all units", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;
      var callback=function(success, status, response){
        if (response != null) {
          this_result = searcher.parseAllUnits(response);
        }
        this_success = success;
        this_status = status;
      };
      waitsFor(function() {
        return this_success != null;
      });
      runs(function() {
        expect(this_success).toBe(true);
        expect(this_status).toBe(200);
        expect(this_result.length).toBeGreaterThan(0);
        expect(this_result[0].label).toBeDefined();
        expect(this_result[0].uri).toBeDefined();
      });
      searcher.getAllUnits(null, 'all', null, null, callback);
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
      searcher.getAllUnits('-1', null, null, null, callback);
    });
  });
});
