var Openphacts = require("../../../src/OPS.js");
jasmine.getEnv().defaultTimeoutInterval = 30000;

describe("Target search", function() {
    var searcher, appID, appKey, appUrl;

    beforeEach(function() {
        appID = process.env['app_id'];
        appKey = process.env['app_key'];
        appUrl = process.env['app_url'];
	searcher = new TargetSearch(appUrl, appID, appKey);
    });

    describe("single target search", function() {

        it("and return a response", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;

            var callback = function(success, status, response) {
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
        it("issue #14", function() {
		//TODO this should really be in the functional tests since the data could change some time
//		{
//format: "linked-data-api",
//version: "1.5",
//result: {
//_about: "https://beta.openphacts.org/1.5/target?_format=json&app_key=ad4fca9111f258325e3ca50e7217dcbc&app_id=a409dcc9&uri=http%3A%2F%2Fpurl.uniprot.org%2Funiprot%2FE9Q3S4",
//definition: "https://beta.openphacts.org/api-config",
//extendedMetadataVersion: "https://beta.openphacts.org/1.5/target?_format=json&app_key=ad4fca9111f258325e3ca50e7217dcbc&app_id=a409dcc9&uri=http%3A%2F%2Fpurl.uniprot.org%2Funiprot%2FE9Q3S4&_metadata=all%2Cviews%2Cformats%2Cexecution%2Cbindings%2Csite",
//linkPredicate: "http://www.w3.org/2004/02/skos/core#exactMatch",
//activeLens: "Default",
//primaryTopic: {
//_about: "http://purl.uniprot.org/uniprot/E9Q3S4",
//alternativeName: "SPS1/STE20-related protein kinase YSK4",
//classifiedWith: [
//"http://purl.uniprot.org/go/0004674",
//"http://purl.uniprot.org/keywords/1185",
//"http://purl.uniprot.org/keywords/723",
//"http://purl.uniprot.org/keywords/67",
//"http://purl.uniprot.org/go/0005524"
//],
//existence: "http://purl.uniprot.org/core/Inferred_from_Homology_Existence",
//mass: 146412,
//organism: "http://purl.uniprot.org/taxonomy/10090",
//sequence: "MDSMPRPERHAESLLDICHEAGSTPMEMTVSQTENLTLQSISSSEDFDLEDDFSPFILAREGAAPRGENWPRRTEGVEIIVTFPPDPLQEASQEDLKESNQVTSEHQEREQVHPVSPPDDAEMVGLTGRMLTTQPSLLKTDGSSEELCGVDVALSPPRPCLDSSLAASAAGEVAPCVLKEQQRQSDEFPTSDISYSSRRTGLPLPPLSCLPMRSCIFNMEKSPKSPRHRERKVPSLSLSVPKLLEPLSRPLSQSAEFSSSKNHQEVTQEGPVEHTLRGSNCTLWSRNMCSFRKSGKQGVAESWPSQEMEGWDKTKTSGFKEGPSLFSCESVKEDTTPTERERDSGYHVSEMQRGGEDSQYLSSRKKESWTARVVERDSGVEHPILCKLLEVSNSEMTPAEEKEIGNENVPDAKSNSVHKSGAMEPHAASEEVSVPKNGPSVNSDGPAEELEGHRDIEQNRKIPMEEETNPEMNGVVPLTHIAFPGEGTSKGPARAEPHLQRRKRPAQNSNSFNLLAHREHDKLQTNTHRTKLDSRTKARNRAPPNLMVSIQASIKPNMHKNSIKTQVFPALELIDHRPHPSSKFQRRAPLTEKKSTHQTQKPKKQAFPRIGKHAGIKKPGIPLSAETTDPRLHFLDLKYSDMFKEINSASNGPGIYEMFGTPVYCHIREAERHDHRCYREIRTAPSGRCVVNKCQSSESDRCSNSRARLLQKRQHIKPPKPLHGLRQKHRGFISKDKGCKDMGGHTEDSVSEPDGQMKSPGNDFLSSKDDAQLMHLIPIPELSPEQKAPAPVSDLSIVEEIFTEECADEEGILNDDSLTQSLGDLKEPEGLHPQAPLVPSENSWAVLSEKRSGKRVSPEKHNVEPLDKINAEQMFPGYLEFDSLSEKSKTLVSFSSCSFQENLERAPSPTEQHWARSLEQDSLENNSTTYQTFGKISQEILDPGKNEELTDELLGCLVEELLALDEKDNNSCQIMTNEADAKNLNLVFSRRGNTIEELGRETTDVKLQRCINGFRIYDEENFLTSNEKKTLSDKSLNHEEAIFWTKGEILGRGAYGTVYCGLTSLGQLIAVKQVALDTSDKLATEKEYRKLQEEVDLLKALKHVNIVAYLGTCLEENTLSIFMEFVPGGSISSIINRFGPLPEMVFCKYTRQILQGVAYLHDNCVVHRDIKGNNVMLMPTGIIKLIDFGCAKRLAWAGLNGTHSDMLKSMRGTPYWMAPEVINESGYGRKSDIWSIGCTVFEMATGKPPLASMDRMAAMFYIGAHRGLMPPLPARFSEPAADFVRLCLTRDQHERPSALQLLKHSFLKRSQ",
//inDataset: "http://purl.uniprot.org",
//molecularWeight: 146412,
//seeAlso: "http://purl.uniprot.org/intact/E9Q3S4",
//exactMatch: "http://purl.uniprot.org/uniprot/E9Q3S4",
//isPrimaryTopicOf: "https://beta.openphacts.org/1.5/target?_format=json&app_key=ad4fca9111f258325e3ca50e7217dcbc&app_id=a409dcc9&uri=http%3A%2F%2Fpurl.uniprot.org%2Funiprot%2FE9Q3S4"
//}
//}
//}
            var this_success = null;
            var this_status = null;
            var this_result = null;

            var callback = function(success, status, response) {
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

            searcher.fetchTarget('http://purl.uniprot.org/uniprot/E9Q3S4', null, callback);
        });

        it("and use a chembl uri as input", function() {
            var this_success = null;
            var this_status = null;
            var this_result = null;

            var callback = function(success, status, response) {
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

            var callback = function(success, status, response) {
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

            var callback = function(success, status, response) {
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

            var callback = function(success, status, response) {
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
            expect(this_result[0].targetTitleSrc).toBeDefined();
            expect(this_result[0].chemblCompoundUri).toBeDefined();
            expect(this_result[0].compoundFullMwt).toBeDefined();
            expect(this_result[0].chemblAssayUri).toBeDefined();
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
            expect(this_result[0].cwCompoundUri).toBeDefined();
            expect(this_result[0].compoundPrefLabel).toBeDefined();
            expect(this_result[0].compoundInchikey).toBeDefined();
            expect(this_result[0].csid).toBeDefined();
            expect(this_result[0].csCompoundUri).toBeDefined();
            expect(this_result[0].compoundInchi).toBeDefined();
            expect(this_result[0].compoundSmiles).toBeDefined();
    	// mandatory values
            expect(this_result[0].chemblActivityUri).not.toBeNull();
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
    //  describe("compounds for a target", function() {
    
    //    it("and return a response", function() {
    //      var this_success = null;
    //      var this_status = null;
    //
    //      var callback=function(success, status, response){
    //        this_success = success;
    //        this_status = status;
    //      };
    //
    //      waitsFor(function() {
    //        return this_status != null;
    //      });
    //
    //      runs(function() {
    //        expect(this_success).toEqual(true);
    //        expect(this_status).toEqual(200);
    //      });
    //
    //      searcher.compoundsForTarget('http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49', callback);
    //    });
    //  });
});
