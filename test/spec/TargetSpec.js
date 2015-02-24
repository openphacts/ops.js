describe("Target search", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.TargetSearch(appUrl, appID, appKey);
  });

  describe("single target search", function() {

    it("can be executed", function() {
      spyOn(searcher, 'fetchTarget');
      searcher.fetchTarget('target', 'lens', 'callback');
      expect(searcher.fetchTarget).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.fetchTarget('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
  describe("parse target with only primarytopic, no exactMatch", function() {

    it("can be executed", function() {
	    var JSONResponse = {format: "linked-data-api",version: "1.4",result: {_about: "https://ops2.few.vu.nl/target?uri=http%3A%2F%2Fpurl.uniprot.org%2Funiprot%2FE9Q3S4&app_id=335bc8f2&app_key=b7eb38718a8d30a9f7c803be4ece38c9&_format=json",definition: "https://ops2.few.vu.nl/api-config",extendedMetadataVersion: "https://ops2.few.vu.nl/target?uri=http%3A%2F%2Fpurl.uniprot.org%2Funiprot%2FE9Q3S4&app_id=335bc8f2&app_key=b7eb38718a8d30a9f7c803be4ece38c9&_format=json&_metadata=all%2Cviews%2Cformats%2Cexecution%2Cbindings%2Csite",primaryTopic: {_about: "http://purl.uniprot.org/uniprot/E9Q3S4",alternativeName: "SPS1/STE20-related protein kinase YSK4",classifiedWith: ["http://purl.uniprot.org/keywords/67","http://purl.uniprot.org/go/0004674","http://purl.uniprot.org/keywords/1185","http://purl.uniprot.org/go/0005524","http://purl.uniprot.org/keywords/723"],existence: "http://purl.uniprot.org/core/Inferred_from_Homology_Existence",mass: 146412,organism: "http://purl.uniprot.org/taxonomy/10090",sequence: "MDSMPRPERHAESLLDICHEAGSTPMEMTVSQTENLTLQSISSSEDFDLEDDFSPFILAREGAAPRGENWPRRTEGVEIIVTFPPDPLQEASQEDLKESNQVTSEHQEREQVHPVSPPDDAEMVGLTGRMLTTQPSLLKTDGSSEELCGVDVALSPPRPCLDSSLAASAAGEVAPCVLKEQQRQSDEFPTSDISYSSRRTGLPLPPLSCLPMRSCIFNMEKSPKSPRHRERKVPSLSLSVPKLLEPLSRPLSQSAEFSSSKNHQEVTQEGPVEHTLRGSNCTLWSRNMCSFRKSGKQGVAESWPSQEMEGWDKTKTSGFKEGPSLFSCESVKEDTTPTERERDSGYHVSEMQRGGEDSQYLSSRKKESWTARVVERDSGVEHPILCKLLEVSNSEMTPAEEKEIGNENVPDAKSNSVHKSGAMEPHAASEEVSVPKNGPSVNSDGPAEELEGHRDIEQNRKIPMEEETNPEMNGVVPLTHIAFPGEGTSKGPARAEPHLQRRKRPAQNSNSFNLLAHREHDKLQTNTHRTKLDSRTKARNRAPPNLMVSIQASIKPNMHKNSIKTQVFPALELIDHRPHPSSKFQRRAPLTEKKSTHQTQKPKKQAFPRIGKHAGIKKPGIPLSAETTDPRLHFLDLKYSDMFKEINSASNGPGIYEMFGTPVYCHIREAERHDHRCYREIRTAPSGRCVVNKCQSSESDRCSNSRARLLQKRQHIKPPKPLHGLRQKHRGFISKDKGCKDMGGHTEDSVSEPDGQMKSPGNDFLSSKDDAQLMHLIPIPELSPEQKAPAPVSDLSIVEEIFTEECADEEGILNDDSLTQSLGDLKEPEGLHPQAPLVPSENSWAVLSEKRSGKRVSPEKHNVEPLDKINAEQMFPGYLEFDSLSEKSKTLVSFSSCSFQENLERAPSPTEQHWARSLEQDSLENNSTTYQTFGKISQEILDPGKNEELTDELLGCLVEELLALDEKDNNSCQIMTNEADAKNLNLVFSRRGNTIEELGRETTDVKLQRCINGFRIYDEENFLTSNEKKTLSDKSLNHEEAIFWTKGEILGRGAYGTVYCGLTSLGQLIAVKQVALDTSDKLATEKEYRKLQEEVDLLKALKHVNIVAYLGTCLEENTLSIFMEFVPGGSISSIINRFGPLPEMVFCKYTRQILQGVAYLHDNCVVHRDIKGNNVMLMPTGIIKLIDFGCAKRLAWAGLNGTHSDMLKSMRGTPYWMAPEVINESGYGRKSDIWSIGCTVFEMATGKPPLASMDRMAAMFYIGAHRGLMPPLPARFSEPAADFVRLCLTRDQHERPSALQLLKHSFLKRSQ",inDataset: "http://purl.uniprot.org",molecularWeight: 146412,seeAlso: "http://purl.uniprot.org/intact/E9Q3S4",exactMatch: "http://purl.uniprot.org/uniprot/E9Q3S4",isPrimaryTopicOf: "https://ops2.few.vu.nl/target?uri=http%3A%2F%2Fpurl.uniprot.org%2Funiprot%2FE9Q3S4&app_id=335bc8f2&app_key=b7eb38718a8d30a9f7c803be4ece38c9&_format=json"}}};
	    var this_result = searcher.parseTargetResponse(JSONResponse.result.primaryTopic);
        expect(this_result.id).not.toBeNull();
        expect(this_result.URI).not.toBeNull();

        // optional
        expect(this_result.cellularLocation).toBeDefined();
        expect(this_result.molecularWeight).toBeDefined();
        expect(this_result.numberOfResidues).toBeDefined();
        expect(this_result.theoreticalPi).toBeDefined();
        //expect(this_result.keywords).toBeDefined();
        expect(this_result.functionAnnotation).toBeDefined();
        expect(this_result.alternativeName).toBeDefined();
        expect(this_result.organism).toBeDefined();
        expect(this_result.sequence).toBeDefined();
        expect(this_result.classifiedWith).toBeDefined();
        expect(this_result.seeAlso).toBeDefined();
        expect(this_result.drugbankURI).toBeDefined();
        expect(this_result.prefLabel).toBeDefined();
        expect(this_result.chemblItems).toBeDefined();
        expect(this_result.URI).toBeDefined();
 
    });
  });

  describe("fetch multiple targets with batch call", function() {

    it("can be executed", function() {
      spyOn(searcher, 'fetchTargetBatch');
      searcher.fetchTargetBatch(['target1', 'target2'], 'lens', 'callback');
      expect(searcher.fetchTargetBatch).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.fetchTargetBatch(['http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', 'http://www.conceptwiki.org/concept/7b21c06f-0343-4fcc-ab0f-a74ffe871ade'], null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });

  describe("target pharmacology search", function() {

    it("can be executed", function() {
      spyOn(searcher, 'targetPharmacology');
      searcher.targetPharmacology('URI', 'assayOrganism', 'targetOrganism', 'activityType', 'activityValue', 'minActivityValue', 'minExActivityValue', 'maxActivityValue', 'maxExActivityValue', 'activityUnit', 'activityRelation', 'pChembl', 'minpChembl', 'minExpChembl', 'maxpChembl', 'maxExpChembl', 'targetType', 'page', 'pageSize', 'orderBy', 'lens', 'callback');
      expect(searcher.targetPharmacology).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.targetPharmacology('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, 20, null, null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });
  describe("target pharmacology count", function() {

    it("can be executed", function() {
      spyOn(searcher, 'targetPharmacologyCount');
      searcher.targetPharmacologyCount('URI', 'assayOrganism', 'targetOrganism', 'activityType', 'activityValue', 'minActivityValue', 'minExActivityValue', 'maxActivityValue', 'maxExActivityValue', 'activityUnit', 'activityRelation', 'pChembl', 'minpChembl', 'minExpChembl', 'maxpChembl', 'maxExpChembl', 'targetType', 'lens', 'callback');
      expect(searcher.targetPharmacologyCount).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.targetPharmacologyCount('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
        expect(callback).toHaveBeenCalled();
      });
    });
  });
  describe("compounds for target", function() {

    it("can be executed", function() {
      spyOn(searcher, 'compoundsForTarget');
      searcher.compoundsForTarget('targetURI', 'callback');
      expect(searcher.compoundsForTarget).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.compoundsForTarget('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
        expect(callback).toHaveBeenCalled();
      });
    });
  });
});
