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

router.post("/emp/finale",async(req,res)=> {
    const employeeid = req.body.employeeid;
    console.log(employeeid);
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_emp_final01/100/zws_emp_final01/zws_emp_final01'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_FINAL_VEDA>
          <EMPLOYEE_ID>${employeeid}</EMPLOYEE_ID>
          <IT_LEAVEDATA>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </IT_LEAVEDATA>
          <!--Optional:-->
          <SEPDATE></SEPDATE>
       </urn:ZBAPI_FINAL_VEDA>
    </soapenv:Body>
 </soapenv:Envelope>`

debiting= await fetch(Request_URL,
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

    parser.parseString(debiting, (err, data) => {
        if(err)
        {
            console.log('Error in po details Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            debit = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_FINAL_VEDAResponse']
            console.log(debit)
            // console.log(debit[TENUREPERIOD]);
            
            res.send(debit);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

