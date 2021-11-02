const http = require("http");
const convert = require("xml-js");
const jwt = require("jsonwebtoken");
const base64 = require("base-64");
module.exports.updatedetails = (req, res) => {
    // const { CUSTOMERNO, Country_Key, Name, Name2, City, Postal_Code, Region, Sort_field, HouseNO_street, Telephone_number } = req.body;
    // const CUSTOMERNO=req.body.CUSTOMERNO;
    // const countrykey=req.body.countrykey;
    // const firstname=req.body.firstname;
    // const lastname=req.body.lastname;
    // const street=req.body.street;
    // const city=req.body.city;
    // const region=req.body.region;
    // const postalcode=req.body.postalcode;
    // const sortField=req.body.sortField;
    // const telephone=req.body.telephone;
    // // const countrykey = countrykey.toString();
    // console.log(typeof(Country_Key1));
    // console.log(typeof(Telephone_number));

    var configData = {
      method: "POST",
      port: 8000,
      host: "SOLMAN.kaartech.com",
      path:
        "http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_newedit/100/zws_newedit/zws_newedit",
      headers: {
        "Content-Type": "text/xml",
        Authorization: "Basic " + base64.encode("abaper" + ":" + "abap@123"),
        "Cache-Control": "no-cache",
      },
      maxRedirects: 20,
    };
   
    const httpReq = http.request(configData, function (response) {
      var resultData = "";
   
      response.on("data", function (data) {
        resultData += data;
      });
      response.on("end", function (data) {
        var result2 = convert.xml2json(resultData, { compact: true, spaces: 4 });
        result2 = JSON.parse(result2);
        console.log(result2);
        updatedetails =
          result2["soap-env:Envelope"];
        console.log(updatedetails);
        res.status(201).json({
          updatedetails,
          data:true
        })
      });
    });
   
    const ReqObj = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_PROFILE_EDIT_VYAS>
          <ADRNR>${req.body.adrnr}</ADRNR>
          <!--Optional:-->
          <IT_KUNNR>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </IT_KUNNR>
          <KUNNR>${req.body.kunnr}</KUNNR>
          <NAME>${req.body.name}</NAME>
          <ORT01>${req.body.ort01}</ORT01>
          <PSTLZ>${req.body.pstlz}</PSTLZ>
          <REGIO>${req.body.regio}</REGIO>
          <STRAS>${req.body.stras}</STRAS>
          <TELF1>${req.body.telf1}</TELF1>
       </urn:ZBAPI_PROFILE_EDIT_VYAS>
    </soapenv:Body>
 </soapenv:Envelope>`
    httpReq.write(ReqObj);
    httpReq.end();
  };