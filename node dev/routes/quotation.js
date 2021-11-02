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

router.post("/quotdetails",async(req,res)=> {
    const CUSTOMER_ID = req.body.CUSTOMER_ID;
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_quotation_new/100/zws_quotation_new/zws_quotation_new'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_QUOTATION_GETDETAILS_VED>
          <!--Optional:-->
          <QUOTATIONADDRESS>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </QUOTATIONADDRESS>
          <!--Optional:-->
          <QUOTATIONITEMS>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </QUOTATIONITEMS>
          <!--Optional:-->
          <QUOTATIONPARTNERS>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </QUOTATIONPARTNERS>
          <!--Optional:-->
          <RETURN>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </RETURN>
          <SALESDOCUMENT>${CUSTOMER_ID}</SALESDOCUMENT>
       </urn:ZBAPI_QUOTATION_GETDETAILS_VED>
    </soapenv:Body>
 </soapenv:Envelope>`

quote= await fetch(Request_URL,
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

    parser.parseString(quote, (err, data) => {
        if(err)
        {
            console.log('Error in Sales Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            quotation_det = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_QUOTATION_GETDETAILS_VEDResponse'][0]['QUOTATIONITEMS'][0]
            console.log(quotation_det)
            
            res.send(quotation_det);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

