describe("Target search", function() {
  var searcher, appID, appKey, appUrl;

  beforeEach(function() {
      appID = $.url().param('app_id');
      appKey = $.url().param('app_key');
      appUrl = $.url().param('app_url');
      searcher = new Openphacts.TargetSearch(appUrl, appID, appKey);
  });

  describe("single target search", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_result = searcher.parseTargetResponse(response);
      };

      waitsFor(function() {
        return this_result != null;
      });

      runs(function() {
        expect(this_success).toBe(true);
        expect(this_status).toBe(200);
        expect(this_result).toBeDefined();

        // mandatory
        expect(this_result.id).not.toBeNull();
        //expect(this_result.cwURI).not.toBeNull();
        //expect(this_result.uniprotURI).not.toBeNull();
        //expect(this_result.existence).not.toBeNull();
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

      searcher.fetchTarget('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', null, callback);
    });
    it("and use a chembl uri as input", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_result = searcher.parseTargetResponse(response);
      };

      waitsFor(function() {
        return this_result != null && this_success != null;
      });

      runs(function() {
        expect(this_success).toBe(true);
        expect(this_status).toBe(200);
        expect(this_result).toBeDefined();

        // mandatory
        expect(this_result.id).not.toBeNull();
        //expect(this_result.cwURI).not.toBeNull();
        //expect(this_result.uniprotURI).not.toBeNull();
        //expect(this_result.existence).not.toBeNull();

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
      });

      searcher.fetchTarget('http://rdf.ebi.ac.uk/resource/chembl/target/CHEMBL1075146', null, callback);
    });

    it("and handle errors", function() {
      var this_success = null;
      var this_status = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
      };

      waitsFor(function() {
        return this_success != null;
      });

      runs(function() {
        expect(this_success).toBe(false);
        expect(this_status).toBe(404);
      });

      searcher.fetchTarget('http://www.conceptwiki.org/concept/876876876', null, callback);
    });
  });
  describe("fetch mutiple targets using batch call", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_result = searcher.parseTargetBatchResponse(response);
      };

      waitsFor(function() {
        return this_result != null;
      });

      runs(function() {
        expect(this_success).toBe(true);
        expect(this_status).toBe(200);
        expect(this_result).toBeDefined();
	expect(this_result.length).toEqual(2);
        // mandatory
        expect(this_result[0].id).not.toBeNull();
        //expect(this_result.cwURI).not.toBeNull();
        //expect(this_result.uniprotURI).not.toBeNull();
        //expect(this_result.existence).not.toBeNull();
        expect(this_result[0].URI).not.toBeNull();

        // optional
        expect(this_result[0].cellularLocation).toBeDefined();
        expect(this_result[0].molecularWeight).toBeDefined();
        expect(this_result[0].numberOfResidues).toBeDefined();
        expect(this_result[0].theoreticalPi).toBeDefined();
        //expect(this_result[0].keywords).toBeDefined();
        expect(this_result[0].functionAnnotation).toBeDefined();
        expect(this_result[0].alternativeName).toBeDefined();
        expect(this_result[0].organism).toBeDefined();
        expect(this_result[0].sequence).toBeDefined();
        expect(this_result[0].classifiedWith).toBeDefined();
        expect(this_result[0].seeAlso).toBeDefined();
        expect(this_result[0].drugbankURI).toBeDefined();
        expect(this_result[0].prefLabel).toBeDefined();
        expect(this_result[0].chemblItems).toBeDefined();
        expect(this_result[0].URI).toBeDefined();
	expect(this_result[0].mass).toBeDefined();
      });

      searcher.fetchTargetBatch(['http://www.conceptwiki.org/concept/00059958-a045-4581-9dc5-e5a08bb0c291', 'http://www.conceptwiki.org/concept/7b21c06f-0343-4fcc-ab0f-a74ffe871ade'], null, callback);
    });
    it("and handle errors", function() {
      var this_success = null;
      var this_status = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
      };

      waitsFor(function() {
        return this_success != null;
      });

      runs(function() {
        expect(this_success).toBe(false);
        expect(this_status).toBe(404);
      });

      searcher.fetchTargetBatch(['http://www.conceptwiki.org/concept/876876876', 'http://www.conceptwiki.org/concept/7b21c0-a74ffe871ade'], null, callback);
    });
  });
  describe("target pharmacology search", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_result = searcher.parseTargetPharmacologyResponse(response);
      };

      waitsFor(function() {
        return this_result != null;
      });

      runs(function() {
        expect(this_success).toBe(true);
        expect(this_status).toBe(200);
        expect(this_result).toBeDefined();

        // optional values
        expect(this_result[0].targetTitle).toBeDefined();
        expect(this_result[0].compoundInchikeySrc).toBeDefined();
		expect(this_result[0].targetComponents).toBeDefined();
		//expect(this_result[0].targetComponents[0].label).toBeDefined();
 		//expect(this_result[0].targetComponents[0].uri).toBeDefined();
                //expect(this_result[0].targetComponents[0].labelProvenance).toBeDefined();
	
        expect(this_result[0].targetTitleSrc).toBeDefined();
        expect(this_result[0].chemblCompoundUri).toBeDefined();
        expect(this_result[0].compoundFullMwt).toBeDefined();
        expect(this_result[0].chemblAssayUri).toBeDefined();
        expect(this_result[0].targetURI).toBeDefined();
        expect(this_result[0].targetOrganismName).toBeDefined();
        expect(this_result[0].assayOrganism).toBeDefined();
        expect(this_result[0].assayDescription).toBeDefined();
        expect(this_result[0].activityRelation).toBeDefined();
        expect(this_result[0].activityStandardUnits).toBeDefined();
        expect(this_result[0].activityStandardValue).toBeDefined();
        expect(this_result[0].activityActivityType).toBeDefined();
        expect(this_result[0].activityPubmedId).toBeDefined();
        expect(this_result[0].compoundFullMwtSrc).toBeDefined();
        expect(this_result[0].compoundPrefLabelSrc).toBeDefined();
        expect(this_result[0].compoundInchiSrc).toBeDefined();
        expect(this_result[0].compoundSmilesSrc).toBeDefined();
        expect(this_result[0].targetPrefLabelSrc).toBeDefined();
        expect(this_result[0].assayOrganismSrc).toBeDefined();
        expect(this_result[0].assayDescriptionSrc).toBeDefined();
        expect(this_result[0].activityRelationSrc).toBeDefined();
        expect(this_result[0].activityStandardUnits_src).toBeDefined();
        expect(this_result[0].activityStandardValue_src).toBeDefined();
        expect(this_result[0].activityActivityType_src).toBeDefined();
        expect(this_result[0].compoundPrefLabelItem).toBeDefined();
        expect(this_result[0].activityActivityTypeItem).toBeDefined();
        expect(this_result[0].activityRelationItem).toBeDefined();
        expect(this_result[0].activityStandardValueItem).toBeDefined();
        expect(this_result[0].activityStandardUnitsItem).toBeDefined();
        expect(this_result[0].compoundFullMwtItem).toBeDefined();
        expect(this_result[0].compoundSmilesItem).toBeDefined();
        expect(this_result[0].compoundInchiItem).toBeDefined();
        expect(this_result[0].compoundInchikeyItem).toBeDefined();
        expect(this_result[0].assayOrganismItem).toBeDefined();
	// chemblDOIs is an array but could be empty
        expect(this_result[0].chemblDOIs).not.toBeNull();
	expect(this_result[0].activityComment).toBeDefined();

	// mandatory values
        expect(this_result[0].chemblActivityUri).not.toBeNull();
        expect(this_result[0].cwCompoundUri).not.toBeNull();
        expect(this_result[0].compoundPrefLabel).not.toBeNull();
        expect(this_result[0].compoundInchikey).not.toBeNull();
        expect(this_result[0].compoundSmiles).not.toBeNull();
        expect(this_result[0].compoundInchi).not.toBeNull();
        expect(this_result[0].csCompoundUri).not.toBeNull();
        expect(this_result[0].csid).not.toBeNull();
      });

      searcher.targetPharmacology('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, 20, null, null, callback);
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
        expect(this_success).toBe(false);
        expect(this_status).toBe(404);
      });

      searcher.targetPharmacology('http://www.conceptwiki.org/concept/876876876', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, 20, null, null, callback);
    });
  });

  describe("target pharmacology count", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;
      var this_result = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
        this_result = searcher.parseTargetPharmacologyCountResponse(response);
      };

      waitsFor(function() {
        return this_result != null;
      });

      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
        expect(this_result).toBeDefined();
      });

      searcher.targetPharmacologyCount('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, callback);
    });
  });
  describe("compounds for a target", function() {

    it("and return a response", function() {
      var this_success = null;
      var this_status = null;

      var callback=function(success, status, response){
        this_success = success;
        this_status = status;
      };

      waitsFor(function() {
        return this_status != null;
      });

      runs(function() {
        expect(this_success).toEqual(true);
        expect(this_status).toEqual(200);
      });

      searcher.compoundsForTarget('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', callback);
    });
  });
});
