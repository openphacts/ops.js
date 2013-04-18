Openphacts.CompoundSearch = function CompoundSearch(baseURL) {
    this.baseURL = baseURL;
}

Openphacts.CompoundSearch.prototype.fetchCompound = function(appID, appKey, compoundUri, callback) {
    var compoundQuery = $.ajax({
        dataType: "jsonp",
        url: this.baseURL + '/compound?_callback=?',
        cache: true,
        data: {
            _format: "json",
            uri: compoundUri,
            app_id: appID,
            app_key: appKey
        }
    });
    compoundQuery.success(function (response) {
        callback.call(this, response.result.primaryTopic);
    });
}

Openphacts.CompoundSearch.prototype.parseCompoundResponse = function(response) {
    var drugbankData, chemspiderData, chemblData;
    var cwUri = response["_about"];
    var id = cwUri.split("/").pop();
    var prefLabel = response.prefLabel;
    $.each(response.exactMatch, function (i, exactMatch) {
        if (exactMatch["_about"]) {
            if (exactMatch["_about"].indexOf("http://www4.wiwiss.fu-berlin.de/drugbank") !== -1) {
                drugbankData = exactMatch;
            } else if (exactMatch["_about"].indexOf("http://linkedlifedata.com/resource/drugbank") !== -1) {
                drugbankData = exactMatch;
            } else if (exactMatch["_about"].indexOf("http://www.chemspider.com") !== -1) {
                chemspiderData = exactMatch;
            } else if (exactMatch["_about"].indexOf("http://rdf.chemspider.com") !== -1) {
                chemspiderData = exactMatch;
            } else if (exactMatch["_about"].indexOf("http://data.kasabi.com/dataset/chembl-rdf") !== -1) {
                chemblData = exactMatch;
            }
        }
    });
    return {
        id: id,
        prefLabel: prefLabel,
        cwUri: cwUri,
        description: drugbankData ? drugbankData.description : null,
        biotransformationItem: drugbankData ? drugbankData.biotransformation : null,
        toxicity: drugbankData ? drugbankData.toxicity : null,
        proteinBinding: drugbankData ? drugbankData.proteinBinding : null,
        csUri: chemspiderData ? chemspiderData["_about"] : null,
        hba: chemspiderData ? chemspiderData.hba : null,
        hbd: chemspiderData ? chemspiderData.hbd : null,
        inchi: chemspiderData ? chemspiderData.inchi : null,
        logp: chemspiderData ? chemspiderData.logp : null,
        psa: chemspiderData ? chemspiderData.psa : null,
        ro5Violations: chemspiderData ? chemspiderData.ro5_violations : null, 
        smiles: chemspiderData ? chemspiderData.smiles : null,
        chemblURI: chemblData ? chemblData["_about"] : null,
        fullMWT: chemblData ? chemblData.full_mwt : null,
        molform: chemblData ? chemblData.molform : null,
        mwFreebase: chemblData ? chemblData.mw_freebase : null,
        rtb: chemblData ? chemblData.rtb : null
    };
}
