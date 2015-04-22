describe("Trees", function() {
  var searcher, appID, appKey;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.TreeSearch(appUrl, appID, appKey);
  });

  describe("get root nodes", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getRootNodes');
      searcher.getRootNodes('root', 'callback');
      expect(searcher.getRootNodes).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getRootNodes('root', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });

  describe("get child nodes", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getChildNodes');
      searcher.getChildNodes('URI', 'callback');
      expect(searcher.getChildNodes).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getChildNodes('http://purl.uniprot.org/enzyme/1.1.1.-', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
    it("can handle single responses", function() {
	  var response = {'primaryTopic': {'prefLabel': 'hijk', 'childNode': {'_about': 'abcd', 'prefLabel': 'defg'}}};
	  var result = searcher.parseChildNodes(response);
	  expect(result.label).toEqual('hijk');
	  expect(result.children[0].uri).toEqual('abcd');
      expect(result.children[0].names[0]).toEqual('defg');
    });
  });

  describe("get parent nodes", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getParentNodes');
      searcher.getParentNodes('URI', 'callback');
      expect(searcher.getParentNodes).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getParentNodes('http://purl.uniprot.org/enzyme/1.1.1.-', callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
    it("can handle single responses", function() {
	  var response = {'primaryTopic': {'prefLabel': 'hijk', 'parentNode': {'_about': 'abcd', 'prefLabel': 'defg'}}};
	  var result = searcher.parseParentNodes(response);
	  expect(result.label).toEqual('hijk');
	  expect(result.parents[0].uri).toEqual('abcd');
      expect(result.parents[0].names[0]).toEqual('defg');
    });
  });

  describe("get pharmacology count", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getTargetClassPharmacologyCount');
      searcher.getTargetClassPharmacologyCount('URI', 'assayOrganism', 'targetOrganism', 'activityType', 'activityValue', 'activityUnit', 'minActivityValue', 'minExActivityValue', 'maxActivityValue', 'maxExActivityValue', 'relation', 'pChembl', 'min-pChembl', 'minEx-pChembl', 'max-pChembl', 'maxEx-pChembl', 'targetType', 'lens', 'callback');
      expect(searcher.getTargetClassPharmacologyCount).toHaveBeenCalled();
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getTargetClassPharmacologyCount('http://purl.uniprot.org/enzyme/1.1.1.-', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
  });

  describe("get pharmacology paginated", function() {

    it("can be executed", function() {
      spyOn(searcher, 'getTargetClassPharmacologyPaginated');
      searcher.getTargetClassPharmacologyPaginated('URI', 'assayOrganism', 'targetOrganism', 'activityType', 'activityValue', 'activityUnit', 'minActivityValue', 'minExActivityValue', 'maxActivityValue', 'maxExActivityValue', 'relation', 'pChembl', 'min-pChembl', 'minEx-pChembl', 'max-pChembl', 'maxEx-pChembl', 'targetType', 'lens', 'page', 'pageSize', 'orderBy', 'callback');
    });
    it("executes asynchronously", function() {
      var callback = jasmine.createSpy();
      searcher.getTargetClassPharmacologyPaginated('http://purl.uniprot.org/enzyme/1.1.1.-', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, callback);
      waitsFor(function() {
          return callback.callCount > 0;
      });
      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    });
    it("in 1.5 an item can have an empty exactMatch block in hsaMolecule", function() {
	    var JSONResponse = {items: [{
		    _about: "http://rdf.ebi.ac.uk/resource/chembl/activity/CHEMBL_ACT_1143574",
	    pmid: "http://identifiers.org/pubmed/8099976",
	    hasAssay: {
		    _about: "http://rdf.ebi.ac.uk/resource/chembl/assay/CHEMBL645403",
	    description: "Inhibition of horse liver alcohol dehydrogenase enzyme by non-competitive inhibition",
	    assayOrganismName: "Equus caballus",
	    hasTarget: {
		    _about: "http://rdf.ebi.ac.uk/resource/chembl/target/CHEMBL2111372",
	    title: "Alcohol dehydrogenase",
	    hasTargetComponent: [
    {
	    _about: "http://rdf.ebi.ac.uk/resource/chembl/targetcomponent/CHEMBL_TC_1765",
	    exactMatch: {
		    _about: "http://www.conceptwiki.org/concept/791e2906-31c3-439e-80c0-4141ae08f1d2",
	    inDataset: "http://www.conceptwiki.org",
	    prefLabel_en: "Alcohol dehydrogenase S chain (Equus caballus)",
	    prefLabel: "Alcohol dehydrogenase S chain (Equus caballus)"
	    }
    },
    {
	    _about: "http://rdf.ebi.ac.uk/resource/chembl/targetcomponent/CHEMBL_TC_959",
	    exactMatch: {
		    _about: "http://www.conceptwiki.org/concept/0cf048a1-d0cf-4395-859d-ddcd2fa61f38",
		    inDataset: "http://www.conceptwiki.org",
		    prefLabel_en: "Alcohol dehydrogenase E chain (Equus caballus)",
		    prefLabel: "Alcohol dehydrogenase E chain (Equus caballus)"
	    }
    }
    ],
	    assay_organism: "Equus caballus",
	    inDataset: "http://www.ebi.ac.uk/chembl",
	    type: "http://rdf.ebi.ac.uk/terms/chembl#ProteinFamily"
	    },
	    inDataset: "http://www.ebi.ac.uk/chembl"
	    },
	    hasMolecule: {
				 _about: "http://rdf.ebi.ac.uk/resource/chembl/molecule/CHEMBL3144046",
				 inDataset: "http://www.ebi.ac.uk/chembl"
			 },
	    activity_unit: {
				   _about: "http://www.openphacts.org/units/Nanomolar",
				   prefLabel: "nM"
			   },
	    pChembl: 4.7,
	    publishedRelation: "=",
	    publishedType: "Ki",
	    publishedUnits: "uM",
	    publishedValue: 20,
	    activity_relation: "=",
	    activity_type: "Ki",
	    activity_value: 20000,
	    inDataset: "http://www.ebi.ac.uk/chembl"
	    }]};
var this_result = searcher.parseTargetClassPharmacologyPaginated(JSONResponse);
        expect(this_result[0].chemblActivityURI).toBeDefined();
        expect(this_result[0].pmid).toBeDefined();
        //expect(this_result[0].relation).toBeDefined();
        //expect(this_result[0].standardUnits).toBeDefined();
        //expect(this_result[0].standardValue).toBeDefined();
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
        expect(this_result[0].pChembl).toBeDefined();
        expect(this_result[0].targets).toBeDefined();
        //expect(this_result[0].targetOrganism).toBeDefined();
        expect(this_result[0].assayURI).toBeDefined();
        expect(this_result[0].assayDescription).toBeDefined();
        expect(this_result[0].assayOrganismName).toBeDefined();
        expect(this_result[0].conceptWikiProvenance).toBeDefined();
        expect(this_result[0].chemspiderProvenance).toBeDefined();
        expect(this_result[0].assayTargetProvenance).toBeDefined();
        expect(this_result[0].assayProvenance).toBeDefined();
	// chemblDOIs is an array but could be empty
        expect(this_result[0].chemblDOIs).not.toBeNull();
	expect(this_result[0].activityComment).toBeDefined();
    });
  });
});
