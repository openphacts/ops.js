Openphacts.TargetSearch = function TargetSearch(baseURL) {
    this.baseURL = baseURL;
}

Openphacts.TargetSearch.prototype.fetchTarget = function(appID, appKey, targetUri, callback) {
    var targetQuery = $.ajax({
        url: this.baseURL + '/target',
        cache: true,
        data: {
            _format: "json",
            uri: targetUri,
            app_id: appID,
            app_key: appKey
        },
        success: function(response, status, request) {
            callback.call(this, true, request.status, response.result.primaryTopic);   
        },
        error: function(request, status, error) {
            callback.call(this, false, request.status);
        }
    });
}

Openphacts.TargetSearch.prototype.parseTargetResponse = function(response) {
    var drugbankData, chemblData, uniprotData;
    var cwUri = response["_about"];
    var id = cwUri.split("/").pop();
    var keywords = [];
    var classifiedWith = [];
    var seeAlso = [];
    $.each(response.exactMatch, function (i, exactMatch) {
        if (exactMatch["_about"]) {
            if (exactMatch["_about"].indexOf("http://www4.wiwiss.fu-berlin.de/drugbank") !== -1) {
                drugbankData = exactMatch;
            } else if (exactMatch["_about"].indexOf("http://linkedlifedata.com/resource/drugbank") !== -1) {
                drugbankData = exactMatch;
            } else if (exactMatch["_about"].indexOf("http://data.kasabi.com/dataset/chembl-rdf") !== -1) {
                chemblData = exactMatch;
                $.each(chemblData.keyword, function(j, key) {
                    keywords.push(key);
                });
            } else if (exactMatch["_about"].indexOf("http://purl.uniprot.org") !== -1) {
                uniprotData = exactMatch;
                $.each(uniprotData.classifiedWith, function(j, classified) {
                    classifiedWith.push(classified);
                });
                $.each(uniprotData.seeAlso, function(j, see) {
                    seeAlso.push(see);
                });
            }
        }
    });
    return {
        id: id,
        cellularLocation: drugbankData ? drugbankData.cellularLocation : null,
        molecularWeight: drugbankData ? drugbankData.molecularWeight : null,
        numberOfResidues: drugbankData ? drugbankData.numberOfResidues : null,
        theoreticalPi: drugbankData ? drugbankData.theoreticalPi : null,
        drugbankURI: drugbankData ? drugbankData["_about"] : null,
        description: chemblData ? chemblData.description : null,
        subClassOf: chemblData ? chemblData.subClassOf : null,
        keywords: keywords,
        functionAnnotation: uniprotData ? uniprotData.Function_Annotation : null,
        alternativeName: uniprotData ? uniprotData.alternativeName : null,
        existence: uniprotData ? uniprotData.existence : null,
        organism: uniprotData ? uniprotData.organism : null,
        sequence: uniprotData ? uniprotData.sequence : null,
        classifiedWith: classifiedWith,
        seeAlso: seeAlso
    };
}
