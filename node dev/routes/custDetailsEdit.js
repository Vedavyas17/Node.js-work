const express= require('express');
const router=express.Router();
const fetch= require('node-fetch');
const xml2js = require('xml2js');
const base64 = require("base-64");
const { request } = require('http');
router.use(express.urlencoded());
router.use(express.json());

const parser= xml2js.Parser();

router.post("/custdetailsedit",async(req,res)=> {

    const CUSTOMER_ID = req.body.CUSTOMER_ID;
    const username1 = req.body.username1;
    const ADRNR = req.body.ADRNR;
    const BUKRS = req.body.BUKRS;
    const ERNAM= req.body.ERNAM;
    const LAND1= req.body.LAND1;
    const NAME2 = req.body.NAME2;
    const ORT01= req.body.ORT01;
    const PSTLZ= req.body.PSTLZ;
    const SPART= req.body.SPART
    const TELF1= req.body.TELF1;

    // const TELF2 = req.body.TELF2;
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_custdetail_editnew/100/zws_custdetail_editnew/zws_custdetail_editnew'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_CUSTDETAILS_VED_EDIT>
          <!--Optional:-->
          <ADRNR>${ADRNR}</ADRNR>
          <!--Optional:-->
          <BUKRS>${BUKRS}</BUKRS>
          <!--Optional:-->
          <ERNAM>${ERNAM}</ERNAM>
          <IT_OUTPUT>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </IT_OUTPUT>
          <IT_UPDATE>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </IT_UPDATE>
          <KUNNR>${CUSTOMER_ID}</KUNNR>
          <!--Optional:-->
          <LAND1>${LAND1}</LAND1>
          <!--Optional:-->
          <NAME1>${username1}</NAME1>
          <!--Optional:-->
          <NAME2>${NAME2}</NAME2>
          <!--Optional:-->
          <ORT01>${ORT01}</ORT01>
          <!--Optional:-->
          <PSTLZ>${PSTLZ}</PSTLZ>
          <!--Optional:-->
          <SPART>${SPART}</SPART>
          <!--Optional:-->
          <TELF1>${TELF1}</TELF1>
          <!--Optional:-->
          <TELF2></TELF2>
          <!--Optional:-->
          <VTWEG></VTWEG>
       </urn:ZBAPI_CUSTDETAILS_VED_EDIT>
    </soapenv:Body>
 </soapenv:Envelope>`
    

cusDetails= await fetch(Request_URL,
    {
        method: "POST",
        mode :'cors',
        port : 8000,
        host: "SOLMAN.kaartech.com",
        credentials:'include',
        path : Request_URL,
        headers:{
            'Content-Type':'text/xml',
            'Authorization':'Basic '+ base64.encode('abaper' + ':' + 'abap@123'),
            'Cach-Control' : 'no-cache',
        },
        maxRedirects: 20,
        referrerPolicy:'no-referrer',
        body: Request_XML,
    }).then(res=> res.text())
    
    parser.parseString(cusDetails, (err, data) => {
        if(err)
        {
            console.log('Error in customer details Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            // cus_Details = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_CUSTDETAILS_VED_EDITResponse'][0]['IT_OUTPUT'][0]['item']
            // console.log(cus_Details)
            cus_Details_Edit = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_CUSTDETAILS_VED_EDITResponse'][0]['IT_UPDATE'][0]

            console.log(cus_Details_Edit)
            
            res.send(cus_Details_Edit);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

