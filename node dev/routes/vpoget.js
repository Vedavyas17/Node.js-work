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

router.post("/vendor/getpo",async(req,res)=> {
    const vendorid = req.body.vendorid;
    console.log(vendorid);
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_vendor_getpo/100/zws_vendor_getpo/zws_vendor_getpo'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_PO_GETITEMS_VEDA>
          <!--Optional:-->
          <PO_LIST>
             <!--Zero or more repetitions:-->
             <item>
              
             </item>
          </PO_LIST>
          <VENDOR_ID>${vendorid}</VENDOR_ID>
       </urn:ZBAPI_PO_GETITEMS_VEDA>
    </soapenv:Body>
 </soapenv:Envelope>`

po = await fetch(Request_URL,
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

    parser.parseString(po, (err, data) => {
        if(err)
        {
            console.log('Error in po details Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            get_po = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_PO_GETITEMS_VEDAResponse'][0]['PO_LIST'][0]
            console.log(get_po)
            
            res.send(get_po);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

