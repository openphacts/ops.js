describe("Structure search", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.StructureSearch(appUrl, appID, appKey);
  });

  describe("exact structure", function() {

    it("can be executed", function() {
      spyOn(searcher, 'exact');
      searcher.exact('smiles', 'match', 'callback');
      expect(searcher.exact).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.exact('CNC(=O)c1cc(ccn1)Oc2ccc(cc2)NC(=O)Nc3ccc(c(c3)C(F)(F)F)Cl', 0, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });

  describe("sub-structure", function() {

    it("can be executed", function() {
      spyOn(searcher, 'substructure');
      searcher.substructure('smiles', 'moltype', 'start', 'count', 'callback');
      expect(searcher.substructure).toHaveBeenCalled();
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
  });

  describe("inchi key to url", function() {

    it("can be executed", function() {
      spyOn(searcher, 'inchiKeyToURL');
      searcher.inchiKeyToURL('inchiKey', 'callback');
      expect(searcher.inchiKeyToURL).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.inchiKeyToURL('BSYNRYMUTXBXSQ-UHFFFAOYSA-N', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });

  describe("inchi to URL", function() {

    it("can be executed", function() {
      spyOn(searcher, 'inchiToURL');
      searcher.inchiToURL('inchi', 'callback');
      expect(searcher.inchiToURL).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.inchiToURL('InChI=1S/C9H8O4/c1-6(10)13-8-5-3-2-4-7(8)9(11)12/h2-5H,1H3,(H,11,12)', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });

  describe("similarity", function() {

    it("can be executed", function() {
      spyOn(searcher, 'similarity');
      searcher.similarity('smiles', 'type', 'threshold', 'alpha', 'beta', 'start', 'count', 'callback');
      expect(searcher.similarity).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.similarity('CC(=O)Oc1ccccc1C(=O)O', 0, 0.99, null, null, null, null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });

  describe("smiles to URL", function() {

    it("can be executed", function() {
      spyOn(searcher, 'smilesToURL');
      searcher.smilesToURL('smiles', 'callback');
      expect(searcher.smilesToURL).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.smilesToURL('CC(=O)Oc1ccccc1C(=O)O', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
});
