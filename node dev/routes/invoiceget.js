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

router.post("/invoiceget",async(req,res)=> {
    const CUSTOMER_ID = req.body.CUSTOMER_ID;
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_invoice_get/100/zws_invoice_get/zws_invoice_get'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_INVOICEGETLIST_VEDA>
          <CUSTOMER_ID>${CUSTOMER_ID}</CUSTOMER_ID>
          <!--Optional:-->
          <IT_LIST>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </IT_LIST>
       </urn:ZBAPI_INVOICEGETLIST_VEDA>
    </soapenv:Body>
 </soapenv:Envelope>`

invoice = await fetch(Request_URL,
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

    parser.parseString(invoice, (err, data) => {
        if(err)
        {
            console.log('Error in Sales Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            invoice_get = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_INVOICEGETLIST_VEDAResponse'][0]['IT_LIST'][0]
            console.log(invoice_get)
            
            res.send(invoice_get);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

