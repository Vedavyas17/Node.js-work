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

router.post("/mp/notlist",async(req,res)=> {
    const notification = req.body.notification;
    const plant = req.body.plant;
    const group = req.body.group;
    // console.log(employeeid);
    const Request_URL = 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PM_NOTIF_LIST&receiverParty=&receiverService=&interface=SI_GET_NOTIF&interfaceNamespace=http://vedaportal/get_notif'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_NOTIF_LIST_DISPLAY_VEDA>
          <!--You may enter the following 4 items in any order-->
          <!--Optional:-->
          <NOTIFICATION_DATE>${notification}</NOTIFICATION_DATE>
          <PLANGROUP>${group}</PLANGROUP>
          <PLANPLANT>${plant}</PLANPLANT>
          <NOTIFICATION>
             <!--Zero or more repetitions:-->
             <item>
                <!--Optional:-->
               
             </item>
          </NOTIFICATION>
       </urn:ZBAPI_NOTIF_LIST_DISPLAY_VEDA>
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
            console.log('Error in emp notif info details Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            notif_list = data['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_NOTIF_LIST_DISPLAY_VEDA.Response'][0]['NOTIFICATION'][0]['item']
            // notif_info.splice(0,1);
            console.log(notif_list)
            
            res.send({notif_list});//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

