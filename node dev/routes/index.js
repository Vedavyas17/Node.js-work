const express= require('express');
const router=express.Router();
const fetch= require('node-fetch');
const xml2js = require('xml2js');
const base64 = require("base-64");
const { request } = require('http');
router.use(express.urlencoded());
router.use(express.json());

const parser= xml2js.Parser();

router.post("/sorder2",async(req,res)=> {

    const CUSTOMER_ID = req.body.CUSTOMER_ID;
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_sale01/100/zws_sale01/zws_sale01'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_SALESORDER_CVV1>
          <CUSTOMER_ID>${CUSTOMER_ID}</CUSTOMER_ID>
          <IT_SALEORDER>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </IT_SALEORDER>
       </urn:ZBAPI_SALESORDER_CVV1>
    </soapenv:Body>
 </soapenv:Envelope> `
    

salRes= await fetch(Request_URL,
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
    
    parser.parseString(salRes, (err, data) => {
        if(err)
        {
            console.log('Error in Sales Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            sales_order = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_SALESORDER_CVV1Response'][0]['IT_SALEORDER'][0]['item']
            console.log(sales_order)
            
            res.send(sales_order);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

