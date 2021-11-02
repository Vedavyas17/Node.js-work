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

router.post("/mp/notdisplay",async(req,res)=> {
    const notification_no = req.body.notification_no;
    console.log("notif_display:"+notification_no);
    const Request_URL = 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PM_NOTIF_DISPLAY&receiverParty=&receiverService=&interface=SI_NOTIF_DISPLAY&interfaceNamespace=http://vedaportal/notif_display'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_MAIN_NOTDISP_VEDA>
          <!--You may enter the following 8 items in any order-->
          <NOTIFICATION_NO>${notification_no}</NOTIFICATION_NO>
          <!--Optional:-->
          <NOTIF_ACTV>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </NOTIF_ACTV>
          <!--Optional:-->
          <NOTIF_CAUS>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </NOTIF_CAUS>
          <!--Optional:-->
          <NOTIF_ITEM>
             <!--Zero or more repetitions:-->
             <item>
              
             </item>
          </NOTIF_ITEM>
          <!--Optional:-->
          <NOTIF_PARTNR>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </NOTIF_PARTNR>
          <!--Optional:-->
          <NOTIF_TASK>
             <!--Zero or more repetitions:-->
             <item>
                
              
               
             </item>
          </NOTIF_TASK>
          <!--Optional:-->
          <NOTIF_TXT>
             <!--Zero or more repetitions:-->
             <item>
 
             </item>
          </NOTIF_TXT>
          <!--Optional:-->
          <RETURN>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </RETURN>
       </urn:ZBAPI_MAIN_NOTDISP_VEDA>
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
            // console.log(data)
            resp = data['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_MAIN_NOTDISP_VEDA.Response'][0]['NOTIFHEADER_EXPORT'][0];
            // notif_info.splice(0,1);
            console.log(resp);
            console.log("resp");
            result=[]

result.push(`{"notifino":"${resp['NOTIF_NO']}",
"planplant":"${resp['PLANPLANT']}",
"locacc":"${resp['LOC_ACC']}",
"equipid":"${resp['EQUIPMENT']}",
"breakdown":"${resp['BREAKDOWN']}",
"group":"${resp['PLANGROUP']}",
"type":"${resp['NOTIF_TYPE']}",
"shorttext":"${resp['SHORT_TEXT']}",
"priotype":"${resp['PRIOTYPE']}",
"priority":"${resp['PRIORITY']}",
"createdon":"${resp['CREATED_ON']}",
"notifidate":"${resp['NOTIF_DATE']}",
"reportedby":"${resp['REPORTEDBY']}",
"startdate":"${resp['DESSTDATE']}",
"enddate":"${resp['DESENDDATE']}",
"objectno":"${resp['OBJECT_NO']}",
"lang":"${resp['PRILANG']}",
"mainplant":"${resp['MAINTPLANT']}",
"costcenter":"${resp['COSTCENTER']}"}`);
console.log('0');
res.send(`${result}`);
// res.send(resp);
            
            // res.send({notif_display});//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

