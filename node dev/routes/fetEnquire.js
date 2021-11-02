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

router.post("/fetenquire",async(req,res)=> {
    const CUSTOMER_ID = req.body.CUSTOMER_ID;
    const SALESDOC_NO = req.body.SALESDOC_NO;
    console.log(CUSTOMER_ID);
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_newthing/100/zws_newthing/zws_newthing'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_SAMPLE_TEST23>
          <CUSTOMER_ID>${CUSTOMER_ID}</CUSTOMER_ID>
          <IT_OUTPUT>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </IT_OUTPUT>
          <SALESDOC_NO>${SALESDOC_NO}</SALESDOC_NO>
       </urn:ZBAPI_SAMPLE_TEST23>
    </soapenv:Body>
 </soapenv:Envelope>
          `

inquire = await fetch(Request_URL,
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

    parser.parseString(inquire, (err, data) => {
        if(err)
        {
            console.log('Error in inquiry details Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            console.log("inq");
            inq = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_SAMPLE_TEST23Response'][0]['IT_OUTPUT'][0]
            console.log(inq);
            console.log("inq");
            
            res.send(inq);
            console.log("inq");//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

