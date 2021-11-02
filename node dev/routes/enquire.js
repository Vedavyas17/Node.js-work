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

router.post("/testdetails",async(req,res)=> {
    const CUSTOMER_ID = req.body.CUSTOMER_ID;
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_testing_vbtyp/100/zws_testing_vbtyp/zws_testing_vbtyp'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFM_TESTING>
          <CUSTOMER_ID>${CUSTOMER_ID}</CUSTOMER_ID>
          <IT_TABLE>
             <!--Zero or more repetitions:-->
             <item>
                <KUNNR>?</KUNNR>
                <VBELN>?</VBELN>
                <VBTYP>?</VBTYP>
             </item>
          </IT_TABLE>
       </urn:ZFM_TESTING>
    </soapenv:Body>
 </soapenv:Envelope>`

test = await fetch(Request_URL,
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

    parser.parseString(test, (err, data) => {
        if(err)
        {
            console.log('Error in test data Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            testing = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZFM_TESTINGResponse'][0]['IT_TABLE'][0]
            console.log(testing)
            
            res.send(testing);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

