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

router.post("/sorder1",async(req,res)=> {
    const CUSTOMER_ID = req.body.CUSTOMER_ID;
    console.log(CUSTOMER_ID);
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_sale02/100/zws_sale02/zws_sale02'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_SALESORDER_VYASTEST2>
          <CUSTOMER_ID>${CUSTOMER_ID}</CUSTOMER_ID>
          <IT_SALEORDER>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </IT_SALEORDER>
       </urn:ZBAPI_SALESORDER_VYASTEST2>
    </soapenv:Body>
 </soapenv:Envelope>`

salOrg1= await fetch(Request_URL,
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

    parser.parseString(salOrg1, (err, data) => {
        if(err)
        {
            console.log('Error in Sales Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            sales_order1 = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_SALESORDER_VYASTEST2Response'][0]['IT_SALEORDER'][0]
            console.log(sales_order1)
            
            res.send(sales_order1);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

