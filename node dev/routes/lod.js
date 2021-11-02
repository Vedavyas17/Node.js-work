const express= require('express');
const router=express.Router();
const fetch= require('node-fetch');
const xml2js = require('xml2js');
const base64 = require("base-64");
const { request } = require('http');
router.use(express.urlencoded());
router.use(express.json());

const parser= xml2js.Parser();

router.post("/loddetails",async(req,res)=> {

    const CUSTOMER_ID = req.body.CUSTOMER_ID;
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_lod_new/100/zws_lod_new/zws_lod_new'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_DELIVERY_GETLIST_VED>
          <CUSTOMER_ID>${CUSTOMER_ID}</CUSTOMER_ID>
          <IT_FINAL_HEADER>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </IT_FINAL_HEADER>
          <IT_FINAL_ITEM>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </IT_FINAL_ITEM>
       </urn:ZBAPI_DELIVERY_GETLIST_VED>
    </soapenv:Body>
 </soapenv:Envelope> `
    

lodDetails= await fetch(Request_URL,
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
    
    parser.parseString(lodDetails, (err, data) => {
        if(err)
        {
            console.log('Error in customer details Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            lod_Details = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_DELIVERY_GETLIST_VEDResponse'][0]['IT_FINAL_HEADER'][0]
            console.log(lod_Details)
            
            res.send(lod_Details);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

