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

router.post("/emp/leave",async(req,res)=> {
    const employeeid = req.body.employeeid;
    console.log(employeeid);
    const Request_URL = 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_EMP_LEAVE01&receiverParty=&receiverService=&interface=SI_EMP_L_DETAILS&interfaceNamespace=http://vedaportal/empLdetails'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_EMP_LEAVEDETAILS_VED>
          <!--You may enter the following 2 items in any order-->
          <EMPLOYEEID>${employeeid}</EMPLOYEEID>
          <DETAILS>
             <!--Zero or more repetitions:-->
             <item>
              
             </item>
          </DETAILS>
       </urn:ZBAPI_EMP_LEAVEDETAILS_VED>
    </soapenv:Body>
 </soapenv:Envelope>`

leave= await fetch(Request_URL,
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

    parser.parseString(leave, (err, data) => {
        if(err)
        {
            console.log('Error in emp leave info details Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            leave_info = data['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_EMP_LEAVEDETAILS_VED.Response'][0]['DETAILS'][0]
            console.log(leave_info)
            
            res.send(leave_info);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

