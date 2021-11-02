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

router.post("/invoicedisp",async(req,res)=> {
    const bill_no = req.body.bill_no;
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_invoice_bill/100/zws_invoice_bill/zws_invoice_bill'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_INVOICEGETDETAIL_VEDA>
          <BILL_NUM>${bill_no}</BILL_NUM>
          <ITEM_DETAILS>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </ITEM_DETAILS>
       </urn:ZBAPI_INVOICEGETDETAIL_VEDA>
    </soapenv:Body>
 </soapenv:Envelope>`

invoicedata = await fetch(Request_URL,
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

    parser.parseString(invoicedata, (err, data) => {
        if(err)
        {
            console.log('Error in INVOICE Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            invoice_disp = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_INVOICEGETDETAIL_VEDAResponse'][0]['ITEM_DETAILS'][0]
            console.log(invoice_disp)
            
            res.send(invoice_disp);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

