describe("IRS2", function() {
  var searcher;

  beforeEach(function() {
    searcher = new Openphacts.IRS2Search("http://localhost:9200/");
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
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_response).not.toBeNull();
      });
      searcher.freeText('Aspirin', null, callback);
    });
  });
});
