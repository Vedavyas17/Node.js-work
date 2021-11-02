const express= require('express');
const router=express.Router();
const fetch= require('node-fetch');
const xml2js = require('xml2js');
const base64 = require("base-64");
const { request } = require('http');
router.use(express.urlencoded());
router.use(express.json());

const parser= xml2js.Parser();

router.post("/inqdisplaydetails",async(req,res)=> {

    const CUSTOMER_ID = req.body.CUSTOMER_ID;
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_inquiry_displaynew/100/zws_inquiry_displaynew/zws_inquiry_displaynew'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_INQUIRY_GETDETAILS_VED>
          <!--Optional:-->
          <IT_DETAILS>
             <!--Zero or more repetitions:-->
             <item>
              
             </item>
          </IT_DETAILS>
          <KUNNR>${CUSTOMER_ID}</KUNNR>
       </urn:ZBAPI_INQUIRY_GETDETAILS_VED>
    </soapenv:Body>
 </soapenv:Envelope>`
    

inqDisplayDetails= await fetch(Request_URL,
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
    
    parser.parseString(inqDisplayDetails, (err, data) => {
        if(err)
        {
            console.log('Error in customer details Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            inq_disp_Details = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_INQUIRY_GETDETAILS_VEDResponse'][0]['IT_DETAILS'][0]
            console.log(inq_disp_Details)
            
            res.send(inq_disp_Details);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

