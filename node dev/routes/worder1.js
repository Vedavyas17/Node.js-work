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

router.post("/mp/wodetails",async(req,res)=> {
    const orderid = req.body.orderid;
    console.log(orderid);
    const Request_URL = 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PM_WO_GETLIST&receiverParty=&receiverService=&interface=SI_WO_GETLIST&interfaceNamespace=http://vedaportal/wo_getlist'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_WO_GET_DETAIL_VED>
          <!--You may enter the following 21 items in any order-->
          <ORDER_ID>${orderid}</ORDER_ID>
          <!--Optional:-->
          <ET_COMPONENTS>
             <!--Zero or more repetitions:-->
             <item>
              
             </item>
          </ET_COMPONENTS>
          <!--Optional:-->
          <ET_COSTS_DETAILS>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </ET_COSTS_DETAILS>
          <!--Optional:-->
          <ET_COSTS_SUM>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </ET_COSTS_SUM>
          <!--Optional:-->
          <ET_OLIST>
             <!--Zero or more repetitions:-->
             <item>
              
             </item>
          </ET_OLIST>
          <!--Optional:-->
          <ET_OPERATIONS>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </ET_OPERATIONS>
          <!--Optional:-->
          <ET_OPROL>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </ET_OPROL>
          <!--Optional:-->
          <ET_PARTNER>
             <!--Zero or more repetitions:-->
             <item>
              
             </item>
          </ET_PARTNER>
          <!--Optional:-->
          <ET_PERMIT>
             <!--Zero or more repetitions:-->
             <item>
             
             </item>
          </ET_PERMIT>
          <!--Optional:-->
          <ET_PERMIT_ISSUE>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </ET_PERMIT_ISSUE>
          <!--Optional:-->
          <ET_PRTS>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </ET_PRTS>
          <!--Optional:-->
          <ET_REFORDER_SERNO_OLIST>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </ET_REFORDER_SERNO_OLIST>
          <!--Optional:-->
          <ET_RELATIONS>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </ET_RELATIONS>
          <!--Optional:-->
          <ET_SERVICECONTRACTLIMITS>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </ET_SERVICECONTRACTLIMITS>
          <!--Optional:-->
          <ET_SERVICELIMIT>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </ET_SERVICELIMIT>
          <!--Optional:-->
          <ET_SERVICELINES>
             <!--Zero or more repetitions:-->
             <item>
             
             </item>
          </ET_SERVICELINES>
          <!--Optional:-->
          <ET_SERVICEOUTLINE>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </ET_SERVICEOUTLINE>
          <!--Optional:-->
          <ET_SRULES>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </ET_SRULES>
          <!--Optional:-->
          <ET_TEXTS>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </ET_TEXTS>
          <!--Optional:-->
          <ET_TEXT_LINES>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </ET_TEXT_LINES>
          <!--Optional:-->
          <RETURN>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </RETURN>
       </urn:ZBAPI_WO_GET_DETAIL_VED>
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
            console.log('Error in workorder info details Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            resp = data['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_WO_GET_DETAIL_VED.Response'][0]['ES_HEADER'][0];
            // worder_info.splice(0,1);
            console.log(resp);
            console.log("resp");
            result=[]

            result.push(`{"orderid":"${resp['ORDERID']}",
   "ordertype" : "${resp['ORDER_TYPE']}",
   "planplant" : "${resp['PLANPLANT']}",
   "notifitype" : "${resp['PMACTTYPE']}",
   "plangroup" : "${resp['PLANGROUP']}",
   "funcloc" : "${resp['FUNCT_LOC']}",
   "equipid" : "${resp['EQUIPMENT']}",
   "schedtype" : "${resp['SCHED_TYPE']}",
   "priority" : "${resp['PRIORITY']}",
   "mrprelevant" : "${resp['MRP_RELEVANT']}",
   "currency" : "${resp['CURRENCY']}",
   "objectno" : "${resp['OBJECT_NO']}",
   "startdate" : "${resp['START_DATE']}",
   "enddate" : "${resp['FINISH_DATE']}",
   "routingno" : "${resp['ROUTING_NO']}",
   "shorttext" : "${resp['SHORT_TEXT']}",
   "costcenter" : "${resp['MN_WK_CTR']}",
   "priotype" : "${resp['PRIOTYPE']}",
   "description" : "${resp['ENTERED_BY']}",
   "numberofcapacities" : "${resp['NUMBER_OF_CAPACITIES']}",
   "durationnormal" : "${resp['PLSECTN']}",
   "workactivity" : "${resp['WORK_ACTIVITY']}",
   "activity" : "${resp['ACTIVITY']}"}`);

console.log('0');
res.send(`${result}`);
// res.send(resp);
            
            // res.send({notif_display});//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;
