describe("IRS2", function() {
  var searcher;

  beforeEach(function() {
    searcher = new Openphacts.IRS2Search("http://example.com/");
  });


  describe("free text search", function() {
    it("can be executed", function() {
      spyOn(searcher, 'freeText');
      searcher.freeText('query', 'limit', 'callback');
      expect(searcher.freeText).toHaveBeenCalled();
    });
    it("finds single concepts asynchronously", function() {
      var callback=jasmine.createSpy();
      searcher.freeText('Aspirin', null, callback);
      waitsFor(function() {
        return callback.callCount > 0;
      });
      runs(function() {
        expect(callback).toHaveBeenCalled();
      });
    });
  });
});
