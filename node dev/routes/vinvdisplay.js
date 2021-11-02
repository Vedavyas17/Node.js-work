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

router.post("/vendor/displayinvoice",async(req,res)=> {
    const invoive_no = req.body.invoice_no;
    const fisc_year = req.body.fisc_year;
    console.log(invoive_no);
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_vendor_invdisplay/100/zws_vendor_invdisplay/zws_vendor_invdisplay'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_INVOICE_DISPLAY1_VEDA>
          <FISC_YEAR>${fisc_year}</FISC_YEAR>
          <INVOICE_NO>${invoive_no}</INVOICE_NO>
          <IT_DETAILS>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </IT_DETAILS>
          <RETURN>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </RETURN>
       </urn:ZBAPI_INVOICE_DISPLAY1_VEDA>
    </soapenv:Body>
 </soapenv:Envelope>`

invoicedisplay = await fetch(Request_URL,
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

    parser.parseString(invoicedisplay, (err, data) => {
        if(err)
        {
            console.log('Error in RFQ details Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            display_invoice = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_INVOICE_DISPLAY1_VEDAResponse'][0]['IT_DETAILS'][0]
            console.log(display_invoice)
            
            res.send(display_invoice);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

