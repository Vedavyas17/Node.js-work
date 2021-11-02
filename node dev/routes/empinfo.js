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

router.post("/emp/getinfo",async(req,res)=> {
    const employeeid = req.body.employeeid;
    console.log(employeeid);
    const Request_URL = 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_EMPINFO_VED&receiverParty=&receiverService=&interface=SI_EMP_INFO_VEDA&interfaceNamespace=http://vedaportal/empinfo'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_EMPINFO_VED>
          <!--Optional:-->
          <EMPLOYEE_ID>${employeeid}</EMPLOYEE_ID>
       </urn:ZBAPI_EMPINFO_VED>
    </soapenv:Body>
 </soapenv:Envelope>`

info= await fetch(Request_URL,
    {
        method: "POST",
        mode :'cors',
        port : 50000,
        host: "dxktpipo.kaarcloud.com",
        credentials:'include',
        path : Request_URL,
        headers:{
            'Content-Type':'text/xml',
            'Authorization':'Basic '+ base64.encode('pouser' + ':' + 'Tech@2021'),
            'Cach-Control' : 'no-cache',
        },
        maxRedirects: 20,
        referrerPolicy:'no-referrer',
        body: Request_XML,
    }).then(res=> res.text())

    parser.parseString(info, (err, data) => {
        if(err)
        {
            console.log('Error in emp info details Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            get_info = data['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_EMPINFO_VED.Response']
            console.log(get_info)
            
            res.send(get_info);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

