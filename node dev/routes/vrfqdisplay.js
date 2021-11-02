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

router.post("/vendor/rfqdetails",async(req,res)=> {
    const vendorid = req.body.vendorid;
    const doc_number = req.body.doc_number
    console.log(vendorid);
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_vendor_rfqdisplay/100/zws_vendor_rfqdisplay/zws_vendor_rfqdisplay'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_RFQ_BSTYP_VED>
          <DOC_NUMBER>${doc_number}</DOC_NUMBER>
          <ITEMS>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </ITEMS>
          <VENDOR_ID>${vendorid}</VENDOR_ID>
       </urn:ZBAPI_RFQ_BSTYP_VED>
    </soapenv:Body>
 </soapenv:Envelope>`

rfqDisplay = await fetch(Request_URL,
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

    parser.parseString(rfqDisplay, (err, data) => {
        if(err)
        {
            console.log('Error in RFQ display details Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            get_rfq01 = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_RFQ_BSTYP_VEDResponse'][0]['ITEMS'][0]
            console.log(get_rfq01)
            
            res.send(get_rfq01);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

