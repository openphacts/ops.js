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
            var JSONResponse = {
                format: "linked-data-api",
                version: "1.4",
                result: {
                    _about: "https://ops2.few.vu.nl/target?uri=http%3A%2F%2Fpurl.uniprot.org%2Funiprot%2FE9Q3S4&app_id=335bc8f2&app_key=b7eb38718a8d30a9f7c803be4ece38c9&_format=json",
                    definition: "https://ops2.few.vu.nl/api-config",
                    extendedMetadataVersion: "https://ops2.few.vu.nl/target?uri=http%3A%2F%2Fpurl.uniprot.org%2Funiprot%2FE9Q3S4&app_id=335bc8f2&app_key=b7eb38718a8d30a9f7c803be4ece38c9&_format=json&_metadata=all%2Cviews%2Cformats%2Cexecution%2Cbindings%2Csite",
                    primaryTopic: {
                        _about: "http://purl.uniprot.org/uniprot/E9Q3S4",
                        alternativeName: "SPS1/STE20-related protein kinase YSK4",
                        classifiedWith: ["http://purl.uniprot.org/keywords/67", "http://purl.uniprot.org/go/0004674", "http://purl.uniprot.org/keywords/1185", "http://purl.uniprot.org/go/0005524", "http://purl.uniprot.org/keywords/723"],
                        existence: "http://purl.uniprot.org/core/Inferred_from_Homology_Existence",
                        mass: 146412,
                        organism: "http://purl.uniprot.org/taxonomy/10090",
                        sequence: "MDSMPRPERHAESLLDICHEAGSTPMEMTVSQTENLTLQSISSSEDFDLEDDFSPFILAREGAAPRGENWPRRTEGVEIIVTFPPDPLQEASQEDLKESNQVTSEHQEREQVHPVSPPDDAEMVGLTGRMLTTQPSLLKTDGSSEELCGVDVALSPPRPCLDSSLAASAAGEVAPCVLKEQQRQSDEFPTSDISYSSRRTGLPLPPLSCLPMRSCIFNMEKSPKSPRHRERKVPSLSLSVPKLLEPLSRPLSQSAEFSSSKNHQEVTQEGPVEHTLRGSNCTLWSRNMCSFRKSGKQGVAESWPSQEMEGWDKTKTSGFKEGPSLFSCESVKEDTTPTERERDSGYHVSEMQRGGEDSQYLSSRKKESWTARVVERDSGVEHPILCKLLEVSNSEMTPAEEKEIGNENVPDAKSNSVHKSGAMEPHAASEEVSVPKNGPSVNSDGPAEELEGHRDIEQNRKIPMEEETNPEMNGVVPLTHIAFPGEGTSKGPARAEPHLQRRKRPAQNSNSFNLLAHREHDKLQTNTHRTKLDSRTKARNRAPPNLMVSIQASIKPNMHKNSIKTQVFPALELIDHRPHPSSKFQRRAPLTEKKSTHQTQKPKKQAFPRIGKHAGIKKPGIPLSAETTDPRLHFLDLKYSDMFKEINSASNGPGIYEMFGTPVYCHIREAERHDHRCYREIRTAPSGRCVVNKCQSSESDRCSNSRARLLQKRQHIKPPKPLHGLRQKHRGFISKDKGCKDMGGHTEDSVSEPDGQMKSPGNDFLSSKDDAQLMHLIPIPELSPEQKAPAPVSDLSIVEEIFTEECADEEGILNDDSLTQSLGDLKEPEGLHPQAPLVPSENSWAVLSEKRSGKRVSPEKHNVEPLDKINAEQMFPGYLEFDSLSEKSKTLVSFSSCSFQENLERAPSPTEQHWARSLEQDSLENNSTTYQTFGKISQEILDPGKNEELTDELLGCLVEELLALDEKDNNSCQIMTNEADAKNLNLVFSRRGNTIEELGRETTDVKLQRCINGFRIYDEENFLTSNEKKTLSDKSLNHEEAIFWTKGEILGRGAYGTVYCGLTSLGQLIAVKQVALDTSDKLATEKEYRKLQEEVDLLKALKHVNIVAYLGTCLEENTLSIFMEFVPGGSISSIINRFGPLPEMVFCKYTRQILQGVAYLHDNCVVHRDIKGNNVMLMPTGIIKLIDFGCAKRLAWAGLNGTHSDMLKSMRGTPYWMAPEVINESGYGRKSDIWSIGCTVFEMATGKPPLASMDRMAAMFYIGAHRGLMPPLPARFSEPAADFVRLCLTRDQHERPSALQLLKHSFLKRSQ",
                        inDataset: "http://purl.uniprot.org",
                        molecularWeight: 146412,
                        seeAlso: "http://purl.uniprot.org/intact/E9Q3S4",
                        exactMatch: "http://purl.uniprot.org/uniprot/E9Q3S4",
                        isPrimaryTopicOf: "https://ops2.few.vu.nl/target?uri=http%3A%2F%2Fpurl.uniprot.org%2Funiprot%2FE9Q3S4&app_id=335bc8f2&app_key=b7eb38718a8d30a9f7c803be4ece38c9&_format=json"
                    }
                }
            };
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
	it("in 1.5 due to missing OCRS an item can have a missing exactMatch in hasMolecule block", function() {
var JSONResponse = {items:[{
	_about: "http://rdf.ebi.ac.uk/resource/chembl/activity/CHEMBL_ACT_13306592",
		pmid: "http://identifiers.org/pubmed/23651455",
		hasAssay: {
			_about: "http://rdf.ebi.ac.uk/resource/chembl/assay/CHEMBL2384413",
		description: "Inhibition of PDE5A (unknown origin)",
		assayOrganismName: "Homo sapiens",
		hasTarget: {
			_about: "http://rdf.ebi.ac.uk/resource/chembl/target/CHEMBL1827",
		title: "Phosphodiesterase 5A",
		hasTargetComponent: {
			_about: "http://rdf.ebi.ac.uk/resource/chembl/targetcomponent/CHEMBL_TC_124",
		exactMatch: {
			_about: "http://www.conceptwiki.org/concept/b932a1ed-b6c3-4291-a98a-e195668eda49",
		inDataset: "http://www.conceptwiki.org",
		prefLabel_en: "cGMP-specific 3',5'-cyclic phosphodiesterase (Homo sapiens)",
		prefLabel: "cGMP-specific 3',5'-cyclic phosphodiesterase (Homo sapiens)"
		}
		},
		assay_organism: "Homo sapiens",
		inDataset: "http://www.ebi.ac.uk/chembl",
		type: "http://rdf.ebi.ac.uk/terms/chembl#SingleProtein"
		},
		inDataset: "http://www.ebi.ac.uk/chembl"
		},
		hasMolecule: {
				     _about: "http://rdf.ebi.ac.uk/resource/chembl/molecule/CHEMBL2381188",
				     inDataset: "http://www.ebi.ac.uk/chembl"
			     },
		activity_unit: {
				       _about: "http://www.openphacts.org/units/Nanomolar",
				       prefLabel: "nM"
			       },
		pChembl: 4.59,
		publishedRelation: "=",
		publishedType: "IC50",
		publishedUnits: "uM",
		publishedValue: 26,
		activity_relation: "=",
		activity_type: "IC50",
		activity_value: 26000,
		inDataset: "http://www.ebi.ac.uk/chembl"
}]};
            var this_result = searcher.parseTargetPharmacologyResponse(JSONResponse);
        expect(this_result[0].targetTitle).toBeDefined();
        expect(this_result[0].compoundInchikeySrc).toBeDefined();
        expect(this_result[0].targetTitleSrc).toBeDefined();
        expect(this_result[0].chemblCompoundUri).toBeDefined();
        expect(this_result[0].compoundFullMwt).toBeDefined();
        expect(this_result[0].chemblAssayUri).toBeDefined();
        expect(this_result[0].chemblTargetUri).toBeDefined();
        expect(this_result[0].targetOrganisms).toBeDefined();
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
        expect(this_result[0].targets).toBeDefined();
	// chemblDOIs is an array but could be empty
        expect(this_result[0].chemblDOIs).not.toBeNull();
	expect(this_result[0].activityComment).toBeDefined();

	// mandatory values
        expect(this_result[0].chemblActivityUri).not.toBeNull();
	// TODO in 1.5 due to missing OCRS no guarantee this will have a value
        expect(this_result[0].cwCompoundUri).toBeDefined();
        expect(this_result[0].compoundPrefLabel).toBeDefined();
        expect(this_result[0].compoundInchikey).toBeDefined();
        expect(this_result[0].compoundSmiles).toBeDefined();
        expect(this_result[0].compoundInchi).toBeDefined();
        expect(this_result[0].csCompoundUri).toBeDefined();
        expect(this_result[0].csid).toBeDefined();
 
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

    describe("target pharmacology response contains target components", function() {

        it("and can be parsed", function() {
            var JSONResponse = {
                items: [{
                    _about: "http://rdf.ebi.ac.uk/resource/chembl/activity/CHEMBL_ACT_1000083",
                    pmid: "http://identifiers.org/pubmed/12238914",
                    hasAssay: {
                        _about: "http://rdf.ebi.ac.uk/resource/chembl/assay/CHEMBL679354",
                        description: "Antagonist activity against the Estrogen Receptor (ER)",
                        hasTarget: {
                            _about: "http://rdf.ebi.ac.uk/resource/chembl/target/CHEMBL2093866",
                            title: "Estrogen receptor",
                            hasTargetComponent: [{
                                _about: "http://rdf.ebi.ac.uk/resource/chembl/targetcomponent/CHEMBL_TC_410",
                                exactMatch: {
                                    _about: "http://www.conceptwiki.org/concept/1f144c20-1a43-41b2-ac9a-c5188405e463",
                                    inDataset: "http://www.conceptwiki.org",
                                    prefLabel_en: "Estrogen receptor (Homo sapiens)",
                                    prefLabel: "Estrogen receptor (Homo sapiens)"
                                }
                            }, {
                                _about: "http://rdf.ebi.ac.uk/resource/chembl/targetcomponent/CHEMBL_TC_317",
                                exactMatch: {
                                    _about: "http://www.conceptwiki.org/concept/e4210bb9-2a88-4217-9c29-aa0b476015d7",
                                    inDataset: "http://www.conceptwiki.org",
                                    prefLabel_en: "Estrogen receptor beta (Homo sapiens)",
                                    prefLabel: "Estrogen receptor beta (Homo sapiens)"
                                }
                            }],
                            targetOrganismName: "Homo sapiens",
                            inDataset: "http://www.ebi.ac.uk/chembl",
                            type: "http://rdf.ebi.ac.uk/terms/chembl#ProteinFamily"
                        },
                        inDataset: "http://www.ebi.ac.uk/chembl"
                    },
                    hasMolecule: {
                        _about: "http://rdf.ebi.ac.uk/resource/chembl/molecule/CHEMBL343306",
                        exactMatch: [{
                            _about: "http://www.conceptwiki.org/concept/55de22d0-cca8-4fa8-895f-9f5f17ee2c3d",
                            inDataset: "http://www.conceptwiki.org",
                            prefLabel_en: "6-(3-chloro-4-fluorophenyl)-4,4-dimethyl-1,4-dihydro-2H-3,1-benzoxazin-2-one",
                            prefLabel: "6-(3-chloro-4-fluorophenyl)-4,4-dimethyl-1,4-dihydro-2H-3,1-benzoxazin-2-one"
                        }, "http://www.conceptwiki.org/concept/index/55de22d0-cca8-4fa8-895f-9f5f17ee2c3d", {
                            _about: "http://ops.rsc.org/OPS1766579",
                            inDataset: "http://ops.rsc.org",
                            inchi: "InChI=1S/C16H13ClFNO2/c1-16(2)11-7-9(4-6-14(11)19-15(20)21-16)10-3-5-13(18)12(17)8-10/h3-8H,1-2H3,(H,19,20)",
                            inchikey: "PRCXSDHAGJJCKC-UHFFFAOYSA-N",
                            molweight: 305.731,
                            ro5_violations: 1,
                            smiles: "CC1(C2=C(C=CC(=C2)C3=CC(=C(C=C3)F)Cl)NC(=O)O1)C"
                        }, "http://ops.rsc.org/OPS1766579/rdf"]
                    },
                    activity_unit: {
                        _about: "http://www.openphacts.org/units/Nanomolar",
                        prefLabel: "nM"
                    },
                    publishedRelation: ">",
                    publishedType: "IC50",
                    publishedUnits: "nM",
                    publishedValue: 10000,
                    activity_relation: ">",
                    activity_type: "IC50",
                    activity_value: 10000,
                    inDataset: "http://www.ebi.ac.uk/chembl"
                }]
            };
            var this_result = searcher.parseTargetPharmacologyResponse(JSONResponse);
            expect(this_result[0].targetTitle).toEqual("Estrogen receptor");
            expect(this_result[0].compoundInchikeySrc).toEqual("http://ops.rsc.org");
            expect(this_result[0].targetTitleSrc).toEqual("http://www.ebi.ac.uk/chembl");
            expect(this_result[0].chemblCompoundUri).toEqual("http://rdf.ebi.ac.uk/resource/chembl/molecule/CHEMBL343306");
            expect(this_result[0].compoundFullMwt).toEqual(305.731);
            expect(this_result[0].chemblAssayUri).toEqual("http://rdf.ebi.ac.uk/resource/chembl/assay/CHEMBL679354");
            expect(this_result[0].chemblTargetUri).toEqual("http://rdf.ebi.ac.uk/resource/chembl/target/CHEMBL2093866");
            expect(this_result[0].targetOrganisms.length).toEqual(1);
            expect(this_result[0].targetOrganisms[0].organism).toEqual("Homo sapiens");
            expect(this_result[0].targetOrganisms[0].src).toEqual("https://www.ebi.ac.uk/chembldb/target/inspect/CHEMBL2093866");
            expect(this_result[0].assayDescription).toEqual("Antagonist activity against the Estrogen Receptor (ER)");
            expect(this_result[0].activityRelation).toEqual(">");
            expect(this_result[0].activityStandardUnits).toEqual("nM");
            expect(this_result[0].activityStandardValue).toEqual(10000);
            expect(this_result[0].activityActivityType).toEqual("IC50");
            expect(this_result[0].activityPubmedId).toEqual("http://identifiers.org/pubmed/12238914");
            expect(this_result[0].compoundFullMwtSrc).toEqual("http://www.ebi.ac.uk/chembl");
            expect(this_result[0].compoundPrefLabelSrc).toEqual("http://www.conceptwiki.org");
            expect(this_result[0].compoundInchiSrc).toEqual("http://ops.rsc.org");
            expect(this_result[0].compoundSmilesSrc).toEqual("http://ops.rsc.org");
            expect(this_result[0].targetPrefLabelSrc).toEqual("http://www.conceptwiki.org");
            expect(this_result[0].assayOrganismSrc).toEqual("http://www.ebi.ac.uk/chembl");
            expect(this_result[0].assayDescriptionSrc).toEqual("http://www.ebi.ac.uk/chembl");
            expect(this_result[0].activityRelationSrc).toEqual("http://www.ebi.ac.uk/chembl");
            expect(this_result[0].activityStandardUnits_src).toEqual("http://www.ebi.ac.uk/chembl");
            expect(this_result[0].activityStandardValue_src).toEqual("http://www.ebi.ac.uk/chembl");
            expect(this_result[0].activityActivityType_src).toEqual("http://www.ebi.ac.uk/chembl");
            expect(this_result[0].compoundPrefLabelItem).toEqual("http://www.conceptwiki.org/concept/55de22d0-cca8-4fa8-895f-9f5f17ee2c3d");
            expect(this_result[0].activityActivityTypeItem).toEqual("https://www.ebi.ac.uk/ebisearch/search.ebi?t=1000083&db=chembl-activity");
            expect(this_result[0].activityRelationItem).toEqual("https://www.ebi.ac.uk/ebisearch/search.ebi?t=1000083&db=chembl-activity");
            expect(this_result[0].activityStandardValueItem).toEqual("https://www.ebi.ac.uk/ebisearch/search.ebi?t=1000083&db=chembl-activity");
            expect(this_result[0].activityStandardUnitsItem).toEqual("https://www.ebi.ac.uk/ebisearch/search.ebi?t=1000083&db=chembl-activity");
            expect(this_result[0].compoundFullMwtItem).toEqual("https://www.ebi.ac.uk/chembldb/compound/inspect/CHEMBL343306");
            expect(this_result[0].compoundSmilesItem).toEqual("http://www.chemspider.com/OPS1766579");
            expect(this_result[0].compoundInchiItem).toEqual("http://www.chemspider.com/OPS1766579");
            expect(this_result[0].compoundInchikeyItem).toEqual("http://www.chemspider.com/OPS1766579");
            expect(this_result[0].chemblProvenance.source).toEqual("chembl");
            expect(this_result[0].compoundRO5Violations).toEqual(1);
            //TODO should pChembl be null if no value?
            expect(this_result[0].pChembl).toBeUndefined();
            //TODO check if this should not be null in the response
            expect(this_result[0].assayOrganism).toBeDefined();
            expect(this_result[0].assayOrganismItem).toEqual("https://www.ebi.ac.uk/chembldb/assay/inspect/CHEMBL679354");
            expect(this_result[0].targets.length).toEqual(1);
            expect(this_result[0].targets[0].title).toEqual("Estrogen receptor");
            expect(this_result[0].targets[0].type).toEqual("http://rdf.ebi.ac.uk/terms/chembl#ProteinFamily");
            expect(this_result[0].targets[0].targetComponents.length).toEqual(2);
            expect(this_result[0].targets[0].targetComponents[0].URI).toEqual("http://rdf.ebi.ac.uk/resource/chembl/targetcomponent/CHEMBL_TC_410");
            expect(this_result[0].targets[0].targetComponents[0].prefLabel).toEqual("Estrogen receptor (Homo sapiens)");
            expect(this_result[0].targets[0].targetComponents[0].prefLabelURI).toEqual("http://www.conceptwiki.org/concept/1f144c20-1a43-41b2-ac9a-c5188405e463");
            expect(this_result[0].targets[0].targetComponents[1].URI).toEqual("http://rdf.ebi.ac.uk/resource/chembl/targetcomponent/CHEMBL_TC_317");
            expect(this_result[0].targets[0].targetComponents[1].prefLabel).toEqual("Estrogen receptor beta (Homo sapiens)");
            expect(this_result[0].targets[0].targetComponents[1].prefLabelURI).toEqual("http://www.conceptwiki.org/concept/e4210bb9-2a88-4217-9c29-aa0b476015d7");
            expect(this_result[0].chemblDOIs.length).toEqual(0);
            //TODO should this be null, maybe we can add something in for the test
            expect(this_result[0].activityComment).toBeNull();
            expect(this_result[0].chemblActivityUri).toEqual("http://rdf.ebi.ac.uk/resource/chembl/activity/CHEMBL_ACT_1000083");
            expect(this_result[0].cwCompoundUri).toEqual("http://www.conceptwiki.org/concept/55de22d0-cca8-4fa8-895f-9f5f17ee2c3d");
            expect(this_result[0].compoundPrefLabel).toEqual("6-(3-chloro-4-fluorophenyl)-4,4-dimethyl-1,4-dihydro-2H-3,1-benzoxazin-2-one");
            expect(this_result[0].compoundInchikey).toEqual("PRCXSDHAGJJCKC-UHFFFAOYSA-N");
            expect(this_result[0].compoundSmiles).toEqual("CC1(C2=C(C=CC(=C2)C3=CC(=C(C=C3)F)Cl)NC(=O)O1)C");
            expect(this_result[0].compoundInchi).toEqual("InChI=1S/C16H13ClFNO2/c1-16(2)11-7-9(4-6-14(11)19-15(20)21-16)10-3-5-13(18)12(17)8-10/h3-8H,1-2H3,(H,19,20)");
            expect(this_result[0].csCompoundUri).toEqual("http://ops.rsc.org/OPS1766579");
            expect(this_result[0].csid).toEqual("OPS1766579");
        });
    });
});
