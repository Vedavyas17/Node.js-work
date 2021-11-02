const express= require('express');
const router=express.Router();
const fetch= require('node-fetch');
const xml2js = require('xml2js');
const base64 = require("base-64");
const { request } = require('http');
router.use(express.urlencoded());
router.use(express.json());
// var cors = require('cors');
// router.use(cors());

const parser= xml2js.Parser();

router.post("/vendor/detail",async(req,res)=> {
    const vendorid = req.body.vendorid;
    console.log(vendorid);
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_vendordetails/100/zws_vendordetails/zws_vendordetails'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_VENDOR_GETDETAILS_VED>
          <!--Optional:-->
          <COMPANY_CODE>SA01</COMPANY_CODE>
          <!--Optional:-->
          <IT_DETAILS>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </IT_DETAILS>
          <VENDOR_ID>${req.body.vendorid}</VENDOR_ID>
       </urn:ZBAPI_VENDOR_GETDETAILS_VED>
    </soapenv:Body>
 </soapenv:Envelope>
              `

rfq = await fetch(Request_URL,
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

    parser.parseString(rfq, (err, data) => {
        if(err)
        {
            console.log('Error in RFQ details Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            get_rfq = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_VENDOR_GETDETAILS_VEDResponse'][0]['GENERAL_DETAILS'][0]
            console.log(get_rfq)
            
            res.send(get_rfq);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

