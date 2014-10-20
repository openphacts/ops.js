describe("Disease search", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.DiseaseSearch(appUrl, appID, appKey);
  });
  describe("single disease search", function() {

    it("can be executed", function() {
      spyOn(searcher, 'fetchDisease');
      searcher.fetchDisease('diseaseURI', 'lens', 'callback');
      expect(searcher.fetchDisease).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.fetchDisease('http://linkedlifedata.com/resource/umls/id/C0004238', null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
  describe("count diseases for a target", function() {

    it("can be executed", function() {
      spyOn(searcher, 'diseasesByTargetCount');
      searcher.diseasesByTargetCount('targetURI', 'lens', 'callback');
      expect(searcher.diseasesByTargetCount).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.diseasesByTargetCount('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
  describe("diseases for a target", function() {

    it("can be executed", function() {
      spyOn(searcher, 'diseasesByTarget');
      searcher.diseasesByTarget('targetURI', 'lens', 'callback');
      expect(searcher.diseasesByTarget).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.diseasesByTarget('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, null, null, null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
  describe("count targets for a disease", function() {

    it("can be executed", function() {
      spyOn(searcher, 'targetsByDiseaseCount');
      searcher.targetsByDiseaseCount('diseaseURI', 'lens', 'callback');
      expect(searcher.targetsByDiseaseCount).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.targetsByDiseaseCount('http://linkedlifedata.com/resource/umls/id/C0004238', null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });

  describe("targets for a disease", function() {

    it("can be executed", function() {
      spyOn(searcher, 'targetsByDisease');
      searcher.targetsByDisease('diseaseURI', 'lens', 'callback');
      expect(searcher.targetsByDisease).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.targetsByDisease('http://linkedlifedata.com/resource/umls/id/C0004238', null, null, null, null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });

  describe("count associations for a target", function() {

    it("can be executed", function() {
      spyOn(searcher, 'associationsByTargetCount');
      searcher.associationsByTargetCount('targetURI', 'lens', 'callback');
      expect(searcher.associationsByTargetCount).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.associationsByTargetCount('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });

});
