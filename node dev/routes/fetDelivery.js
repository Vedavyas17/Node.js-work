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

router.post("/fetdelivery",async(req,res)=> {
    const CUSTOMER_ID = req.body.CUSTOMER_ID;
    const SALESDOC_NO = req.body.SALESDOC_NO;
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_delivery_vbtyp_new1/100/zws_delivery_vbtyp_new1/zws_delivery_vbtyp_new1'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_DELIVERY_FETCH_VED>
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
          <SALESDOC_NO>${SALESDOC_NO}</SALESDOC_NO>
       </urn:ZBAPI_DELIVERY_FETCH_VED>
    </soapenv:Body>
 </soapenv:Envelope>`

fetDel= await fetch(Request_URL,
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

    parser.parseString(fetDel, (err, data) => {
        if(err)
        {
            console.log('Error in delivery data Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            delivery_fetch = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_DELIVERY_FETCH_VEDResponse'][0]['IT_FINAL_HEADER'][0]
            console.log(delivery_fetch)
            
            res.send(delivery_fetch);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

